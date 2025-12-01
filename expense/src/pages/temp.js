// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import HomeView from "./HomeView";
// import InsightsView from "./InsightsView";
// import Tooltip from "../components/Tooltip";
// import {
//   Wallet,
//   Plus,
//   Download,
//   Globe,
//   Check,
//   X,
//   Pencil,
//   Trash2,
// } from "lucide-react";

// import { TRANSLATIONS, LOCALE_MAP } from "../constants/translations.jsx";
// import { formatCurrency, formatFullDate } from "../helpers/format.jsx";
// import { getCategoryIcon } from "../helpers/icons.jsx";

// // Default categories
// const DEFAULT_INCOME_CATEGORIES = [
//   "Salary",
//   "Freelance",
//   "Investments",
//   "Gifts",
//   "Rental",
//   "Other",
// ];
// const DEFAULT_EXPENSE_CATEGORIES = [
//   "Food",
//   "Transport",
//   "Bills",
//   "Shopping",
//   "Entertainment",
//   "Health",
//   "Education",
//   "Rent",
//   "Other",
// ];

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [lang, setLang] = useState(
//     () => localStorage.getItem("pocketwallet_lang") || "en"
//   );
//   const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
//   const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

//   // Transactions
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("pocketwallet_transactions_v15");
//     if (saved) return JSON.parse(saved);
//     // Start with an empty transaction list by default.
//     return [];
//   });

//   // Custom categories
//   const [customCategories, setCustomCategories] = useState(() => {
//     const saved = localStorage.getItem("pocketwallet_custom_categories");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Date / View Mode
//   const [viewDate, setViewDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState("monthly");

//   // Transaction form
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     text: "",
//     amount: "",
//     type: "expense",
//     category: DEFAULT_EXPENSE_CATEGORIES[0],
//     date: new Date().toISOString().split("T")[0],
//   });

//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");

//   // Persistence
//   useEffect(() => {
//     localStorage.setItem(
//       "pocketwallet_transactions_v15",
//       JSON.stringify(transactions)
//     );
//   }, [transactions]);

//   useEffect(() => {
//     localStorage.setItem("pocketwallet_lang", lang);
//   }, [lang]);

//   useEffect(() => {
//     localStorage.setItem(
//       "pocketwallet_custom_categories",
//       JSON.stringify(customCategories)
//     );
//   }, [customCategories]);

//   // Adjust form date if we switch daily/monthly/yearly
//   useEffect(() => {
//     const now = new Date();
//     if (viewMode === "daily") {
//       const offsetDate = new Date(
//         viewDate.getTime() - viewDate.getTimezoneOffset() * 60000
//       );
//       setFormData((prev) => ({
//         ...prev,
//         date: offsetDate.toISOString().split("T")[0],
//       }));
//     } else {
//       if (
//         viewMode === "monthly" &&
//         viewDate.getMonth() === now.getMonth() &&
//         viewDate.getFullYear() === now.getFullYear()
//       ) {
//         setFormData((prev) => ({
//           ...prev,
//           date: now.toISOString().split("T")[0],
//         }));
//       } else if (
//         viewMode === "yearly" &&
//         viewDate.getFullYear() === now.getFullYear()
//       ) {
//         setFormData((prev) => ({
//           ...prev,
//           date: now.toISOString().split("T")[0],
//         }));
//       } else {
//         const d = new Date(
//           viewDate.getFullYear(),
//           viewMode === "monthly" ? viewDate.getMonth() : 0,
//           1
//         );
//         const offsetDate = new Date(
//           d.getTime() - d.getTimezoneOffset() * 60000
//         );
//         setFormData((prev) => ({
//           ...prev,
//           date: offsetDate.toISOString().split("T")[0],
//         }));
//       }
//     }
//   }, [viewDate, viewMode]);

//   // Filtered transactions by date range
//   const filteredTransactions = useMemo(() => {
//     return transactions
//       .filter((t) => {
//         const tDate = new Date(t.date);
//         if (viewMode === "daily") {
//           return (
//             tDate.getDate() === viewDate.getDate() &&
//             tDate.getMonth() === viewDate.getMonth() &&
//             tDate.getFullYear() === viewDate.getFullYear()
//           );
//         }
//         if (viewMode === "monthly") {
//           return (
//             tDate.getMonth() === viewDate.getMonth() &&
//             tDate.getFullYear() === viewDate.getFullYear()
//           );
//         }
//         if (viewMode === "yearly") {
//           return tDate.getFullYear() === viewDate.getFullYear();
//         }
//         return false;
//       })
//       .sort((a, b) => new Date(b.date) - new Date(a.date));
//   }, [transactions, viewDate, viewMode]);

//   // Basic numeric stats for the Home screen
//   const homeStats = useMemo(() => {
//     const income = filteredTransactions
//       .filter((t) => t.type === "income")
//       .reduce((acc, t) => acc + parseFloat(t.amount), 0);
//     const expense = filteredTransactions
//       .filter((t) => t.type === "expense")
//       .reduce((acc, t) => acc + parseFloat(t.amount), 0);
//     return { income, expense, balance: income - expense };
//   }, [filteredTransactions]);

//   const totalAssets = useMemo(
//     () =>
//       transactions.reduce(
//         (acc, t) =>
//           t.type === "income"
//             ? acc + parseFloat(t.amount)
//             : acc - parseFloat(t.amount),
//         0
//       ),
//     [transactions]
//   );

//   // Handlers
//   const handleSave = (e) => {
//     e.preventDefault();
//     if (!formData.text || !formData.amount) return;
//     const payload = {
//       id: editId || Math.floor(Math.random() * 100000000),
//       text: formData.text,
//       amount: parseFloat(formData.amount),
//       type: formData.type,
//       category: formData.category,
//       date: formData.date,
//     };
//     if (editId) {
//       setTransactions(transactions.map((t) => (t.id === editId ? payload : t)));
//     } else {
//       setTransactions([payload, ...transactions]);
//     }
//     closeForm();
//   };

//   const handleAddCategory = () => {
//     if (newCategoryName.trim()) {
//       const newCat = { name: newCategoryName.trim(), type: formData.type };
//       setCustomCategories([...customCategories, newCat]);
//       setFormData({ ...formData, category: newCat.name });
//       setNewCategoryName("");
//       setIsAddingCategory(false);
//     }
//   };

//   // Export to CSV
//   const exportToCSV = () => {
//     const headers = ["ID", "Date", "Category", "Type", "Amount", "Description"];
//     const rows = transactions.map((t) => [
//       t.id,
//       t.date,
//       t.category,
//       t.type,
//       t.amount,
//       t.text,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "pocketwallet_transactions.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setIsExportMenuOpen(false);
//   };

//   // Export to PDF (actually prints)
//   const exportToPDF = () => {
//     window.print();
//     setIsExportMenuOpen(false);
//   };

//   // Delete transaction
//   const deleteTransaction = (id) => {
//     setTransactions(transactions.filter((t) => t.id !== id));
//     setSelectedTransaction(null);
//   };

//   // Form toggles
//   const openAdd = () => {
//     setEditId(null);
//     setFormData({
//       text: "",
//       amount: "",
//       type: "expense",
//       category: DEFAULT_EXPENSE_CATEGORIES[0],
//       date: formData.date,
//     });
//     setIsFormVisible(true);
//   };
//   const openEdit = (t) => {
//     setEditId(t.id);
//     setFormData({
//       text: t.text,
//       amount: t.amount,
//       type: t.type,
//       category: t.category,
//       date: t.date,
//     });
//     setSelectedTransaction(null);
//     setIsFormVisible(true);
//   };
//   const closeForm = () => {
//     setIsFormVisible(false);
//     setEditId(null);
//     setIsAddingCategory(false);
//   };

//   // Translations
//   const tLabel = TRANSLATIONS[lang];

//   // Decide which categories to show in the form based on expense/income
//   const currentCategories =
//     formData.type === "income"
//       ? [
//           ...DEFAULT_INCOME_CATEGORIES,
//           ...customCategories
//             .filter((c) => c.type === "income")
//             .map((c) => c.name),
//         ]
//       : [
//           ...DEFAULT_EXPENSE_CATEGORIES,
//           ...customCategories
//             .filter((c) => c.type === "expense")
//             .map((c) => c.name),
//         ];

//   return (
//     <div className="min-h-screen bg-[#FDFBFF] text-[#1A1C1E] font-sans selection:bg-[#D3E3FD] selection:text-[#001D35]">
//       {/* Top Bar */}
//       <div className="bg-[#FDFBFF] sticky top-0 z-20 pt-4 px-4 pb-2 border-b border-slate-100/50 backdrop-blur-md bg-white/80 transition-colors duration-500 print:hidden">
//         <div className="max-w-md mx-auto flex justify-between items-center h-16">
//           <div className="flex items-center gap-3">
//             <div className="bg-[#E0E2EC] p-2.5 rounded-xl text-[#005AC1] shadow-sm">
//               <Wallet size={22} strokeWidth={2.5} />
//             </div>
//             <span className="font-medium text-xl tracking-tight text-[#1A1C1E]">
//               PocketWallet
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             {/* Net Worth */}
//             <div className="flex flex-col items-end pr-1">
//               <span className="text-[10px] font-bold text-[#43474E] tracking-wider uppercase">
//                 {tLabel.netWorth}
//               </span>
//               <span
//                 className={`text-sm font-bold font-mono transition-colors duration-500 ${
//                   totalAssets >= 0 ? "text-[#005AC1]" : "text-[#BA1A1A]"
//                 }`}
//               >
//                 {formatCurrency(totalAssets, LOCALE_MAP[lang])}
//               </span>
//             </div>

//             {/* Export */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//               >
//                 <Download size={20} className="text-[#43474E]" />
//               </button>
//               {isExportMenuOpen && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-30"
//                     onClick={() => setIsExportMenuOpen(false)}
//                   />
//                   <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-40 z-40 animate-in zoom-in-95 duration-200">
//                     <button
//                       onClick={exportToCSV}
//                       className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-[#43474E] hover:bg-gray-50"
//                     >
//                       <span className="inline-flex items-center gap-1">
//                         <Download size={16} />
//                       </span>
//                       {tLabel.exportCsv}
//                     </button>
//                     <button
//                       onClick={exportToPDF}
//                       className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-[#43474E] hover:bg-gray-50"
//                     >
//                       <span className="inline-flex items-center gap-1">
//                         <Download size={16} />
//                       </span>
//                       {tLabel.exportPdf}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Language Switcher */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//               >
//                 <Globe size={20} className="text-[#43474E]" />
//               </button>
//               {isLangMenuOpen && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-30"
//                     onClick={() => setIsLangMenuOpen(false)}
//                   />
//                   <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-32 z-40 animate-in zoom-in-95 duration-200">
//                     {["en", "hi", "mr"].map((l) => (
//                       <button
//                         key={l}
//                         onClick={() => {
//                           setLang(l);
//                           setIsLangMenuOpen(false);
//                         }}
//                         className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
//                           lang === l
//                             ? "bg-[#E0E2EC] text-[#001D35]"
//                             : "text-[#43474E] hover:bg-gray-50"
//                         }`}
//                       >
//                         {l === "en"
//                           ? "English"
//                           : l === "hi"
//                           ? "हिंदी"
//                           : "मराठी"}
//                         {lang === l && <Check size={14} />}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Printable Header (Only visible when printing) */}
//       <div className="hidden print:block p-8 text-center border-b border-gray-200 mb-6">
//         <h1 className="text-3xl font-bold text-slate-900">
//           PocketWallet Report
//         </h1>
//         <p className="text-sm text-slate-500 mt-2">
//           Generated on {new Date().toLocaleDateString()}
//         </p>
//       </div>

//       {/* MAIN Content */}
//       <div className="max-w-md mx-auto px-4 py-4 print:max-w-none print:px-8">
//         {activeTab === "home" && (
//           <HomeView
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             viewDate={viewDate}
//             setViewDate={setViewDate}
//             activeTab={activeTab}
//             homeStats={homeStats}
//             filteredTransactions={filteredTransactions}
//             setSelectedTransaction={setSelectedTransaction}
//             lang={lang}
//           />
//         )}
//         {activeTab === "insights" && (
//           <InsightsView
//             transactions={transactions}
//             viewDate={viewDate}
//             setViewDate={setViewDate}
//             viewMode={viewMode}
//             activeTab={activeTab}
//             setSelectedTransaction={setSelectedTransaction}
//             lang={lang}
//           />
//         )}
//       </div>

//       {/* Add Button */}
//       <div className="fixed bottom-24 right-4 z-40 animate-in slide-in-from-right-10 duration-700 print:hidden">
//         <Tooltip text={tLabel.addTransaction} position="top">
//           <button
//             onClick={openAdd}
//             className="bg-[#005AC1] hover:bg-[#00489E] text-white h-14 w-14 rounded-2xl shadow-xl shadow-indigo-500/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
//           >
//             <Plus size={28} />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Bottom Nav */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] print:hidden">
//         <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
//           {["home", "insights"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className="flex flex-col items-center justify-center w-20 h-full gap-1 group"
//             >
//               <div
//                 className={`px-5 py-1.5 rounded-full transition-all duration-300 group-active:scale-95 ${
//                   activeTab === tab
//                     ? "bg-[#D3E3FD] text-[#001D35] scale-100"
//                     : "text-[#43474E] scale-90 group-hover:bg-slate-50"
//                 }`}
//               >
//                 {tab === "home" /* Icon for home */ && (
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={activeTab === tab ? 2.5 : 2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-5 h-5"
//                   >
//                     <rect x="3" y="3" width="7" height="7" />
//                     <rect x="14" y="3" width="7" height="7" />
//                     <rect x="14" y="14" width="7" height="7" />
//                     <rect x="3" y="14" width="7" height="7" />
//                   </svg>
//                 )}
//                 {tab === "insights" /* Icon for insights */ && (
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={activeTab === tab ? 2.5 : 2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-5 h-5"
//                   >
//                     <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-11-11" />
//                     <path d="M8.7 3.5L21 11.5" />
//                   </svg>
//                 )}
//               </div>
//               <span
//                 className={`text-[11px] font-medium transition-colors ${
//                   activeTab === tab ? "text-[#1A1C1E]" : "text-[#43474E]"
//                 }`}
//               >
//                 {tab === "home"
//                   ? lang === "en"
//                     ? "Home"
//                     : lang === "hi"
//                     ? "होम"
//                     : "होम"
//                   : tLabel.breakdown}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ADD/EDIT TRANSACTION MODAL */}
//       {isFormVisible && (
//         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none print:hidden">
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in duration-300"
//             onClick={closeForm}
//           />
//           <div className="relative z-10 bg-white w-full sm:w-[450px] h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
//             <div className="flex justify-between items-center p-6 pb-2">
//               <h2 className="text-xl font-semibold text-slate-800">
//                 {editId ? tLabel.editTransaction : tLabel.addTransaction}
//               </h2>
//               <button
//                 onClick={closeForm}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//               >
//                 <X size={24} className="text-slate-500" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-6 space-y-8">
//               {/* Expense/Income toggle */}
//               <div className="flex bg-slate-100 p-1 rounded-xl">
//                 <button
//                   onClick={() => setFormData({ ...formData, type: "expense" })}
//                   className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                     formData.type === "expense"
//                       ? "bg-white text-rose-600 shadow-sm"
//                       : "text-slate-500 hover:bg-slate-200/50"
//                   }`}
//                 >
//                   <Trash2 size={18} /> {tLabel.expense}
//                 </button>
//                 <button
//                   onClick={() => setFormData({ ...formData, type: "income" })}
//                   className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                     formData.type === "income"
//                       ? "bg-white text-emerald-600 shadow-sm"
//                       : "text-slate-500 hover:bg-slate-200/50"
//                   }`}
//                 >
//                   <Plus size={18} /> {tLabel.income}
//                 </button>
//               </div>

//               {/* Amount */}
//               <div className="flex flex-col items-center justify-center py-2">
//                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
//                   {tLabel.enterAmount}
//                 </label>
//                 <div className="flex items-baseline gap-1 justify-center w-full">
//                   <span className="text-3xl text-slate-300 font-medium mb-2">
//                     ₹
//                   </span>
//                   <input
//                     type="number"
//                     value={formData.amount}
//                     onChange={(e) =>
//                       setFormData({ ...formData, amount: e.target.value })
//                     }
//                     className="text-5xl font-bold text-slate-800 text-center w-full bg-transparent outline-none placeholder:text-slate-300 caret-blue-500"
//                     placeholder="0"
//                     autoFocus
//                   />
//                 </div>
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="text-sm font-bold text-slate-500 mb-3 block uppercase tracking-wide px-1">
//                   {tLabel.category}
//                 </label>
//                 {!isAddingCategory ? (
//                   <div className="grid grid-cols-4 gap-3">
//                     {formData.type === "income"
//                       ? [
//                           ...DEFAULT_INCOME_CATEGORIES,
//                           ...customCategories
//                             .filter((c) => c.type === "income")
//                             .map((c) => c.name),
//                         ].map((cat) => (
//                           <button
//                             key={cat}
//                             onClick={() =>
//                               setFormData({ ...formData, category: cat })
//                             }
//                             className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-200 ${
//                               formData.category === cat
//                                 ? "bg-blue-50 border-blue-500 shadow-sm scale-105"
//                                 : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
//                             }`}
//                           >
//                             <div
//                               className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
//                                 formData.category === cat
//                                   ? "bg-blue-100 text-blue-600"
//                                   : "bg-slate-100 text-slate-500"
//                               }`}
//                             >
//                               {getCategoryIcon(cat)}
//                             </div>
//                             <span
//                               className={`text-[10px] font-medium truncate w-full text-center ${
//                                 formData.category === cat
//                                   ? "text-blue-700"
//                                   : "text-slate-500"
//                               }`}
//                             >
//                               {tLabel.categories[cat] || cat}
//                             </span>
//                           </button>
//                         ))
//                       : [
//                           ...DEFAULT_EXPENSE_CATEGORIES,
//                           ...customCategories
//                             .filter((c) => c.type === "expense")
//                             .map((c) => c.name),
//                         ].map((cat) => (
//                           <button
//                             key={cat}
//                             onClick={() =>
//                               setFormData({ ...formData, category: cat })
//                             }
//                             className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-200 ${
//                               formData.category === cat
//                                 ? "bg-blue-50 border-blue-500 shadow-sm scale-105"
//                                 : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
//                             }`}
//                           >
//                             <div
//                               className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
//                                 formData.category === cat
//                                   ? "bg-blue-100 text-blue-600"
//                                   : "bg-slate-100 text-slate-500"
//                               }`}
//                             >
//                               {getCategoryIcon(cat)}
//                             </div>
//                             <span
//                               className={`text-[10px] font-medium truncate w-full text-center ${
//                                 formData.category === cat
//                                   ? "text-blue-700"
//                                   : "text-slate-500"
//                               }`}
//                             >
//                               {tLabel.categories[cat] || cat}
//                             </span>
//                           </button>
//                         ))}
//                     {/* Add new category button */}
//                     <button
//                       onClick={() => setIsAddingCategory(true)}
//                       className="flex flex-col items-center gap-2 p-2 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 transition-colors"
//                     >
//                       <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400">
//                         <Plus size={20} />
//                       </div>
//                       <span className="text-[10px] font-medium text-slate-400">
//                         {tLabel.addNew}
//                       </span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-blue-200 animate-in fade-in zoom-in-95">
//                     <input
//                       type="text"
//                       value={newCategoryName}
//                       onChange={(e) => setNewCategoryName(e.target.value)}
//                       placeholder={tLabel.enterCategory}
//                       className="flex-1 bg-transparent outline-none text-sm px-2 text-slate-700"
//                       autoFocus
//                     />
//                     <button
//                       onClick={handleAddCategory}
//                       className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                       <Check size={16} />
//                     </button>
//                     <button
//                       onClick={() => setIsAddingCategory(false)}
//                       className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Date */}
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col gap-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-slate-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-calendar"
//                         viewBox="0 0 24 24"
//                       >
//                         <rect
//                           x="3"
//                           y="4"
//                           width="18"
//                           height="18"
//                           rx="2"
//                           ry="2"
//                         />
//                         <line x1="16" y1="2" x2="16" y2="6" />
//                         <line x1="8" y1="2" x2="8" y2="6" />
//                         <line x1="3" y1="10" x2="21" y2="10" />
//                       </svg>
//                     </span>
//                     <label className="text-[10px] font-bold text-slate-400 uppercase">
//                       {tLabel.date}
//                     </label>
//                   </div>
//                   <input
//                     type="date"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                     className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none text-left pl-1"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-col gap-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-slate-400">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-align-left"
//                         viewBox="0 0 24 24"
//                       >
//                         <line x1="17" y1="10" x2="3" y2="10" />
//                         <line x1="21" y1="6" x2="3" y2="6" />
//                         <line x1="21" y1="14" x2="3" y2="14" />
//                         <line x1="17" y1="18" x2="3" y2="18" />
//                       </svg>
//                     </span>
//                     <label className="text-[10px] font-bold text-slate-400 uppercase">
//                       {tLabel.description}
//                     </label>
//                   </div>
//                   <input
//                     type="text"
//                     value={formData.text}
//                     onChange={(e) =>
//                       setFormData({ ...formData, text: e.target.value })
//                     }
//                     className="bg-transparent w-full text-sm font-semibold text-slate-700 outline-none placeholder:font-normal pl-1"
//                     placeholder={tLabel.descriptionPlaceholder}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="p-6 pt-4 bg-white border-t border-slate-50">
//               <button
//                 onClick={handleSave}
//                 disabled={!formData.text || !formData.amount}
//                 className="w-full bg-[#005AC1] hover:bg-[#00489E] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
//               >
//                 {editId ? tLabel.update : tLabel.save}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SELECTED TRANSACTION MODAL */}
//       {selectedTransaction && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm animate-in fade-in duration-300 print:hidden"
//             onClick={() => setSelectedTransaction(null)}
//           />
//           <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#FDFBFF] rounded-[28px] z-50 shadow-2xl p-6 text-center animate-in zoom-in-95 duration-300 print:hidden">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSelectedTransaction(null)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//               >
//                 <X size={20} className="text-[#43474E]" />
//               </button>
//             </div>
//             <div
//               className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm ${
//                 selectedTransaction.type === "income"
//                   ? "bg-[#C4EED0] text-[#0F5223]"
//                   : "bg-[#FFDAD6] text-[#93000A]"
//               }`}
//             >
//               {getCategoryIcon(selectedTransaction.category, 40)}
//             </div>
//             <div className="text-3xl font-normal mb-1">
//               {selectedTransaction.type === "income" ? "+" : "-"}
//               {formatCurrency(selectedTransaction.amount, LOCALE_MAP[lang])}
//             </div>
//             <div className="text-lg font-medium text-[#1A1C1E] mb-2">
//               {selectedTransaction.text}
//             </div>
//             <div className="text-xs text-[#43474E] uppercase tracking-wide bg-[#E0E2EC] px-3 py-1 rounded-full inline-block">
//               {formatFullDate(selectedTransaction.date, LOCALE_MAP[lang])}
//             </div>
//             <div className="flex gap-3 w-full mt-8">
//               <button
//                 onClick={() => openEdit(selectedTransaction)}
//                 className="flex-1 flex items-center justify-center gap-2 text-[#005AC1] bg-[#D3E3FD] py-3 rounded-full text-sm font-medium hover:bg-[#C2E7FF] transition-colors"
//               >
//                 <Pencil size={18} /> {tLabel.editTransaction}
//               </button>
//               <button
//                 onClick={() => deleteTransaction(selectedTransaction.id)}
//                 className="flex-1 flex items-center justify-center gap-2 text-[#BA1A1A] bg-[#FFDAD6] py-3 rounded-full text-sm font-medium hover:bg-[#FFB4AB] transition-colors"
//               >
//                 <Trash2 size={18} /> {tLabel.delete}
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
