import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus,
  Trash2,
  Wallet,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Car,
  Zap,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Home,
  MoreHorizontal,
  Briefcase,
  Laptop,
  LineChart,
  Gift,
  Building,
  Pencil,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  PieChart as PieChartIcon,
  LayoutGrid,
  BarChart3,
  Activity,
  Sun,
  ChevronDown,
  Globe,
  Check,
  AlignLeft,
  Tag,
  Download,
  FileText,
  Sheet,
  Printer,
} from "lucide-react";

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    netWorth: "Net Worth",
    income: "Income",
    expense: "Expense",
    daily: "Daily",
    monthly: "Monthly",
    yearly: "Yearly",
    recentActivity: "Recent Activity",
    breakdown: "Breakdown",
    trend: "Trend",
    history: "History",
    addTransaction: "Add Transaction",
    editTransaction: "Edit Transaction",
    save: "Save Transaction",
    update: "Update Transaction",
    delete: "Delete",
    amount: "Amount",
    enterAmount: "Enter Amount",
    description: "Note",
    descriptionPlaceholder: "What is this for?",
    category: "Category",
    selectCategory: "Select Category",
    date: "Date",
    noTransactions: "No transactions found",
    dailyAverage: "Daily Average",
    total: "Total",
    whereMoneyWent: "Where your money went",
    distribution: "Distribution by category",
    tapDetails: "Tap a slice or category to see details",
    balance: "Balance",
    spent: "Spent",
    tapToEdit: "Tap number to edit",
    limit: "Limit",
    today: "Today",
    addNew: "Add New",
    enterCategory: "Category Name",
    export: "Export",
    exportCsv: "Export to CSV",
    exportPdf: "Print / Save as PDF",
    categories: {
      Salary: "Salary",
      Freelance: "Freelance",
      Investments: "Investments",
      Gifts: "Gifts",
      Rental: "Rental",
      Other: "Other",
      Food: "Food",
      Transport: "Transport",
      Bills: "Bills",
      Shopping: "Shopping",
      Entertainment: "Entertainment",
      Health: "Health",
      Education: "Education",
      Rent: "Rent",
    },
  },
  hi: {
    netWorth: "कुल संपत्ति",
    income: "आय",
    expense: "खर्च",
    daily: "दैनिक",
    monthly: "मासिक",
    yearly: "वार्षिक",
    recentActivity: "हाल की गतिविधि",
    breakdown: "विवरण",
    trend: "रुझान",
    history: "इतिहास",
    addTransaction: "लेन-देन जोड़ें",
    editTransaction: "लेन-देन संपादित करें",
    save: "सहेजें",
    update: "अपडेट करें",
    delete: "हटाएं",
    amount: "राशि",
    enterAmount: "राशि दर्ज करें",
    description: "नोट",
    descriptionPlaceholder: "यह किस लिए है?",
    category: "श्रेणी",
    selectCategory: "श्रेणी चुनें",
    date: "दिनांक",
    noTransactions: "कोई लेन-देन नहीं मिला",
    dailyAverage: "दैनिक औसत",
    total: "कुल",
    whereMoneyWent: "आपका पैसा कहाँ गया",
    distribution: "श्रेणी के अनुसार वितरण",
    tapDetails: "विवरण देखने के लिए टैप करें",
    balance: "शेष राशि",
    spent: "व्यय",
    tapToEdit: "संपादित करने के लिए टैप करें",
    limit: "सीमा",
    today: "आज",
    addNew: "नया जोड़ें",
    enterCategory: "श्रेणी का नाम",
    export: "निर्यात",
    exportCsv: "CSV में निर्यात करें",
    exportPdf: "PDF में प्रिंट/सहेजें",
    categories: {
      Salary: "वेतन",
      Freelance: "फ्रीलांस",
      Investments: "निवेश",
      Gifts: "उपहार",
      Rental: "किराया",
      Other: "अन्य",
      Food: "भोजन",
      Transport: "परिवहन",
      Bills: "बिल",
      Shopping: "खरीदारी",
      Entertainment: "मनोरंजन",
      Health: "स्वास्थ्य",
      Education: "शिक्षा",
      Rent: "किराया",
    },
  },
  mr: {
    netWorth: "एकूण संपत्ती",
    income: "उत्पन्न",
    expense: "खर्च",
    daily: "दैनिक",
    monthly: "मासिक",
    yearly: "वार्षिक",
    recentActivity: "अलीकडील व्यवहार",
    breakdown: "तपशील",
    trend: "कल",
    history: "इतिहास",
    addTransaction: "व्यवहार जोडा",
    editTransaction: "व्यवहार संपादित करा",
    save: "जतन करा",
    update: "अद्यतन करा",
    delete: "काढून टाका",
    amount: "रक्कम",
    enterAmount: "रक्कम टाका",
    description: "टीप",
    descriptionPlaceholder: "हे कशासाठी आहे?",
    category: "श्रेणी",
    selectCategory: "श्रेणी निवडा",
    date: "दिनांक",
    noTransactions: "कोणतेही व्यवहार सापडले नाहीत",
    dailyAverage: "दैनिक सरासरी",
    total: "एकूण",
    whereMoneyWent: "तुमचे पैसे कुठे गेले",
    distribution: "श्रेणीनुसार वितरण",
    tapDetails: "तपशील पाहण्यासाठी टॅप करा",
    balance: "शिल्लक",
    spent: "खर्च",
    tapToEdit: "संपादित करण्यासाठी टॅप करा",
    limit: "मर्यादा",
    today: "आज",
    addNew: "नवीन जोडा",
    enterCategory: "श्रेणीचे नाव",
    export: "निर्यात",
    exportCsv: "CSV मध्ये निर्यात करा",
    exportPdf: "PDF मध्ये प्रिंट/जतन करा",
    categories: {
      Salary: "पगार",
      Freelance: "फ्रीलाान्स",
      Investments: "गुंतवणूक",
      Gifts: "भेटवस्तू",
      Rental: "भाडे",
      Other: "इतर",
      Food: "जेवण",
      Transport: "वाहतूक",
      Bills: "बिले",
      Shopping: "खरेदी",
      Entertainment: "मनोरंजन",
      Health: "आरोग्य",
      Education: "शिक्षण",
      Rent: "भाडे",
    },
  },
};

const LOCALE_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

// --- CONSTANTS ---
const DEFAULT_INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Gifts",
  "Rental",
  "Other",
];
const DEFAULT_EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Rent",
  "Other",
];
const CATEGORY_COLORS = [
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

// --- HELPERS ---
const getCategoryIcon = (category, size = 20) => {
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
};

const formatCurrency = (num, locale = "en-IN") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
const formatDate = (dateString, locale = "en-IN") =>
  new Date(dateString).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  });
const formatFullDate = (dateString, locale = "en-IN") =>
  new Date(dateString).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const getMonthYearLabel = (dateString, locale = "en-IN") =>
  new Date(dateString).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

// --- UI COMPONENTS ---

const Tooltip = ({ children, text, position = "top" }) => (
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
      ></div>
    </div>
  </div>
);

const TransactionItem = ({ t, onClick, viewMode, lang }) => {
  const tLabel = TRANSLATIONS[lang];
  const categoryLabel = tLabel.categories[t.category] || t.category;
  return (
    <div
      onClick={() => onClick(t)}
      className="group bg-[#F0F4F8] hover:bg-white hover:shadow-md hover:scale-[1.01] active:scale-[0.98] p-4 rounded-[20px] transition-all duration-300 flex justify-between items-center cursor-pointer border border-transparent hover:border-indigo-50 print:bg-white print:border-gray-200 print:shadow-none"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:rotate-12 ${
            t.type === "income"
              ? "bg-[#C4EED0] text-[#0F5223]"
              : "bg-[#FFDAD6] text-[#93000A]"
          } print:border print:border-gray-100`}
        >
          {getCategoryIcon(t.category)}
        </div>
        <div className="flex flex-col">
          <p className="text-base font-medium text-[#1A1C1E] leading-tight group-hover:text-[#005AC1] transition-colors">
            {t.text}
          </p>
          <p className="text-xs text-[#43474E] mt-1">
            {viewMode === "daily"
              ? categoryLabel
              : formatDate(t.date, LOCALE_MAP[lang])}{" "}
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
};

// --- CHART COMPONENTS ---
const SmoothAreaChart = ({ data, color, height = 200, lang }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartRef = useRef(null);
  if (!data || data.length < 2)
    return (
      <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
        Not enough data to chart
      </div>
    );
  const maxVal = Math.max(...data.map((d) => d.value)) || 100;
  const width = 300;
  const chartHeight = height - 40;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = chartHeight - (d.value / maxVal) * (chartHeight - 30) - 15;
    return { x, y, value: d.value, label: d.label };
  });
  const pathData = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const cpsX = a[i - 1].x + (point.x - a[i - 1].x) / 2;
    const cpsY = a[i - 1].y;
    const cpeX = a[i - 1].x + (point.x - a[i - 1].x) / 2;
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
        <line
          x1="0"
          y1={chartHeight}
          x2={width}
          y2={chartHeight}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
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
        <path
          d={areaPath}
          fill={`url(#gradient-${color})`}
          stroke="none"
          className="animate-in fade-in duration-1000"
        />
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
      {activePoint && (
        <div
          className="absolute top-0 pointer-events-none z-10 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg shadow-xl flex flex-col items-center transition-all duration-75 ease-out transform -translate-x-1/2 -translate-y-full"
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
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

const SimpleBarChart = ({ data, lang }) => {
  const maxVal = Math.max(...data.map((d) => Math.max(d.income, d.expense)), 1);
  const tLabel = TRANSLATIONS[lang];

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
                ></div>
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
                ></div>
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
};

const DonutChart = ({ data, colors, onCategoryClick, lang }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;
  const tLabel = TRANSLATIONS[lang];
  if (total === 0)
    return (
      <div className="relative w-[220px] h-[220px] mx-auto my-4 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-[16px] border-slate-50 flex items-center justify-center">
          <span className="text-xs text-gray-400">No Data</span>
        </div>
      </div>
    );
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
        ? `M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0`
        : `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
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
};

// --- SUB-COMPONENTS ---

const DateNavigator = ({
  viewDate,
  setViewDate,
  viewMode,
  activeTab,
  lang,
}) => {
  const tLabel = TRANSLATIONS[lang];
  const inputRef = useRef(null);

  const handlePrev = () => {
    const d = new Date(viewDate);
    if (viewMode === "monthly") d.setMonth(d.getMonth() - 1);
    else if (viewMode === "yearly") d.setFullYear(d.getFullYear() - 1);
    else d.setDate(d.getDate() - 1);
    setViewDate(d);
  };
  const handleNext = () => {
    const d = new Date(viewDate);
    if (viewMode === "monthly") d.setMonth(d.getMonth() + 1);
    else if (viewMode === "yearly") d.setFullYear(d.getFullYear() + 1);
    else d.setDate(d.getDate() + 1);
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
};

const InsightsView = ({
  transactions,
  viewDate,
  setViewDate,
  viewMode,
  activeTab,
  setSelectedTransaction,
  lang,
}) => {
  const [focusType, setFocusType] = useState("expense");
  const [vizType, setVizType] = useState("breakdown");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const tLabel = TRANSLATIONS[lang];

  const insightsData = useMemo(() => {
    const filteredTrans = transactions.filter((t) => {
      const tDate = new Date(t.date);
      if (viewMode === "yearly")
        return tDate.getFullYear() === viewDate.getFullYear();
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

  const activeData =
    focusType === "expense"
      ? insightsData.expenseBreakdown
      : insightsData.incomeBreakdown;
  const activeTrend =
    focusType === "expense"
      ? insightsData.expenseTrend
      : insightsData.incomeTrend;
  const totalAmount = activeData.reduce((acc, item) => acc + item.value, 0);

  const filteredCategoryTransactions = useMemo(() => {
    if (!selectedCategory) return [];
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        const matchesCategory =
          t.category === selectedCategory && t.type === focusType;
        if (!matchesCategory) return false;

        if (viewMode === "yearly")
          return tDate.getFullYear() === viewDate.getFullYear();
        return (
          tDate.getMonth() === viewDate.getMonth() &&
          tDate.getFullYear() === viewDate.getFullYear()
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, transactions, focusType, viewDate, viewMode]);

  return (
    <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-500 fade-in">
      <DateNavigator
        viewDate={viewDate}
        setViewDate={setViewDate}
        viewMode={viewMode}
        activeTab={activeTab}
        lang={lang}
      />
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

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide print:hidden">
        <button
          onClick={() => setVizType("breakdown")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "breakdown"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          <PieChartIcon size={14} /> {tLabel.breakdown}
        </button>
        <button
          onClick={() => setVizType("trend")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "trend"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          <Activity size={14} /> {tLabel.trend}
        </button>
        <button
          onClick={() => setVizType("history")}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 flex items-center gap-2 ${
            vizType === "history"
              ? "bg-[#005AC1] text-white border-[#005AC1] shadow-md"
              : "bg-white text-[#43474E] border-[#74777F] hover:bg-slate-50"
          }`}
        >
          <BarChart3 size={14} /> {tLabel.history}
        </button>
      </div>

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
                      {getCategoryIcon(item.label, 16)}
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
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-sm text-[#1A1C1E]">
                      {formatCurrency(item.value, LOCALE_MAP[lang])}
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
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2">
              {filteredCategoryTransactions.map((t, idx) => (
                <TransactionItem
                  key={t.id}
                  t={t}
                  onClick={(t) => {
                    setSelectedCategory(null);
                    setSelectedTransaction(t);
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
};

const HomeView = ({
  viewMode,
  setViewMode,
  viewDate,
  setViewDate,
  activeTab,
  homeStats,
  filteredTransactions,
  setSelectedTransaction,
  lang,
}) => {
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

      <DateNavigator
        viewDate={viewDate}
        setViewDate={setViewDate}
        viewMode={viewMode}
        activeTab={activeTab}
        lang={lang}
      />

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
            <IndianRupee size={16} className="text-[#D3E3FD] opacity-50" />
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
                  <ArrowUpRight size={14} strokeWidth={3} />
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
                  <ArrowDownLeft size={14} strokeWidth={3} />
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
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState(
    () => localStorage.getItem("pocketwallet_lang") || "en"
  );
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("pocketwallet_transactions_v15");
    const today = new Date();
    const currentPrefix = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;
    const lastMonthPrefix = `${today.getFullYear()}-${String(
      today.getMonth()
    ).padStart(2, "0")}`;
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        text: "Salary",
        amount: 85000,
        type: "income",
        category: "Salary",
        date: `${currentPrefix}-01`,
      },
      {
        id: 2,
        text: "Groceries",
        amount: 4500,
        type: "expense",
        category: "Food",
        date: `${currentPrefix}-05`,
      },
      {
        id: 3,
        text: "Electricity",
        amount: 1200,
        type: "expense",
        category: "Bills",
        date: `${currentPrefix}-10`,
      },
      {
        id: 4,
        text: "Uber",
        amount: 350,
        type: "expense",
        category: "Transport",
        date: `${currentPrefix}-12`,
      },
      {
        id: 5,
        text: "Rent",
        amount: 15000,
        type: "expense",
        category: "Rent",
        date: `${currentPrefix}-02`,
      },
      {
        id: 6,
        text: "Last Month Food",
        amount: 6000,
        type: "expense",
        category: "Food",
        date: `${lastMonthPrefix}-15`,
      },
      {
        id: 7,
        text: "Last Month Salary",
        amount: 85000,
        type: "income",
        category: "Salary",
        date: `${lastMonthPrefix}-01`,
      },
    ];
  });

  const [customCategories, setCustomCategories] = useState(() => {
    const saved = localStorage.getItem("pocketwallet_custom_categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("monthly");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    amount: "",
    type: "expense",
    category: DEFAULT_EXPENSE_CATEGORIES[0],
    date: new Date().toISOString().split("T")[0],
  });

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "pocketwallet_transactions_v15",
      JSON.stringify(transactions)
    );
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem("pocketwallet_lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem(
      "pocketwallet_custom_categories",
      JSON.stringify(customCategories)
    );
  }, [customCategories]);

  useEffect(() => {
    const now = new Date();
    if (viewMode === "daily") {
      const offsetDate = new Date(
        viewDate.getTime() - viewDate.getTimezoneOffset() * 60000
      );
      setFormData((prev) => ({
        ...prev,
        date: offsetDate.toISOString().split("T")[0],
      }));
    } else {
      if (
        viewMode === "monthly" &&
        viewDate.getMonth() === now.getMonth() &&
        viewDate.getFullYear() === now.getFullYear()
      ) {
        setFormData((prev) => ({
          ...prev,
          date: now.toISOString().split("T")[0],
        }));
      } else if (
        viewMode === "yearly" &&
        viewDate.getFullYear() === now.getFullYear()
      ) {
        setFormData((prev) => ({
          ...prev,
          date: now.toISOString().split("T")[0],
        }));
      } else {
        const d = new Date(
          viewDate.getFullYear(),
          viewMode === "monthly" ? viewDate.getMonth() : 0,
          1
        );
        const offsetDate = new Date(
          d.getTime() - d.getTimezoneOffset() * 60000
        );
        setFormData((prev) => ({
          ...prev,
          date: offsetDate.toISOString().split("T")[0],
        }));
      }
    }
  }, [viewDate, viewMode]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        if (viewMode === "daily")
          return (
            tDate.getDate() === viewDate.getDate() &&
            tDate.getMonth() === viewDate.getMonth() &&
            tDate.getFullYear() === viewDate.getFullYear()
          );
        if (viewMode === "monthly")
          return (
            tDate.getMonth() === viewDate.getMonth() &&
            tDate.getFullYear() === viewDate.getFullYear()
          );
        if (viewMode === "yearly")
          return tDate.getFullYear() === viewDate.getFullYear();
        return false;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, viewDate, viewMode]);

  const homeStats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    return { income, expense, balance: income - expense };
  }, [filteredTransactions]);

  const totalAssets = useMemo(
    () =>
      transactions.reduce(
        (acc, t) =>
          t.type === "income"
            ? acc + parseFloat(t.amount)
            : acc - parseFloat(t.amount),
        0
      ),
    [transactions]
  );

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.text || !formData.amount) return;
    const payload = {
      id: editId || Math.floor(Math.random() * 100000000),
      text: formData.text,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    };
    if (editId) {
      setTransactions(transactions.map((t) => (t.id === editId ? payload : t)));
    } else {
      setTransactions([payload, ...transactions]);
    }
    closeForm();
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCat = { name: newCategoryName.trim(), type: formData.type };
      setCustomCategories([...customCategories, newCat]);
      setFormData({ ...formData, category: newCat.name });
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  // --- EXPORT FUNCTIONS ---
  const exportToCSV = () => {
    const headers = ["ID", "Date", "Category", "Type", "Amount", "Description"];
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      t.category,
      t.type,
      t.amount,
      t.text,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pocketwallet_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportMenuOpen(false);
  };

  const exportToPDF = () => {
    // Fallback to window.print() as requested
    window.print();
    setIsExportMenuOpen(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    setSelectedTransaction(null);
  };
  const openAdd = () => {
    setEditId(null);
    setFormData({
      text: "",
      amount: "",
      type: "expense",
      category: DEFAULT_EXPENSE_CATEGORIES[0],
      date: formData.date,
    });
    setIsFormVisible(true);
  };
  const openEdit = (t) => {
    setEditId(t.id);
    setFormData({
      text: t.text,
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: t.date,
    });
    setSelectedTransaction(null);
    setIsFormVisible(true);
  };
  const closeForm = () => {
    setIsFormVisible(false);
    setEditId(null);
    setIsAddingCategory(false);
  };

  const tLabel = TRANSLATIONS[lang];
  const currentCategories =
    formData.type === "income"
      ? [
          ...DEFAULT_INCOME_CATEGORIES,
          ...customCategories
            .filter((c) => c.type === "income")
            .map((c) => c.name),
        ]
      : [
          ...DEFAULT_EXPENSE_CATEGORIES,
          ...customCategories
            .filter((c) => c.type === "expense")
            .map((c) => c.name),
        ];

  return (
    <div className="min-h-screen bg-[#FDFBFF] text-[#1A1C1E] font-sans selection:bg-[#D3E3FD] selection:text-[#001D35]">
      <div className="bg-[#FDFBFF] sticky top-0 z-20 pt-4 px-4 pb-2 border-b border-slate-100/50 backdrop-blur-md bg-white/80 transition-colors duration-500 print:hidden">
        <div className="max-w-md mx-auto flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-[#E0E2EC] p-2.5 rounded-xl text-[#005AC1] shadow-sm">
              <Wallet size={22} strokeWidth={2.5} />
            </div>
            <span className="font-medium text-xl tracking-tight text-[#1A1C1E]">
              PocketWallet
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end pr-1">
              <span className="text-[10px] font-bold text-[#43474E] tracking-wider uppercase">
                {tLabel.netWorth}
              </span>
              <span
                className={`text-sm font-bold font-mono transition-colors duration-500 ${
                  totalAssets >= 0 ? "text-[#005AC1]" : "text-[#BA1A1A]"
                }`}
              >
                {formatCurrency(totalAssets, LOCALE_MAP[lang])}
              </span>
            </div>

            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Download size={20} className="text-[#43474E]" />
              </button>
              {isExportMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsExportMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-40 z-40 animate-in zoom-in-95 duration-200">
                    <button
                      onClick={exportToCSV}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-[#43474E] hover:bg-gray-50"
                    >
                      <Sheet size={16} /> {tLabel.exportCsv}
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-[#43474E] hover:bg-gray-50"
                    >
                      <Printer size={16} /> {tLabel.exportPdf}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Globe size={20} className="text-[#43474E]" />
              </button>
              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsLangMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-32 z-40 animate-in zoom-in-95 duration-200">
                    {["en", "hi", "mr"].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                          lang === l
                            ? "bg-[#E0E2EC] text-[#001D35]"
                            : "text-[#43474E] hover:bg-gray-50"
                        }`}
                      >
                        {l === "en"
                          ? "English"
                          : l === "hi"
                          ? "हिंदी"
                          : "मराठी"}
                        {lang === l && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Header (Only visible when printing) */}
      <div className="hidden print:block p-8 text-center border-b border-gray-200 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          PocketWallet Report
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 print:max-w-none print:px-8">
        {activeTab === "home" && (
          <HomeView
            viewMode={viewMode}
            setViewMode={setViewMode}
            viewDate={viewDate}
            setViewDate={setViewDate}
            activeTab={activeTab}
            homeStats={homeStats}
            filteredTransactions={filteredTransactions}
            setSelectedTransaction={setSelectedTransaction}
            lang={lang}
          />
        )}
        {activeTab === "insights" && (
          <InsightsView
            transactions={transactions}
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewMode={viewMode}
            activeTab={activeTab}
            setSelectedTransaction={setSelectedTransaction}
            lang={lang}
          />
        )}
      </div>
      <div className="fixed bottom-24 right-4 z-40 animate-in slide-in-from-right-10 duration-700 print:hidden">
        <Tooltip text={tLabel.addTransaction} position="top">
          <button
            onClick={openAdd}
            className="bg-[#005AC1] hover:bg-[#00489E] text-white h-14 w-14 rounded-2xl shadow-xl shadow-indigo-500/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
          >
            <Plus size={28} />
          </button>
        </Tooltip>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] print:hidden">
        <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
          {["home", "insights"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center justify-center w-20 h-full gap-1 group"
            >
              <div
                className={`px-5 py-1.5 rounded-full transition-all duration-300 group-active:scale-95 ${
                  activeTab === tab
                    ? "bg-[#D3E3FD] text-[#001D35] scale-100"
                    : "text-[#43474E] scale-90 group-hover:bg-slate-50"
                }`}
              >
                {tab === "home" && (
                  <LayoutGrid
                    size={22}
                    strokeWidth={activeTab === tab ? 2.5 : 2}
                  />
                )}
                {tab === "insights" && (
                  <PieChartIcon
                    size={22}
                    strokeWidth={activeTab === tab ? 2.5 : 2}
                  />
                )}
              </div>
              <span
                className={`text-[11px] font-medium transition-colors ${
                  activeTab === tab ? "text-[#1A1C1E]" : "text-[#43474E]"
                }`}
              >
                {tab === "home"
                  ? lang === "en"
                    ? "Home"
                    : lang === "hi"
                    ? "होम"
                    : "होम"
                  : tLabel.breakdown}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- ADD TRANSACTION MODAL --- */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none print:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in duration-300"
            onClick={closeForm}
          />
          <div className="relative z-10 bg-white w-full sm:w-[450px] h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-xl font-semibold text-slate-800">
                {editId ? tLabel.editTransaction : tLabel.addTransaction}
              </h2>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    formData.type === "expense"
                      ? "bg-white text-rose-600 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200/50"
                  }`}
                >
                  <TrendingDown size={18} /> {tLabel.expense}
                </button>
                <button
                  onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    formData.type === "income"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200/50"
                  }`}
                >
                  <TrendingUp size={18} /> {tLabel.income}
                </button>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {tLabel.enterAmount}
                </label>
                <div className="flex items-baseline gap-1 justify-center w-full">
                  <span className="text-3xl text-slate-300 font-medium mb-2">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="text-5xl font-bold text-slate-800 text-center w-full bg-transparent outline-none placeholder:text-slate-300 caret-blue-500"
                    placeholder="0"
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-3 block uppercase tracking-wide px-1">
                  {tLabel.category}
                </label>
                {!isAddingCategory ? (
                  <div className="grid grid-cols-4 gap-3">
                    {currentCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() =>
                          setFormData({ ...formData, category: cat })
                        }
                        className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-200 ${
                          formData.category === cat
                            ? "bg-blue-50 border-blue-500 shadow-sm scale-105"
                            : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                            formData.category === cat
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {getCategoryIcon(cat)}
                        </div>
                        <span
                          className={`text-[10px] font-medium truncate w-full text-center ${
                            formData.category === cat
                              ? "text-blue-700"
                              : "text-slate-500"
                          }`}
                        >
                          {tLabel.categories[cat] || cat}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => setIsAddingCategory(true)}
                      className="flex flex-col items-center gap-2 p-2 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400">
                        <Plus size={20} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">
                        {tLabel.addNew}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-blue-200 animate-in fade-in zoom-in-95">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder={tLabel.enterCategory}
                      className="flex-1 bg-transparent outline-none text-sm px-2 text-slate-700"
                      autoFocus
                    />
                    <button
                      onClick={handleAddCategory}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setIsAddingCategory(false)}
                      className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} className="text-slate-400" />
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      {tLabel.date}
                    </label>
                  </div>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none text-left pl-1"
                  />
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlignLeft size={16} className="text-slate-400" />
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      {tLabel.description}
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none placeholder:font-normal pl-1"
                    placeholder={tLabel.descriptionPlaceholder}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 pt-4 bg-white border-t border-slate-50">
              <button
                onClick={handleSave}
                disabled={!formData.text || !formData.amount}
                className="w-full bg-[#005AC1] hover:bg-[#00489E] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {editId ? tLabel.update : tLabel.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTransaction && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm animate-in fade-in duration-300 print:hidden"
            onClick={() => setSelectedTransaction(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#FDFBFF] rounded-[28px] z-50 shadow-2xl p-6 text-center animate-in zoom-in-95 duration-300 print:hidden">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-[#43474E]" />
              </button>
            </div>
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm ${
                selectedTransaction.type === "income"
                  ? "bg-[#C4EED0] text-[#0F5223]"
                  : "bg-[#FFDAD6] text-[#93000A]"
              }`}
            >
              {getCategoryIcon(selectedTransaction.category, 40)}
            </div>
            <div className="text-3xl font-normal mb-1">
              {selectedTransaction.type === "income" ? "+" : "-"}
              {formatCurrency(selectedTransaction.amount, LOCALE_MAP[lang])}
            </div>
            <div className="text-lg font-medium text-[#1A1C1E] mb-2">
              {selectedTransaction.text}
            </div>
            <div className="text-xs text-[#43474E] uppercase tracking-wide bg-[#E0E2EC] px-3 py-1 rounded-full inline-block">
              {formatFullDate(selectedTransaction.date, LOCALE_MAP[lang])}
            </div>
            <div className="flex gap-3 w-full mt-8">
              <button
                onClick={() => openEdit(selectedTransaction)}
                className="flex-1 flex items-center justify-center gap-2 text-[#005AC1] bg-[#D3E3FD] py-3 rounded-full text-sm font-medium hover:bg-[#C2E7FF] transition-colors"
              >
                <Pencil size={18} /> {tLabel.editTransaction}
              </button>
              <button
                onClick={() => deleteTransaction(selectedTransaction.id)}
                className="flex-1 flex items-center justify-center gap-2 text-[#BA1A1A] bg-[#FFDAD6] py-3 rounded-full text-sm font-medium hover:bg-[#FFB4AB] transition-colors"
              >
                <Trash2 size={18} /> {tLabel.delete}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
