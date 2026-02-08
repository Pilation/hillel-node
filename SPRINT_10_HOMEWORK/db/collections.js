import { getDb } from "./db.js";

let COLLECTION_BOOKS;

export function getBooksCollection() {
  if (!COLLECTION_BOOKS) {
    const DB = getDb(process.env.DB_NAME);
    COLLECTION_BOOKS = DB.collection("books");
  }
  return COLLECTION_BOOKS;
}

let COLLECTION_MIGRATIONS;

export function getMigrationsCollection() {
  if (!COLLECTION_MIGRATIONS) {
    const DB = getDb(process.env.DB_NAME);
    COLLECTION_MIGRATIONS = DB.collection("migrations");
  }
  return COLLECTION_MIGRATIONS;
}
