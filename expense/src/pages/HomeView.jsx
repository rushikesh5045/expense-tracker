// src/pages/HomeView.jsx
import React, { useMemo } from "react";
import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";
import TransactionItem from "../components/TransactionItem";
import DateNavigator from "../components/DateNavigator"; // <--- import here
import { formatCurrency, getMonthYearLabel } from "../helpers/format.jsx";
import { Sun, CalendarRange, CalendarClock, Calendar } from "lucide-react";

export default function HomeView({
  viewMode,
  setViewMode,
  viewDate,
  setViewDate,
  activeTab,
  homeStats,
  filteredTransactions,
  setSelectedTransaction,
  lang = "en",
}) {
  const tLabel = TRANSLATIONS[lang];

  const groupedTransactions = useMemo(() => {
    if (viewMode !== "yearly") return null;

    const groups = {};
    filteredTransactions.forEach((t) => {
      const monthKey = getMonthYearLabel(t.date, LOCALE_MAP[lang]);
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(t);
    });

    return Object.entries(groups).sort((a, b) => {
      return new Date(b[1][0].date) - new Date(a[1][0].date);
    });
  }, [filteredTransactions, viewMode, lang]);

  return (
    <div className="space-y-5 animate-in slide-in-from-bottom-8 duration-500 fade-in pb-32">
      {/* View mode toggles */}
      <div className="flex bg-[#E0E2EC] p-1 rounded-full relative w-full h-12 shadow-inner items-center print:hidden">
        <button
          onClick={() => setViewMode("daily")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-full text-xs font-medium h-10 transition-all duration-300 z-10 ${
            viewMode === "daily"
              ? "bg-white text-[#001D35] shadow-sm"
              : "text-[#43474E] hover:bg-white/50"
          }`}
        >
          <Sun size={14} strokeWidth={2.5} /> {tLabel.daily}
        </button>
        <button
          onClick={() => setViewMode("monthly")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-full text-xs font-medium h-10 transition-all duration-300 z-10 ${
            viewMode === "monthly"
              ? "bg-white text-[#001D35] shadow-sm"
              : "text-[#43474E] hover:bg-white/50"
          }`}
        >
          <CalendarRange size={14} strokeWidth={2.5} /> {tLabel.monthly}
        </button>
        <button
          onClick={() => setViewMode("yearly")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-full text-xs font-medium h-10 transition-all duration-300 z-10 ${
            viewMode === "yearly"
              ? "bg-white text-[#001D35] shadow-sm"
              : "text-[#43474E] hover:bg-white/50"
          }`}
        >
          <CalendarClock size={14} strokeWidth={2.5} /> {tLabel.yearly}
        </button>
      </div>

      {/* Top date navigator (daily/monthly/yearly) */}
      <DateNavigator
        viewDate={viewDate}
        setViewDate={setViewDate}
        viewMode={viewMode}
        activeTab={activeTab}
        lang={lang}
      />

      {/* Big gradient card for balance */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#005AC1] to-[#00428C] text-white rounded-[32px] p-6 shadow-xl shadow-indigo-900/20 isolate group hover:scale-[1.01] transition-transform duration-500 print:shadow-none print:border print:border-gray-200">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#699BF7] rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#74ABFF] rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="flex flex-col relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#D3E3FD] text-sm font-medium tracking-wide">
              {tLabel[viewMode] || viewMode} {tLabel.balance}
            </span>
            <Calendar size={16} className="text-[#D3E3FD] opacity-50" />
          </div>
          <span className="text-[42px] leading-tight font-medium tracking-tight mb-8 font-sans">
            {formatCurrency(homeStats.balance, LOCALE_MAP[lang]).replace(
              "₹",
              "₹ "
            )}
          </span>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/10 rounded-2xl p-3.5 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20 print:bg-transparent print:border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-[#C4EED0] p-1 rounded-full text-[#0F5223]">
                  <CalendarRange size={14} strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-[#D3E3FD] uppercase print:text-white">
                  {tLabel.income}
                </span>
              </div>
              <span className="text-lg font-semibold block truncate">
                {formatCurrency(homeStats.income, LOCALE_MAP[lang])}
              </span>
            </div>
            <div className="flex-1 bg-white/10 rounded-2xl p-3.5 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20 print:bg-transparent print:border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-[#FFDAD6] p-1 rounded-full text-[#93000A]">
                  <CalendarClock size={14} strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-[#FFB4AB] uppercase print:text-white">
                  {tLabel.spent}
                </span>
              </div>
              <span className="text-lg font-semibold block truncate">
                {formatCurrency(homeStats.expense, LOCALE_MAP[lang])}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[#43474E] ml-2 mb-1 animate-in fade-in slide-in-from-left-4 duration-500">
          {tLabel.recentActivity}
        </h3>

        {viewMode === "yearly" && groupedTransactions ? (
          groupedTransactions.map(([monthLabel, monthTrans], groupIndex) => (
            <div key={monthLabel} className="space-y-2">
              <div className="sticky top-0 z-10 bg-[#FDFBFF]/95 backdrop-blur-sm px-2 py-2 text-xs font-bold text-[#005AC1] uppercase tracking-wider shadow-sm border-b border-slate-100 print:static print:bg-transparent">
                {monthLabel}
              </div>
              {monthTrans.map((t, index) => (
                <div
                  key={t.id}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards"
                >
                  <TransactionItem
                    t={t}
                    onClick={setSelectedTransaction}
                    viewMode={viewMode}
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          ))
        ) : filteredTransactions.length > 0 ? (
          <div className="grid gap-2">
            {filteredTransactions.map((t, index) => (
              <div
                key={t.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards"
              >
                <TransactionItem
                  t={t}
                  onClick={setSelectedTransaction}
                  viewMode={viewMode}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 animate-in zoom-in duration-500">
            <Calendar size={48} className="mb-4 opacity-20" />
            <p>{tLabel.noTransactions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
