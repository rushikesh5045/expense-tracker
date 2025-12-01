import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import Category from "../models/Category.js";

const defaults = [
  { name: "Food", icon: "🍔", color: "#f97316" },
  { name: "Transport", icon: "🚗", color: "#06b6d4" },
  { name: "Shopping", icon: "🛍️", color: "#8b5cf6" },
  { name: "Bills", icon: "🧾", color: "#ef4444" },
  { name: "Salary", icon: "💼", color: "#10b981" },
];

const run = async () => {
  await connectDB();
  for (const item of defaults) {
    await Category.updateOne(
      { name: item.name },
      { $set: { ...item, isDefault: true } },
      { upsert: true }
    );
    console.log(`Upserted category: ${item.name}`);
  }
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
