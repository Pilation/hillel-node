import { readFile } from "fs/promises";
import { join } from "path";
import { getBooksCollection } from "../db/collections.js";
import { prepareMigrationData } from "../helpers/migrationHelpers.js";
import { setMigration } from "./migrationsService.js";

export const BOOKS_FILE_NAME = "books.json";

export const setBooks = async (books) => {
  const result = await getBooksCollection().insertMany(books);
  return result;
};

export const seedBooks = async (path) => {
  try {
    const booksData = await readFile(path, "utf-8");
    const books = JSON.parse(booksData);
    const result = await setBooks(books);
    console.log(`Seeded ${result.insertedCount} books from ${path}`);
    return result;
  } catch (error) {
    console.error(`Error reading or parsing ${path}:`, error.message);
    throw error;
  }
};

export const getAllBooks = async (dataDir) => {
  const cursor = getBooksCollection().find();
  const data = await cursor.toArray();

  if (data.length === 0) {
    const booksPath = join(dataDir, BOOKS_FILE_NAME);
    const result = await seedBooks(booksPath);
    const migrationData = prepareMigrationData({
      fileName: BOOKS_FILE_NAME,
      count: result.insertedCount,
      timestamp: new Date(),
    });
    await setMigration(migrationData);
  } else {
    console.log(`Found ${data.length} books in collection`);
  }

  return data;
};
