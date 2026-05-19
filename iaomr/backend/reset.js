require("dotenv").config();


const mongoose = require("mongoose");
const Registration = require("./models/Registration");
const Counter = require("./models/Counter");

async function reset() {
  await mongoose.connect(process.env.MONGO_URI);

  await Registration.deleteMany({});
  await Counter.deleteMany({});

  console.log("All registrations and counters cleared");

  process.exit();
}

reset();