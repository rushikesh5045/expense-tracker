// src/components/TransactionItem.jsx
import React from "react";
import { getCategoryIcon } from "../helpers/icons.jsx";
import { formatDate, formatCurrency } from "../helpers/format.jsx";
import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";

export default function TransactionItem({ t, onClick, viewMode, lang = "en" }) {
  const tLabel = TRANSLATIONS[lang];
  const categoryLabel = tLabel.categories[t.category] || t.category;
  console.log({ categoryLabel, t });

  return (
    <div
      onClick={() => onClick(t)}
      className="group bg-[#F0F4F8] hover:bg-white hover:shadow-md hover:scale-[1.01] active:scale-[0.98]
                 p-4 rounded-[20px] transition-all duration-300 flex justify-between items-center
                 cursor-pointer border border-transparent hover:border-indigo-50
                 print:bg-white print:border-gray-200 print:shadow-none"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                      transition-transform group-hover:rotate-12
                      ${
                        t.type === "income"
                          ? "bg-[#C4EED0] text-[#0F5223]"
                          : "bg-[#FFDAD6] text-[#93000A]"
                      }
                      print:border print:border-gray-100`}
        >
          {getCategoryIcon(t.category)}
        </div>
        <div className="flex flex-col">
          <p
            className="text-base font-medium text-[#1A1C1E] leading-tight
                        group-hover:text-[#005AC1] transition-colors"
          >
            {t.text}
          </p>
          <p className="text-xs text-[#43474E] mt-1">
            {viewMode === "daily"
              ? categoryLabel
              : formatDate(t.date, LOCALE_MAP[lang])}
            {viewMode !== "daily" ? ` • ${categoryLabel}` : ""}
          </p>
        </div>
      </div>
      <span
        className={`text-base font-bold ${
          t.type === "income" ? "text-[#0F5223]" : "text-[#1A1C1E]"
        }`}
      >
        {t.type === "income" ? "+" : ""}
        {formatCurrency(t.amount, LOCALE_MAP[lang])}
      </span>
    </div>
  );
}
