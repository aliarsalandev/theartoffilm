import { useEffect, useState } from "react";

export const useSymbol = (currency) => {
  switch (currency) {
    case "GBP":
      return "£";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "£";
  }
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState("GBP");
  const [symbol, setCurrencySymbol] = useState("£");
  const [rates, setRates] = useState({});

  useEffect(() => {
    const currency_storage = JSON.parse(localStorage.getItem("currency"));
    const _currency = currency_storage.currency;
    const currency_rates = currency_storage.rates;
    setCurrency(_currency ?? "GBP");
    setRates(currency_rates ?? {});
  }, []);
  return {
    currency,
    symbol,
    rates,
    setCurrency,
    setRates,
  };
};
