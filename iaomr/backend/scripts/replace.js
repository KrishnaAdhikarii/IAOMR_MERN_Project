require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const XLSX = require("xlsx");
const QRCode = require("qrcode");

const Registration = require("../models/Registration");
const { generatePDF, sendEmail } = require("../utils/pdfemail");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
    console.log("✅ MongoDB Connected");
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateExcel(filePath) {
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
                if (!row[1] || !row[2]) {
                    console.log(`⚠️ Skipping Row ${i + 1}`);
                    continue;
                }

                console.log(`\n🚀 Updating Row ${i + 1}`);

                const regNumber = "IAOMR-2026-PG188"; // assuming column A contains Reg Number

                const registration = await Registration.findOne({ regNumber });

                if (!registration) {
                    console.log("❌ Registration not found:", regNumber);
                    continue;
                }

                console.log("✅ Found:", registration.regNumber);

                // Update fields (regNumber remains unchanged)
                registration.email = String(row[1]).trim().toLowerCase();
                registration.name = row[2];
                registration.gender = row[3];
                registration.phone = String(row[5] || "");

                registration.category = row[6];
                registration.designation = row[7] || "";
                registration.iaomrNumber = row[8] || "";
                registration.pgYear = row[9] || "";
                registration.dciNumber = row[10] || "";

                registration.country = row[11] || "";
                registration.state = row[12] || "";
                registration.city = row[13] || "";

                registration.institution = row[14] || "";
                registration.address = row[15] || "";

                registration.amount = Number(row[16]) || 0;

                registration.accompanying = row[21] === "Yes";
                registration.accompanyingCount =
                    row[21] === "Yes" ? 1 : 0;

                registration.foodPreference =
                    row[22]?.toUpperCase().includes("NON")
                        ? "NON-VEG"
                        : "VEG";

                registration.status = "PAID";

                // Regenerate QR (same regNumber)
                const qrCode = await QRCode.toDataURL(
                    JSON.stringify({
                        regNumber: registration.regNumber,
                        name: registration.name,
                        paymentId: registration.paymentId,
                    })
                );

                registration.qrCode = qrCode;

                await registration.save();

                console.log("✅ Record Updated");

                // Generate new PDF
                console.log("📄 Generating PDF...");
                const pdf = await generatePDF(registration);

                console.log("✅ PDF Generated");

                await delay(5000);

                // Send updated confirmation email
                console.log(`📧 Sending email to ${registration.email}...`);
                await sendEmail(registration, pdf);

                console.log("✅ Email Sent");

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

                console.log("⏳ Waiting 5 seconds...");
                await delay(5000);
            }
        }

        console.log("\n🎉 UPDATE COMPLETE");

        await mongoose.connection.close();
        process.exit(0);

    } catch (err) {
        console.error("❌ UPDATE FAILED:", err);

        await mongoose.connection.close();
        process.exit(1);
    }
}

updateExcel("./mails.xlsx");