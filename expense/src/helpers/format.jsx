// src/helpers/format.js
export function formatCurrency(num, locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateString, locale = "en-IN") {
  return new Date(dateString).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  });
}

export function formatFullDate(dateString, locale = "en-IN") {
  return new Date(dateString).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** For monthly label like "May 2023" */
export function getMonthYearLabel(dateString, locale = "en-IN") {
  return new Date(dateString).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
}
