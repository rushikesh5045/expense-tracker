import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    amount: { type: Number, required: true },
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["expense", "income"], default: "expense" },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
