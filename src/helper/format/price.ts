export const getPriceString = (price: number | string): string => {
  return (Number(price) >= 0 ? "+" : "") + price;
};

export const formatUserPrice = (price: number, currency?: string): string => {
  let currencySymbol = formatCurrency(currency);
  let priceText = String(price);

  return `${priceText}${currencySymbol}`;
};

export const formatCurrency = (currency?: string): string => {
  let currencySymbol = "";
  if (currency === "EUR") currencySymbol = "€";
  if (currency === "USD") currencySymbol = "$";
  if (currency === "GBP") currencySymbol = "£";
  return currencySymbol;
};
