export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGE = {
  NOT_FOUND: "Page not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  CURRENCY_NOT_SUPPORTED: "Вказана валюта не підтримується. Доступні: EUR, USD",
  CURRENCIES_FETCHED: "Курси валют успішно отримано",
  CURRENCY_FETCHED: "Курс валюти успішно отримано",
  EXTERNAL_API_ERROR: "Помилка при отриманні даних з зовнішнього API",
};

export const ROUTES = {
  CURRENCIES: "/api/currencies",
};

export const SUPPORTED_CURRENCIES = ["EUR", "USD"];
