import express from "express";
import {
  getAllCurrencies,
  getCurrencyByCode,
} from "../services/currenciesService.js";
import { STATUS_CODES, MESSAGE } from "../common/constants.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const currencies = await getAllCurrencies();

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: currencies,
      message: MESSAGE.CURRENCIES_FETCHED,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:currency", async (req, res, next) => {
  try {
    const { currency } = req.params;
    const currencyData = await getCurrencyByCode(currency);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: currencyData,
      message: MESSAGE.CURRENCY_FETCHED,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
