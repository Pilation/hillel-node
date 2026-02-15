import express from "express";
import dotenv from "dotenv";

import { notFoundHandler } from "./middlewares/not_found_handler.js";
import { errorHandler } from "./middlewares/error_handler.js";

import currenciesRouter from "./routers/currencies.js";

import { ROUTES } from "./common/constants.js";

dotenv.config();
const PORT = process.env.PORT || 3800;

const app = express();

app.use(express.json());

app.use(ROUTES.CURRENCIES, currenciesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server start на http://localhost:${PORT}`);
});
