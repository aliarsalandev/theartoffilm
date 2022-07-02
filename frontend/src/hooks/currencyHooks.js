import { useEffect, useState } from "react";

export const useSymbol = (currency) => {
  switch (currency) {
    case "GBP":
      return "£";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "JPY":
      return "¥";
    default:
      return "£";
  }
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState("GBP");
  const [symbol] = useState("£");
  const [rates, setRates] = useState({});

  useEffect(() => {
    const currency_storage = JSON.parse(localStorage.getItem("currency"));
    const _currency = currency_storage ? currency_storage.currency : "GBP";
    const currency_rates = currency_storage
      ? currency_storage.rates
      : {
          GBP: 1,
          USD: 1.22255,
          EUR: 1.164851,
          YEN: 163.0,
        };
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
