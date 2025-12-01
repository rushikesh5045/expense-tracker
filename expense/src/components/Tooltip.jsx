// src/components/Tooltip.jsx
import React from "react";

export default function Tooltip({ children, text, position = "top" }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div
        className={`
        absolute ${
          position === "top" ? "-top-10" : "-bottom-10"
        } left-1/2 -translate-x-1/2
        scale-0 group-hover:scale-100 transition-all duration-200 ease-out origin-center
        bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none print:hidden
      `}
      >
        {text}
        <div
          className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
            position === "top"
              ? "top-full border-t-slate-800"
              : "bottom-full border-b-slate-800"
          }`}
        />
      </div>
    </div>
  );
}
