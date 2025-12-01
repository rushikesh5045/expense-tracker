// src/components/SimpleBarChart.jsx
import React from "react";
import Tooltip from "./Tooltip";
import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";

export default function SimpleBarChart({ data, lang = "en" }) {
  const tLabel = TRANSLATIONS[lang];
  const maxVal = Math.max(...data.map((d) => Math.max(d.income, d.expense)), 1);

  return (
    <div className="w-full h-48 overflow-x-auto pb-2">
      <div
        className="flex items-end justify-between gap-2 pt-6 px-1"
        style={{ minWidth: "600px" }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 flex-1 h-40 justify-end group relative min-w-0"
          >
            <Tooltip
              text={`${d.label} \n ${tLabel.income}: ${d.income} | ${tLabel.expense}: ${d.expense}`}
            >
              <div className="w-full flex items-end justify-center gap-1 h-full relative px-0.5 cursor-pointer transition-transform hover:scale-105">
                <div
                  style={{
                    height: `${Math.max(
                      d.income > 0 ? 4 : 0,
                      (d.income / maxVal) * 100
                    )}%`,
                  }}
                  className={`w-3 sm:w-4 bg-[#C4EED0] rounded-t-sm transition-all duration-500 ease-out ${
                    d.income === 0 ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  style={{
                    height: `${Math.max(
                      d.expense > 0 ? 4 : 0,
                      (d.expense / maxVal) * 100
                    )}%`,
                  }}
                  className={`w-3 sm:w-4 bg-[#FFDAD6] rounded-t-sm transition-all duration-500 ease-out ${
                    d.expense === 0 ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </Tooltip>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium truncate w-full text-center px-0.5">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
