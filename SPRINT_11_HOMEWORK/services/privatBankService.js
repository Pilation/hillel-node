import { MESSAGE } from "../common/constants.js";

const PRIVAT_BANK_API_URL =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

export const fetchCurrenciesFromPrivatBank = async () => {
  try {
    const response = await fetch(PRIVAT_BANK_API_URL);

    if (!response.ok) {
      throw new Error(MESSAGE.EXTERNAL_API_ERROR);
    }

    const data = await response.json();

    return data;
  } catch {
    throw new Error(MESSAGE.EXTERNAL_API_ERROR);
  }
};
