import { connectToMongo, closeClient } from "./db/db.js";
import "./db/shutdown.js";
import { getDirname } from "./utils/get_dirname.js";
import { getAllBooks } from "./services/booksService.js";
import dotenv from "dotenv";
dotenv.config();

const __dirname = getDirname(import.meta.url);

const MONGO_URI = process.env.MONGO_URI;

console.log("Starting application...");

await connectToMongo(MONGO_URI);

await getAllBooks(__dirname);

console.log("Application finished successfully");

await closeClient();
