import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

export const createExpense = async (req, res) => {
  const userId = req.userId || null;
  const { amount, description, categoryId, date, type } = req.body;
  if (typeof amount !== "number")
    return res.status(400).json({ message: "Amount must be a number" });
  const expense = await Expense.create({
    amount,
    description,
    categoryId,
    date: date ? new Date(date) : new Date(),
    userId,
    type,
  });
  // populate category name for convenience
  const category = categoryId ? await Category.findById(categoryId) : null;
  const result = expense.toObject();
  result.categoryName = category ? category.name : null;
  res.status(201).json(result);
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, categoryId, date, type } = req.body;
  if (amount !== undefined && typeof amount !== "number")
    return res.status(400).json({ message: "Amount must be a number" });
  const update = {};
  if (amount !== undefined) update.amount = amount;
  if (description !== undefined) update.description = description;
  if (categoryId !== undefined) update.categoryId = categoryId;
  if (date !== undefined) update.date = date ? new Date(date) : new Date();
  if (type !== undefined) update.type = type;
  const expense = await Expense.findByIdAndUpdate(id, update, { new: true });
  if (!expense) return res.status(404).json({ message: "Not found" });
  const category = expense.categoryId
    ? await Category.findById(expense.categoryId)
    : null;
  const result = expense.toObject();
  result.categoryName = category ? category.name : null;
  res.json(result);
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

export const getExpenses = async (req, res) => {
  const userId = req.userId || null;
  const query = userId ? { userId } : {};
  const expenses = await Expense.find(query).sort({ date: -1 }).limit(100);
  res.json(expenses);
};
