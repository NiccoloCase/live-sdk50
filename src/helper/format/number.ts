const pow = Math.pow,
  floor = Math.floor,
  abs = Math.abs,
  log = Math.log;

const ABBREVIATIONS = ["k", "M", " Md"];

const round = (number: number, precision: number): number => {
  const prec = Math.pow(10, precision);
  return Math.round(number * prec) / prec;
};

/**
 * Abbrevia il numero passato restituiendo una stringa.
 * @param number
 * @copyright https://stackoverflow.com/a/10600491/10117858
 */
export const abbreviateNumber = (number: number): string => {
  let base = floor(log(abs(number)) / log(1000));
  const suffix = ABBREVIATIONS[Math.min(2, base - 1)];
  base = ABBREVIATIONS.indexOf(suffix) + 1;
  return suffix ? round(number / pow(1000, base), 2) + suffix : "" + number;
};

export const cryptHalfString = (text: string) => {
  let hiddenText = text;
  if (text.length > 3) {
    hiddenText =
      text.substring(0, Math.floor(text.length / 2)) +
      "*".repeat(Math.floor(text.length / 2));
  } else hiddenText = "***";
  return hiddenText;
};
