import express from "express";
import {
  getAllCurrencies,
  getCurrencyByCode,
} from "../services/currenciesService.js";
import { STATUS_CODES } from "../common/constants.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const currencies = await getAllCurrencies();

    res.status(STATUS_CODES.OK).json(currencies);
  } catch (error) {
    next(error);
  }
});

router.get("/:currency", async (req, res, next) => {
  try {
    const { currency } = req.params;
    const currencyData = await getCurrencyByCode(currency);

    res.status(STATUS_CODES.OK).json(currencyData);
  } catch (error) {
    next(error);
  }
});

export default router;
