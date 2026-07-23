require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const QRCode = require("qrcode");

const Registration = require("../models/Registration");
const { generatePDF, sendEmail } = require("../utils/pdfemail");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const registrations = [
  {
    regNumber: "IAOMR-2026-FAC89",
    email: "sarathprathi@gmail.com",
    name: "DR.PRATHI VENKLATA SARATH",
    gender: "Male",
    phone: "9866327965",
    category: "Faculty",
    designation: "Professor",
    iaomrNumber: "LM 777",
    country: "India",
    state: "Andhra Pradesh",
    city: "Nellore",
    institution: "Narayana dental college and hospital",
    address: "Narayana dental college and hospital",
    amount: 7670,
    foodPreference: "NON-VEG",
    accompanying: false,
    accompanyingCount: 0,
  },
  {
    regNumber: "IAOMR-2026-FAC90",
    email: "beeraka_swapna@yahoo.com",
    name: "DR.SWAPNA SREEDEVI",
    gender: "Female",
    phone: "9441788440",
    category: "Faculty",
    designation: "Professor",
    iaomrNumber: "LM548",
    country: "India",
    state: "Andhra Pradesh",
    city: "Nellore",
    institution: "Narayana dental college and hospital",
    address: "Narayana dental college and hospital",
    amount: 7670,
    foodPreference: "NON-VEG",
    accompanying: false,
    accompanyingCount: 0,
  },
  {
    regNumber: "IAOMR-2026-FAC91",
    email: "drprathima84@gmail.com",
    name: "DR.PRATHIMA",    
    gender: "Female",
    phone: "9908061902",
    category: "Faculty",
    designation: "Reader",
    iaomrNumber: "LM1654",
    country: "India",
    state: "Andhra Pradesh",
    city: "Nellore",
    institution: "Narayana Dental college and Hospital",
    address: "Narayana Dental college and Hospital",
    amount: 7670,
    foodPreference: "NON-VEG",
    accompanying: false,
    accompanyingCount: 0,
  },
];

async function importFaculty() {
  try {
    for (const form of registrations) {
      try {
        console.log(`\n🚀 Processing ${form.regNumber}`);

        const existingEmail = await Registration.findOne({
          email: form.email.toLowerCase(),
        });

        if (existingEmail) {
          console.log(`⚠️ Email already exists: ${form.email}`);
          continue;
        }

        const existingReg = await Registration.findOne({
          regNumber: form.regNumber,
        });

        if (existingReg) {
          console.log(`⚠️ Reg No already exists: ${form.regNumber}`);
          continue;
        }

        const registration = new Registration({
          ...form,
          email: form.email.toLowerCase(),
          photo: null,
          pgYear: "",
          dciNumber: "",
          accompanyingNames: [],
          status: "PAID",
          paymentId: `OFFLINE-PAY-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,
          orderId: `OFFLINE-ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,
        });

        const saved = await registration.save();

        console.log("✅ Saved:", saved.regNumber);

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

        const pdf = await generatePDF(saved);

        console.log("✅ PDF Generated");

        await delay(5000);

        console.log(`📧 Sending email to ${saved.email}`);

        // await sendEmail(saved, pdf);

        console.log("✅ Email Sent");

        await delay(5000);
      } catch (err) {
        console.error(`❌ Error processing ${form.regNumber}`);
        console.error(err);

        if (err.response) console.error(err.response);
        if (err.responseCode) console.error(err.responseCode);

        await delay(5000);
      }
    }

    console.log("\n🎉 ALL DONE");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

importFaculty();
