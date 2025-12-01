// src/components/DonutChart.jsx
import React from "react";
import { formatCurrency } from "../helpers/format.jsx";
import { LOCALE_MAP, TRANSLATIONS } from "../constants/translations.jsx";

export default function DonutChart({
  data,
  colors,
  onCategoryClick,
  lang = "en",
}) {
  const tLabel = TRANSLATIONS[lang];
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;

  if (total === 0) {
    return (
      <div className="relative w-[220px] h-[220px] mx-auto my-4 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-[16px] border-slate-50 flex items-center justify-center">
          <span className="text-xs text-gray-400">No Data</span>
        </div>
      </div>
    );
  }

  // Build each slice of the donut
  const paths = data.map((item, index) => {
    const percent = item.value / total;
    if (percent <= 0) return null;

    const startX = Math.cos(2 * Math.PI * cumulativePercent);
    const startY = Math.sin(2 * Math.PI * cumulativePercent);
    cumulativePercent += percent;
    const endX = Math.cos(2 * Math.PI * cumulativePercent);
    const endY = Math.sin(2 * Math.PI * cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const pathData =
      percent >= 0.9999
        ? // If it's basically 100%, draw a full circle
          `M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0`
        : // Otherwise, draw the appropriate arc
          `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

    return (
      <path
        key={item.label}
        d={pathData}
        fill={colors[index % colors.length]}
        onClick={() => onCategoryClick(item.label)}
        className="transition-all duration-300 hover:scale-105 origin-center cursor-pointer hover:opacity-90"
        stroke="white"
        strokeWidth="0.02"
      />
    );
  });

  return (
    <div className="relative w-[220px] h-[220px] mx-auto my-4 animate-in zoom-in duration-500">
      <svg
        viewBox="-1.05 -1.05 2.1 2.1"
        className="transform -rotate-90 w-full h-full overflow-visible drop-shadow-sm"
      >
        {paths}
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-[#FDFBFF] rounded-full flex flex-col items-center justify-center shadow-inner z-10 pointer-events-none">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          {tLabel.total}
        </span>
        <span className="text-xl font-bold text-gray-900 mt-1">
          {formatCurrency(total, LOCALE_MAP[lang])}
        </span>
      </div>
    </div>
  );
}
