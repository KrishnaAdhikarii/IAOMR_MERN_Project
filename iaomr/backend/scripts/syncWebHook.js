require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");

const Registration = require("../models/Registration");

const API_URL =
  "https://ambidexevents.com/api/web_register/iaomr-2026";

mongoose.connect(process.env.MONGO_URI);

function getParticipantType(category) {
  switch ((category || "").trim().toUpperCase()) {
    case "POST GRADUATE":
      return "STUDENT DELEGATE";

    case "FACULTY":
      return "FACULTY";

    case "IAPHD STUDENT":
      return "IAPHD STUDENT MEMBERS";

    case "IAPHD LIFE":
      return "IAPHD LIFE MEMBERS";

    default:
      return "DELEGATE";
  }
}

async function syncRegistrations() {
  try {
    const registrations = await Registration.find();

    console.log(`\nFound ${registrations.length} registrations\n`);

    for (const reg of registrations) {
      console.log("======================================");
      console.log(`Processing: ${reg.name}`);

      try {
        const form = new FormData();

        // Required fields
        form.append("name", reg.name || "");
        form.append("email", reg.email || "");
        form.append("phone_number", reg.phone || "");
        form.append("apmc_number", reg.iaomrNumber || "N");

        // Use regNumber if exists, otherwise Mongo _id
        form.append(
          "event_reg_id",
          reg.regNumber || reg._id.toString()
        );



        form.append(
          "participant_type",
          getParticipantType(reg.category)
        );

        // Upload image from MongoDB Binary
        if (reg.photo && reg.photo.data) {
          let imageBuffer;

          if (Buffer.isBuffer(reg.photo.data)) {
            imageBuffer = reg.photo.data;
          } else if (reg.photo.data.buffer) {
            imageBuffer = Buffer.from(reg.photo.data.buffer);
          } else {
            imageBuffer = Buffer.from(reg.photo.data);
          }

          console.log(
            `📷 Image Size: ${imageBuffer.length} bytes`
          );

          form.append("image", imageBuffer, {
            filename: `${reg._id}.jpg`,
            contentType: reg.photo.contentType || "image/jpeg",
          });
        } else {
          console.log("⚠️ No image found");
        }

        console.log("Sending request...");

        const response = await axios.post(API_URL, form, {
          headers: form.getHeaders(),
          timeout: 30000,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        });

        console.log("✅ Success");
        console.log(response.data);
      } catch (error) {
        console.log("❌ Failed");

        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Response:");
          console.dir(error.response.data, { depth: null });
        } else {
          console.log(error.message);
        }
      }

      // Delay 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("\n✅ Sync Completed");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
}

syncRegistrations();