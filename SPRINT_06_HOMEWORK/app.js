import express from "express";
import dotenv from "dotenv";
import { join } from "path";

import { notFoundHandler } from "./middlewares/not_found_handler.js";
import { errorHandler } from "./middlewares/error_handler.js";

import homeRouter from "./routers/home.js";
import categoryRouter from "./routers/category.js";
import { downloadsRouter } from "./routers/index.js";

import { ROUTES } from "./common/constants.js";
import { getDirname } from "./utilities/get_dirname.js";

dotenv.config();
const PORT = process.env.PORT || 3800;

const __dirname = getDirname(import.meta.url);

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(express.static(join(__dirname, "public")));

app.use(ROUTES.HOME, homeRouter);
app.use(ROUTES.CATEGORY, categoryRouter);
app.use(ROUTES.DOWNLOADS, downloadsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server start на http://localhost:${PORT}`);
});
