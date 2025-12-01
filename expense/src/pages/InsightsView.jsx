// src/pages/InsightsView.jsx
import React, { useState, useMemo } from "react";
import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";
import SmoothAreaChart from "../components/SmoothAreaChart";
import SimpleBarChart from "../components/SimpleBarChart";
import DonutChart from "../components/DonutChart";
import TransactionItem from "../components/TransactionItem";
import DateNavigator from "../components/DateNavigator";
import { CATEGORY_COLORS } from "../helpers/icons.jsx";

export default function InsightsView({
  transactions,
  viewDate,
  setViewDate,
  viewMode,
  activeTab,
  setSelectedTransaction,
  lang = "en",
}) {
  const [focusType, setFocusType] = useState("expense");
  const [vizType, setVizType] = useState("breakdown");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const tLabel = TRANSLATIONS[lang];

  // Prepare data for breakdown, trend, history
  const insightsData = useMemo(() => {
    const filteredTrans = transactions.filter((t) => {
      const tDate = new Date(t.date);
      if (viewMode === "yearly") {
        return tDate.getFullYear() === viewDate.getFullYear();
      }
      return (
        tDate.getMonth() === viewDate.getMonth() &&
        tDate.getFullYear() === viewDate.getFullYear()
      );
    });

    const getBreakdown = (type) => {
      const map = {};
      filteredTrans
        .filter((t) => t.type === type)
        .forEach((t) => {
          map[t.category] = (map[t.category] || 0) + parseFloat(t.amount);
        });
      return Object.keys(map)
        .map((cat) => ({ label: cat, value: map[cat] }))
        .sort((a, b) => b.value - a.value);
    };

    const getTrend = (type) => {
      const trend = [];
      if (viewMode === "yearly") {
        for (let i = 0; i < 12; i++) {
          const val = filteredTrans
            .filter((t) => t.type === type && new Date(t.date).getMonth() === i)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
          const d = new Date(viewDate.getFullYear(), i, 1);
          trend.push({
            label: d.toLocaleDateString(LOCALE_MAP[lang], { month: "short" }),
            value: val,
          });
        }
      } else {
        const daysInMonth = new Date(
          viewDate.getFullYear(),
          viewDate.getMonth() + 1,
          0
        ).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
          const val = filteredTrans
            .filter((t) => t.type === type && new Date(t.date).getDate() === i)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
          trend.push({ label: `${i}`, value: val });
        }
      }
      return trend;
    };

    const getHistory = () => {
      const history = [];
      const count = 12;
      if (viewMode === "yearly") {
        // For the last 12 years
        for (let i = count - 1; i >= 0; i--) {
          const y = viewDate.getFullYear() - i;
          const mIncome = transactions
            .filter(
              (t) => t.type === "income" && new Date(t.date).getFullYear() === y
            )
            .reduce((s, t) => s + parseFloat(t.amount), 0);
          const mExpense = transactions
            .filter(
              (t) =>
                t.type === "expense" && new Date(t.date).getFullYear() === y
            )
            .reduce((s, t) => s + parseFloat(t.amount), 0);
          history.push({
            label: y.toString(),
            income: mIncome,
            expense: mExpense,
          });
        }
      } else {
        // For the last 12 months
        for (let i = count - 1; i >= 0; i--) {
          const d = new Date(
            viewDate.getFullYear(),
            viewDate.getMonth() - i,
            1
          );
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          const mIncome = transactions
            .filter((t) => t.type === "income" && t.date.startsWith(key))
            .reduce((s, t) => s + parseFloat(t.amount), 0);
          const mExpense = transactions
            .filter((t) => t.type === "expense" && t.date.startsWith(key))
            .reduce((s, t) => s + parseFloat(t.amount), 0);
          history.push({
            label: d.toLocaleDateString(LOCALE_MAP[lang], { month: "short" }),
            income: mIncome,
            expense: mExpense,
          });
        }
      }
      return history;
    };

    return {
      expenseBreakdown: getBreakdown("expense"),
      incomeBreakdown: getBreakdown("income"),
      expenseTrend: getTrend("expense"),
      incomeTrend: getTrend("income"),
      history: getHistory(),
    };
  }, [transactions, viewDate, viewMode, lang]);

  // Decide which data set (expense or income)
  const activeData =
    focusType === "expense"
      ? insightsData.expenseBreakdown
      : insightsData.incomeBreakdown;
  const activeTrend =
    focusType === "expense"
      ? insightsData.expenseTrend
      : insightsData.incomeTrend;
  const totalAmount = activeData.reduce((acc, item) => acc + item.value, 0);

  // Filter transactions by selected category
  const filteredCategoryTransactions = useMemo(() => {
    if (!selectedCategory) return [];
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        const matchesCategory =
          t.category === selectedCategory && t.type === focusType;
        if (!matchesCategory) return false;

        if (viewMode === "yearly") {
          return tDate.getFullYear() === viewDate.getFullYear();
        }
        return (
          tDate.getMonth() === viewDate.getMonth() &&
          tDate.getFullYear() === viewDate.getFullYear()
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, transactions, focusType, viewDate, viewMode]);

  // Return the main UI
  return (
    <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-500 fade-in">
      {/* Date Navigator */}
      <DateNavigator
        viewDate={viewDate}
        setViewDate={setViewDate}
        viewMode={viewMode}
        activeTab={activeTab}
        lang={lang}
      />

      {/* Toggle between expense/income */}
      <div className="flex bg-[#E0E2EC] p-1 rounded-2xl shadow-inner print:hidden">
        <button
          onClick={() => setFocusType("expense")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            focusType === "expense"
              ? "bg-[#FFDAD6] text-[#410002] shadow-sm"
              : "text-[#43474E] hover:bg-white/50"
          }`}
        >
          {tLabel.expense}
        </button>
        <button
          onClick={() => setFocusType("income")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            focusType === "income"
              ? "bg-[#C4EED0] text-[#00210B] shadow-sm"
              : "text-[#43474E] hover:bg-white/50"
          }`}
        >
          {tLabel.income}
        </button>
      </div>

      {/* Chart type toggles */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide print:hidden">
        <button
          onClick={() => setVizType("breakdown")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "breakdown"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          {/* Icon */}
          {tLabel.breakdown}
        </button>
        <button
          onClick={() => setVizType("trend")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "trend"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          {tLabel.trend}
        </button>
        <button
          onClick={() => setVizType("history")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "history"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          {tLabel.history}
        </button>
      </div>

      {/* Main chart or details area */}
      <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 min-h-[300px] transition-all duration-500 print:shadow-none print:border-none">
        {vizType === "breakdown" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <h3 className="text-lg font-semibold text-[#1A1C1E] mb-2">
              {tLabel.whereMoneyWent}
            </h3>
            <p className="text-xs text-[#43474E] mb-6">{tLabel.tapDetails}</p>

            <DonutChart
              data={activeData}
              colors={CATEGORY_COLORS}
              onCategoryClick={setSelectedCategory}
              lang={lang}
            />

            <div className="mt-8 space-y-3">
              {activeData.map((item, index) => (
                <div
                  key={item.label}
                  onClick={() => setSelectedCategory(item.label)}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-indigo-100 hover:shadow-sm"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-[#005AC1]">
                      {/* You could use getCategoryIcon here if you want */}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-[#1A1C1E]">
                        {tLabel.categories[item.label] || item.label}
                      </span>
                      <div className="w-24 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${(item.value / totalAmount) * 100}%`,
                            backgroundColor:
                              CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-sm text-[#1A1C1E]">
                      {item.value}
                    </span>
                    <span className="text-xs text-[#43474E]">
                      {Math.round((item.value / totalAmount) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
              {activeData.length === 0 && (
                <p className="text-center text-gray-400 py-4">
                  {tLabel.noTransactions}
                </p>
              )}
            </div>
          </div>
        )}

        {vizType === "trend" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <h3 className="text-lg font-semibold text-[#1A1C1E] mb-2">
              {viewMode === "yearly" ? tLabel.monthly : tLabel.daily}{" "}
              {tLabel.trend}
            </h3>
            <p className="text-xs text-[#43474E] mb-6">
              {focusType === "expense" ? tLabel.expense : tLabel.income} curve
            </p>
            <SmoothAreaChart
              data={activeTrend}
              color={focusType === "expense" ? "#BA1A1A" : "#006D39"}
              height={220}
              lang={lang}
            />
          </div>
        )}

        {vizType === "history" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <h3 className="text-lg font-semibold text-[#1A1C1E] mb-2">
              {tLabel.history}
            </h3>
            <SimpleBarChart data={insightsData.history} lang={lang} />
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#C4EED0] rounded-full"></div>
                <span className="text-xs font-medium text-[#43474E]">
                  {tLabel.income}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFDAD6] rounded-full"></div>
                <span className="text-xs font-medium text-[#43474E]">
                  {tLabel.expense}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Category Transaction List */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FDFBFF] w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-lg text-[#1A1C1E]">
                  {tLabel.categories[selectedCategory] || selectedCategory}
                </h3>
                <p className="text-xs text-gray-500">
                  {focusType === "expense" ? tLabel.expense : tLabel.income}{" "}
                  {tLabel.breakdown}
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2">
              {filteredCategoryTransactions.map((t, idx) => (
                <TransactionItem
                  key={t.id}
                  t={t}
                  onClick={(tx) => {
                    setSelectedCategory(null);
                    setSelectedTransaction(tx);
                  }}
                  viewMode={viewMode}
                  lang={lang}
                />
              ))}
              {filteredCategoryTransactions.length === 0 && (
                <p className="text-center py-8 text-gray-400">
                  {tLabel.noTransactions}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
