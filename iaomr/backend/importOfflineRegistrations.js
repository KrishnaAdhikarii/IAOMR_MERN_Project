require("dotenv").config();
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const Registration = require("./models/Registration"); // Adjust path if needed
const { generateRegNumber } = require("./routes/registration"); // Import your function
const { generatePDF, sendEmail } = require("./utils/emailPdf"); // Extract these functions to utils for reuse

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function importExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  for (const row of data) {
    try {
      // Example mapping; adjust according to your Excel headers
      const form = {
        name: row.Name,
        email: row.Email,
        phone: row.Phone,
        category: row.Category,
        gender: row.Gender,
        designation: row.Designation || "",
        iaomrNumber: row.IAOMRNumber || "",
        pgYear: row.PGYear || "",
        dciNumber: row.DCINumber || "",
        country: row.Country,
        state: row.State,
        city: row.City,
        institution: row.Institution,
        address: row.Address,
        accompanying: row.Accompanying === "Yes",
        accompanyingCount: row.AccompanyingCount || 0,
        accompanyingNames: row.AccompanyingNames ? row.AccompanyingNames.split(",") : [],
        foodPreference: row.FoodPreference || "VEG",
        amount: row.Amount,
        status: "PAID",
      };

      // Generate registration number
      const regNumber = await generateRegNumber(form.category);

      // Save registration
      const registration = new Registration({
        ...form,
        regNumber,
        paymentId: `OFFLINE-${Date.now()}`, // fake payment ID for offline
        orderId: `OFFLINE-${Date.now()}`,
        qrCode: "", // optional: generate QR code if needed
      });

      await registration.save();
      console.log("Saved:", regNumber);

      // Generate PDF and send email
      const pdfBuffer = await generatePDF(registration);
      await sendEmail(registration, pdfBuffer);
      console.log("Email sent to:", registration.email);
    } catch (err) {
      console.error("Error processing row:", row, err);
    }
  }

  console.log("✅ Import completed!");
  process.exit(0);
}

// Run the import
importExcel("./test.xlsx"); // Path to your Excel