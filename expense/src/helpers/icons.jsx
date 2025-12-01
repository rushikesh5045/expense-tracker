// src/helpers/icons.js
import React from "react";
import {
  Utensils,
  Car,
  Zap,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Home,
  Briefcase,
  Laptop,
  LineChart,
  Gift,
  Building,
  Tag,
} from "lucide-react";

export const CATEGORY_COLORS = [
  "#005AC1",
  "#9C4242",
  "#3A7D44",
  "#E69625",
  "#633B48",
  "#006D39",
  "#4E5389",
  "#BA1A1A",
  "#585F67",
];
export function getCategoryIcon(category = "", size = 20) {
  const iconProps = { size, strokeWidth: 2.5 };
  const catLower = category.toLowerCase();

  if (catLower.includes("food") || catLower.includes("eat"))
    return <Utensils {...iconProps} />;
  if (
    catLower.includes("car") ||
    catLower.includes("transport") ||
    catLower.includes("fuel")
  )
    return <Car {...iconProps} />;
  if (catLower.includes("bill") || catLower.includes("electric"))
    return <Zap {...iconProps} />;
  if (catLower.includes("shop")) return <ShoppingBag {...iconProps} />;
  if (catLower.includes("movie") || catLower.includes("fun"))
    return <Film {...iconProps} />;
  if (catLower.includes("health") || catLower.includes("med"))
    return <HeartPulse {...iconProps} />;
  if (catLower.includes("edu") || catLower.includes("school"))
    return <GraduationCap {...iconProps} />;
  if (catLower.includes("home") || catLower.includes("rent"))
    return <Home {...iconProps} />;
  if (catLower.includes("salary") || catLower.includes("job"))
    return <Briefcase {...iconProps} />;
  if (catLower.includes("gift")) return <Gift {...iconProps} />;
  if (catLower.includes("invest") || catLower.includes("stock"))
    return <LineChart {...iconProps} />;

  switch (category) {
    case "Salary":
      return <Briefcase {...iconProps} />;
    case "Freelance":
      return <Laptop {...iconProps} />;
    case "Investments":
      return <LineChart {...iconProps} />;
    case "Gifts":
      return <Gift {...iconProps} />;
    case "Rental":
      return <Building {...iconProps} />;
    case "Food":
      return <Utensils {...iconProps} />;
    case "Transport":
      return <Car {...iconProps} />;
    case "Bills":
      return <Zap {...iconProps} />;
    case "Shopping":
      return <ShoppingBag {...iconProps} />;
    case "Entertainment":
      return <Film {...iconProps} />;
    case "Health":
      return <HeartPulse {...iconProps} />;
    case "Education":
      return <GraduationCap {...iconProps} />;
    case "Rent":
      return <Home {...iconProps} />;
    default:
      return <Tag {...iconProps} />;
  }
}
