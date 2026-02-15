import { fetchCurrenciesFromPrivatBank } from "./privatBankService.js";
import {
  SUPPORTED_CURRENCIES,
  MESSAGE,
  STATUS_CODES,
} from "../common/constants.js";

const filterAndTransformCurrencies = (rawData) => {
  const currencies = {};

  rawData.forEach((item) => {
    if (SUPPORTED_CURRENCIES.includes(item.ccy)) {
      currencies[item.ccy] = {
        buy: parseFloat(item.buy),
        sale: parseFloat(item.sale),
      };
    }
  });

  return currencies;
};

export const getAllCurrencies = async () => {
  const rawData = await fetchCurrenciesFromPrivatBank();
  return filterAndTransformCurrencies(rawData);
};

export const getCurrencyByCode = async (currencyCode) => {
  const upperCode = currencyCode.toUpperCase();

  if (!SUPPORTED_CURRENCIES.includes(upperCode)) {
    const error = new Error(MESSAGE.CURRENCY_NOT_SUPPORTED);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  const allCurrencies = await getAllCurrencies();

  return {
    [upperCode]: allCurrencies[upperCode],
  };
};
