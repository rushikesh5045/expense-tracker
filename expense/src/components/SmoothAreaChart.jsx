// src/components/SmoothAreaChart.jsx
import React, { useState, useRef } from "react";
import { formatCurrency } from "../helpers/format.jsx";
import { LOCALE_MAP } from "../constants/translations.jsx";

export default function SmoothAreaChart({
  data,
  color,
  height = 200,
  lang = "en",
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartRef = useRef(null);

  if (!data || data.length < 2) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
        Not enough data to chart
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => d.value)) || 100;
  const width = 300;
  const chartHeight = height - 40;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = chartHeight - (d.value / maxVal) * (chartHeight - 30) - 15;
    return { x, y, value: d.value, label: d.label };
  });

  const pathData = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const cpsX = arr[i - 1].x + (point.x - arr[i - 1].x) / 2;
    const cpsY = arr[i - 1].y;
    const cpeX = arr[i - 1].x + (point.x - arr[i - 1].x) / 2;
    const cpeY = point.y;
    return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
  }, "");

  const areaPath = `${pathData} L ${width},${chartHeight} L 0,${chartHeight} Z`;

  const handleInteraction = (clientX) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const index = Math.min(
      data.length - 1,
      Math.max(0, Math.round((x / rect.width) * (data.length - 1)))
    );
    setActiveIndex(index);
  };

  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <div
      className="w-full overflow-hidden select-none relative cursor-crosshair touch-none"
      ref={chartRef}
      onMouseMove={(e) => handleInteraction(e.clientX)}
      onMouseLeave={() => setActiveIndex(null)}
      onTouchMove={(e) => handleInteraction(e.touches[0].clientX)}
      onTouchEnd={() => setActiveIndex(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor={color}
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* Baseline */}
        <line
          x1="0"
          y1={chartHeight}
          x2={width}
          y2={chartHeight}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {/* Top line */}
        <line
          x1="0"
          y1={15}
          x2={width}
          y2={15}
          stroke="#f1f5f9"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <text
          x={width}
          y={12}
          textAnchor="end"
          fill="#cbd5e1"
          fontSize="8"
          fontWeight="bold"
        >
          {formatCurrency(maxVal, LOCALE_MAP[lang])}
        </text>

        {/* Area shape */}
        <path
          d={areaPath}
          fill={`url(#gradient-${color})`}
          stroke="none"
          className="animate-in fade-in duration-1000"
        />
        {/* Smooth line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
          className="animate-in fade-in duration-700"
        />

        {/* Active point lines */}
        {activePoint && (
          <>
            <line
              x1={activePoint.x}
              y1={0}
              x2={activePoint.x}
              y2={chartHeight}
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-60"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="5"
              fill="white"
              stroke={color}
              strokeWidth="3"
              className="drop-shadow-md"
            />
          </>
        )}

        {/* X-Axis labels */}
        {points.map((p, i) => {
          const showLabel =
            data.length > 10
              ? i === 0 || i === points.length - 1 || i % 5 === 0
              : true;
          if (showLabel) {
            return (
              <text
                key={i}
                x={p.x}
                y={height - 5}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontWeight={activeIndex === i ? "bold" : "normal"}
                fillOpacity={activeIndex === i ? 1 : 0.7}
              >
                {p.label}
              </text>
            );
          }
          return null;
        })}
      </svg>

      {/* Active point tooltip */}
      {activePoint && (
        <div
          className="absolute top-0 pointer-events-none z-10 bg-slate-800 text-white text-[10px]
                     px-3 py-1.5 rounded-lg shadow-xl flex flex-col items-center transition-all
                     duration-75 ease-out transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(activePoint.x / width) * 100}%`,
            top: `${(activePoint.y / height) * 100}%`,
            marginTop: "-12px",
          }}
        >
          <span className="font-bold text-xs">
            {formatCurrency(activePoint.value, LOCALE_MAP[lang])}
          </span>
          <span className="text-slate-400 text-[9px]">{activePoint.label}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}
