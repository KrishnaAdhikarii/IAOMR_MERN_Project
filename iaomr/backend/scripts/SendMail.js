require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const QRCode = require("qrcode");

const Registration = require("../models/Registration");
const { generatePDF, sendEmail } = require("../utils/pdfemail");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

async function resendEmails() {
  try {
    // Add the email addresses that need to receive the email
    const emails = [
      "gracelinrs@gmail.com","guptashivank777@gmail.com",
      "person2@gmail.com",
      "person3@gmail.com",
    ];

    const registrations = await Registration.find({
      email: { $in: emails },
    });

    console.log(`Found ${registrations.length} registrations`);

    for (const reg of registrations) {
      try {
        console.log(`\n📧 Sending to ${reg.email}`);

        // Generate QR if missing
        if (!reg.qrCode) {
          const qrCode = await QRCode.toDataURL(
            JSON.stringify({
              regNumber: reg.regNumber,
              name: reg.name,
              paymentId: reg.paymentId,
            })
          );

          reg.qrCode = qrCode;
          await reg.save();

          console.log("✅ QR Generated");
        }

        // Generate PDF
        const pdf = await generatePDF(reg);

        // Send Email
        await sendEmail(reg, pdf);

        console.log(`✅ Email Sent: ${reg.email}`);

        // Optional delay to avoid SMTP rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));

      } catch (err) {
        console.error(`❌ Failed for ${reg.email}`);
        console.error(err);
      }
    }

    console.log("\n🎉 All Done");

  } catch (err) {
    console.error("❌ Script Error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

resendEmails();