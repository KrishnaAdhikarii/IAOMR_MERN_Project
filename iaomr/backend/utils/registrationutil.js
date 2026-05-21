const Counter = require("../models/Counter");

async function generateRegNumber(category) {
  const year = new Date().getFullYear();

  const categoryMap = {
    "Post Graduate": "PG",
    Faculty: "FAC",
    Practitioner: "PRA",
    "Foreign Delegate": "FOR",
  };

  const prefix = categoryMap[category] || "GEN";
  const counterKey = `IAOMR-${year}-${prefix}`;

  const counter = await Counter.findOneAndUpdate(
    { key: counterKey },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedNumber = String(counter.seq).padStart(2, "0");
  return `${counterKey}${paddedNumber}`;
}

module.exports = { generateRegNumber };