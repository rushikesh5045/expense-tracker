import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const userId = req.userId || null;
  const query = userId
    ? { $or: [{ userId }, { isDefault: true }] }
    : { isDefault: true };
  const categories = await Category.find(query).sort({ name: 1 });
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const userId = req.userId || null;
  const { name, icon, color } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  const category = await Category.create({
    name,
    icon,
    color,
    userId,
    isDefault: false,
  });
  res.status(201).json(category);
};
