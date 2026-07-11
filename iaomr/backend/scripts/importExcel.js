require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const XLSX = require("xlsx");
const QRCode = require("qrcode");

const Registration = require("../models/Registration");
const { generateRegNumber } = require("../utils/registrationutil");
const { generatePDF, sendEmail } = require("../utils/pdfemail");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

// Delay function (5 seconds)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function importExcel(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    console.log("📄 Rows Found:", data.length);

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      try {
        // Skip empty rows
        if (!row[1] || !row[2]) {
          console.log(`⚠️ Skipping empty row ${i + 1}`);
          continue;
        }

        console.log(`\n🚀 Processing Row ${i + 1}`);

        const email = String(row[1]).trim().toLowerCase();

        // Check duplicate
        const existing = await Registration.findOne({ email });

        if (existing) {
          console.log("⚠️ Already Exists:", email);
          continue;
        }

        const form = {
          email,

          name: row[2],
          gender: row[3],

          photo: null,

          phone: String(row[5] || ""),

          category: row[6],
          designation: row[7] || "",
          iaomrNumber: row[8] || "",
          pgYear: row[9] || "",
          dciNumber: row[10] || "",

          country: row[11] || "",
          state: row[12] || "",
          city: row[13] || "",

          institution: row[14] || "",
          address: row[15] || "",

          accompanying: row[21] === "Yes",

          accompanyingCount: row[21] === "Yes" ? 1 : 0,

          accompanyingNames: [],

          foodPreference:
            row[22]?.toUpperCase().includes("NON")
              ? "NON-VEG"
              : "VEG",

          amount: Number(row[16]) || 0,

          status: "PAID",
        };

        const regNumber = await generateRegNumber(form.category);

        const registration = new Registration({
          ...form,

          regNumber,

          paymentId: `OFFLINE-PAY-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,

          orderId: `OFFLINE-ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,
        });

        const saved = await registration.save();

        console.log("✅ SAVED:", saved.regNumber);

        // Generate QR
        const qrCode = await QRCode.toDataURL(
          JSON.stringify({
            regNumber: saved.regNumber,
            name: saved.name,
            paymentId: saved.paymentId,
          })
        );

        saved.qrCode = qrCode;

        await saved.save();

        console.log("✅ QR Generated");

        // Generate PDF
        console.log("📄 Generating PDF...");
        const pdf = await generatePDF(saved);
        console.log("✅ PDF Generated");

        // Wait before sending email
        console.log("⏳ Waiting 5 seconds before sending email...");
        await delay(5000);

        // Send Email
        console.log(`📧 Sending email to ${saved.email}...`);
        await sendEmail(saved, pdf);

        console.log("✅ Email Sent:", saved.email);

        // Wait before processing next row
        console.log("⏳ Waiting 5 seconds before next record...");
        await delay(5000);

      } catch (err) {
        console.error(`❌ Error in Row ${i + 1}`);

        console.error(err);

        if (err.response) {
          console.error("SMTP Response:", err.response);
        }

        if (err.responseCode) {
          console.error("Response Code:", err.responseCode);
        }

        // Wait even after an error to avoid SMTP rate limiting
        console.log("⏳ Waiting 5 seconds before continuing...");
        await delay(5000);
      }
    }

    console.log("\n🎉 IMPORT COMPLETE");

    await mongoose.connection.close();

    process.exit(0);

  } catch (err) {
    console.error("❌ IMPORT FAILED:", err);

    await mongoose.connection.close();

    process.exit(1);
  }
}

importExcel("./mails.xlsx");