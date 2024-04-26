import { isDate } from "lodash";
import { t } from "i18next";

export const formatTime = (date: Date | number | string): string => {
  const _date = new Date(date);
  let mm: number | string = _date.getMinutes();
  if (String(mm).length < 2) mm = "0" + mm;

  let hh: number | string = _date.getHours();
  if (hh === 0) hh = "00";
  else if (String(hh).length < 2) hh = "0" + hh;
  return `${hh}:${mm}`;
};

export const formatShortDay = (
  date: Date | number | string,
  includeYear?: boolean
): string => {
  const now = new Date();
  const _date = new Date(date);
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  let year = _date.getFullYear();
  //year = year > 2000 && year < 3000 ? Number(String(year).slice(-3)) : year;

  return `${day}/${month}${
    now.getFullYear() !== year || includeYear ? `/${year}` : ""
  }`;
};

export const formatDate = (date: string) => {
  // Formato: 16 APR
  const d = new Date(date);
  const mm = d.toLocaleString("default", { month: "short" }).toUpperCase();
  return `${d.getDate()} ${mm}`;
};

/**
 * Restituisce il tempo passato dalla data passata
 */
export const timeSince = (dateParam: Date | number | string): string => {
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);

  // Secondi
  const seconds = Math.round((new Date().getTime() - date.getTime()) / 1000);
  let i = seconds;

  if (i < 5) return t("time:now");
  else if (i < 60) return t("time:seconds-ago", { count: i });

  // Minuti
  i = Math.round(i / 60);

  if (i < 60) return t("time:minutes-ago", { count: i });

  // Ore
  i = Math.floor(i / 60);

  if (i < 24) return t("time:hours-ago", { count: i });

  // Giorni
  const days = Math.round(i / 24);
  i = days;

  if (i < 7) return t("time:days-ago", { count: i });

  // Settimane
  i = Math.round(i / 7);
  const months = Math.floor(seconds / 2592000);

  if (months < 1) return t("time:weeks-ago", { count: i });

  // Mesi
  i = months;
  const years = Math.floor(days / 360);

  if (years < 1) return t("time:months-ago", { count: i });

  // Anni
  i = years;

  return t("time:years-ago", { count: i });
};

export const get_age = (date: Date | number | string): number => {
  const _date = typeof date === "object" ? date : new Date(date);
  const now = new Date();
  let age = now.getFullYear() - _date.getFullYear();
  const m = now.getMonth() - _date.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < _date.getDate())) age--;
  return age;
};

/**
 * Restituisce il tempo passato dalla data passata (in modo abbreviato)
 */
export const shortTimeSince = (dateParam: Date | number | string): string => {
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);

  // Secondi
  const seconds = Math.round((new Date().getTime() - date.getTime()) / 1000);
  let i = seconds;

  if (i < 5) return "Ora";
  else if (i < 60) return `${i}s`;

  // Minuti
  i = Math.round(i / 60);
  if (i < 60) return `${i}min`;

  // Ore
  i = Math.floor(i / 60);
  if (i < 24) return `${i}h`;

  // Giorni
  const days = Math.round(i / 24);
  i = days;
  if (i < 7) return `${i}g`;

  // Settimane
  i = Math.round(i / 7);
  const years = Math.floor(days / 360);
  if (years < 1) return `${i} sett`;

  // Anni
  i = years;
  if (i > 1) return `${i} anni `;
  else return `${i} anno `;
};

/**
 * Converte i millisecodni passati nel formarto MM:SS
 * @param millis
 */
export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};

export const getShortDate = function (dateParam: Date | string | number) {
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  return (
    date.getDate() +
    "/" +
    Number(date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};

const MONTH_NAMES = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

/**
 * Restituisce il nome del mese della data passata
 * @param date
 */
export const getMonthName = (date: Date | number | string) => {
  const _date = date instanceof Date ? date : new Date(date);
  return MONTH_NAMES[_date.getMonth()];
};

/**
 * Coverte un numero in millisecondi in una stringa rappresentate una durata in formato bereve
 * @param duration
 */
export const formatDurationMillis = (duration: number): string => {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  if (hours >= 1) return `${hours}h` + (minutes > 0 ? ` ${minutes}min` : "");
  else if (minutes < 1) return `${seconds}s`;
  else return `${minutes} min` + (seconds > 0 ? ` ${seconds}s` : "");
};

export const getTimeFromDate = (date: Date) => {
  let h = String(date.getHours());
  if (h.length === 1) h = "0" + h;

  let m = String(date.getMinutes());
  if (m.length === 1) m = "0" + m;

  return h + ":" + m;
};

export function timeBetweenDates(toDate: Date, positive = false) {
  var dateEntered = new Date(toDate);
  var now = new Date();
  var difference = dateEntered.getTime() - now.getTime();

  var seconds = Math.floor(difference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  if (positive) {
    if (days < 0) days = 0;
    if (hours < 0) hours = 0;
    if (minutes < 0) minutes = 0;
    if (seconds < 0) seconds = 0;
  }

  return { days, hours, minutes, seconds };
}

/**
 * Restituisce il segno zodiacale della data passata
 * @returns
 */
export const getZodiacSign = (date: Date) => {
  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  const signs = [
    "ACQUARIUS",
    "PISCES",
    "ARIES",
    "TAURUS",
    "GEMINI",
    "CANCER",
    "LEO",
    "VIRGO",
    "LIBRA",
    "SCORPIO",
    "SAGITTARIUS",
    "CAPRICORN",
  ];
  let month = date.getMonth();
  let day = date.getDate();
  if (month == 0 && day <= 20) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }
  return signs[month];
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export function isWithin24Hours(_date: Date | string | number): boolean {
  const date = new Date(_date);
  if (!isDate(date)) return false;
  const now = new Date(); // Current date
  const diff = now.getTime() - date.getTime(); // Difference in milliseconds between the current date and the specified date

  const millisecondsIn24Hours = 24 * 60 * 60 * 1000; // Milliseconds in 24 hours

  return diff < millisecondsIn24Hours;
}

export const getTimeByMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;

  return `${hh}:${mm}`;
};

export const getDayWeekString = (date?: Date | number | string) => {
  if (!date) return "";
  ("  // Formato: Mercoledì 12 Maggio 2021");
  const dateObj = new Date(date);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    // inculude l'anno solo se è diverso da quello corrente
    year:
      dateObj.getFullYear() !== new Date().getFullYear()
        ? "numeric"
        : undefined,
  };
  const text = dateObj.toLocaleDateString("it-IT", options as any);
  // Primo carattere maiuscolo
  return text.charAt(0).toUpperCase() + text.slice(1);
};
