require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const XLSX = require("xlsx");
const axios = require("axios");

const Registration = require("../models/Registration");

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err);
});

function getDownloadUrl(link) {
  if (!link) return null;

  try {
    // https://drive.google.com/open?id=FILE_ID
    const openMatch = link.match(/[?&]id=([^&]+)/);
    if (openMatch) {
      return `https://drive.google.com/uc?export=download&id=${openMatch[1]}`;
    }

    // https://drive.google.com/file/d/FILE_ID/view
    const fileMatch = link.match(/\/d\/([^/]+)/);
    if (fileMatch) {
      return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
    }

    return null;
  } catch (err) {
    return null;
  }
}

async function importPhotos(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    console.log(`📄 Total Rows: ${rows.length - 1}`);

    let updated = 0;
    let skipped = 0;
    let notFound = 0;
    let failed = 0;

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      const excelName = String(row[0] || "").trim();
      const photoLink = String(row[1] || "").trim();
      const regNumber = String(row[2] || "").trim();

      if (!regNumber || !photoLink) {
        console.log(`⏭ Row ${i + 1} skipped (missing Registration ID/photo)`);
        continue;
      }

      try {
        const registration = await Registration.findOne({ regNumber });

        if (!registration) {
          console.log(`❌ Registration Not Found: ${regNumber}`);
          notFound++;
          continue;
        }

        console.log(
          `\n🔍 ${registration.regNumber} | ${registration.name}`
        );

        if (
          registration.photo?.data &&
          registration.photo.data.length > 0
        ) {
          console.log("⏭ Photo already exists");
          skipped++;
          continue;
        }

        const downloadUrl = getDownloadUrl(photoLink);

        if (!downloadUrl) {
          console.log("❌ Invalid Google Drive Link");
          failed++;
          continue;
        }

        const response = await axios.get(downloadUrl, {
          responseType: "arraybuffer",
          maxRedirects: 5,
          timeout: 30000,
        });

        const contentType =
          response.headers["content-type"] || "";

        if (!contentType.startsWith("image/")) {
          console.log(
            `❌ Download is not an image (received ${contentType})`
          );
          failed++;
          continue;
        }

        registration.photo = {
          data: Buffer.from(response.data),
          contentType,
        };

        await registration.save();

        updated++;

        console.log(
          `✅ Uploaded ${registration.regNumber} (${Math.round(
            response.data.length / 1024
          )} KB)`
        );
      } catch (err) {
        failed++;

        console.log(`❌ Failed for ${regNumber}`);

        if (err.response) {
          console.log("HTTP Status:", err.response.status);
        }

        console.log(err.message);
      }
    }

    console.log("\n==============================");
    console.log("🎉 IMPORT COMPLETE");
    console.log("==============================");
    console.log("✅ Updated   :", updated);
    console.log("⏭ Skipped   :", skipped);
    console.log("❌ Not Found :", notFound);
    console.log("⚠ Failed    :", failed);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Import Failed:", err);

    await mongoose.connection.close();
    process.exit(1);
  }
}

importPhotos("./photos.xlsx");