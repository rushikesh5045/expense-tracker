// src/components/DateNavigator.jsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";

export default function DateNavigator({
  viewDate,
  setViewDate,
  viewMode,
  activeTab,
  lang,
}) {
  const tLabel = TRANSLATIONS[lang] || {};
  const inputRef = useRef(null);

  const handlePrev = () => {
    const d = new Date(viewDate);
    if (viewMode === "monthly") {
      d.setMonth(d.getMonth() - 1);
    } else if (viewMode === "yearly") {
      d.setFullYear(d.getFullYear() - 1);
    } else {
      d.setDate(d.getDate() - 1);
    }
    setViewDate(d);
  };

  const handleNext = () => {
    const d = new Date(viewDate);
    if (viewMode === "monthly") {
      d.setMonth(d.getMonth() + 1);
    } else if (viewMode === "yearly") {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      d.setDate(d.getDate() + 1);
    }
    setViewDate(d);
  };

  let label = "";
  let pickerType = "date";
  let pickerVal = "";

  if (viewMode === "monthly") {
    label = viewDate.toLocaleDateString(LOCALE_MAP[lang], {
      month: "long",
      year: "numeric",
    });
    pickerType = "month";
    pickerVal = `${viewDate.getFullYear()}-${String(
      viewDate.getMonth() + 1
    ).padStart(2, "0")}`;
  } else if (viewMode === "yearly") {
    label = viewDate.getFullYear().toString();
  } else {
    const today = new Date();
    label =
      viewDate.toDateString() === today.toDateString()
        ? tLabel.today
        : viewDate.toLocaleDateString(LOCALE_MAP[lang], {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
    const offsetDate = new Date(
      viewDate.getTime() - viewDate.getTimezoneOffset() * 60000
    );
    pickerVal = offsetDate.toISOString().split("T")[0];
  }

  const yearRange = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  return (
    <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-1 mb-4 shadow-sm border border-white/50 h-14 print:hidden">
      <button
        onClick={handlePrev}
        className="p-3 hover:bg-[#E0E2EC] rounded-full text-[#43474E] transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="relative group cursor-pointer flex flex-col items-center justify-center flex-1 h-full px-4 z-10">
        {viewMode === "yearly" ? (
          <div className="flex items-center gap-2 relative w-full justify-center h-full">
            <span className="text-lg font-semibold text-[#1A1C1E] group-hover:text-[#005AC1] transition-colors">
              {label}
            </span>
            <ChevronDown size={16} className="text-[#43474E] opacity-50" />
            <select
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer appearance-none"
              value={viewDate.getFullYear()}
              onChange={(e) => {
                const d = new Date(viewDate);
                d.setFullYear(parseInt(e.target.value));
                setViewDate(d);
              }}
            >
              {yearRange.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-[#1A1C1E] group-hover:text-[#005AC1] transition-colors pointer-events-none">
              {label}
            </span>
            {viewMode === "daily" && activeTab === "home" && (
              <span className="text-xs text-[#43474E] pointer-events-none">
                {viewDate.getFullYear()}
              </span>
            )}

            {/* Invisible Input Overlay - Clicks go directly here now */}
            <input
              ref={inputRef}
              type={pickerType}
              value={pickerVal}
              onChange={(e) => {
                if (!e.target.value) return;
                if (pickerType === "month") {
                  const [y, m] = e.target.value.split("-");
                  setViewDate(new Date(parseInt(y), parseInt(m) - 1, 1));
                } else {
                  setViewDate(new Date(e.target.value));
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 appearance-none"
              style={{ display: "block" }}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="p-3 hover:bg-[#E0E2EC] rounded-full text-[#43474E] transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
