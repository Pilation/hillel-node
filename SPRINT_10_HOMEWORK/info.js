import { connectToMongo, closeClient } from "./db/db.js";
import { getBooksCollection } from "./db/collections.js";
import "./db/shutdown.js";
import { parseArgs } from "./utils/index.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

await connectToMongo(MONGO_URI);

const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);

const handlers = {
  tags: async (value, collection) => {
    if (!value || value === true) {
      console.error("Error: please provide a tag value (--tags=yourTag)");
      return;
    }

    const tag = value.toLowerCase();
    console.log(`Adding tag "${tag}" to all books...\n`);

    const result = await collection.updateMany(
      { tags: { $ne: tag } },
      { $push: { tags: tag } },
    );

    console.log(`Modified ${result.modifiedCount} document(s)\n`);
  },

  rating: async (value, collection) => {
    const minRating = parseFloat(value);

    if (isNaN(minRating)) {
      console.error("Error: rating must be a number");
      return;
    }

    console.log(`Books with rating >= ${minRating}:\n`);

    const books = await collection
      .find(
        { rating: { $gte: minRating } },
        { projection: { title: 1, rating: 1, _id: 0 } },
      )
      .toArray();

    if (books.length === 0) {
      console.log("No books found with this rating\n");
    } else {
      const titles = books.map((book) => `${book.title} (${book.rating})`);
      console.log(titles.join("\n"));
    }
  },

  genre: async (value, collection) => {
    console.log("Unique genres in the collection:\n");

    const result = await collection
      .aggregate([{ $unwind: "$genre" }, { $group: { _id: "$genre" } }])
      .toArray();

    const uniqueGenres = result.map((item) => item._id);
    console.log(uniqueGenres.join("\n"));
    console.log(`\nTotal: ${uniqueGenres.length} unique genre(s)\n`);
  },

  author: async (value, collection) => {
    console.log("Authors in the collection:\n");

    const authors = await collection.distinct("author");
    console.log(authors.join("\n"));
  },

  default: async (value, collection) => {
    const count = await collection.countDocuments();
    console.log(`Total number of documents in the collection: ${count}\n`);

    console.log("Book titles:\n");
    const books = await collection
      .find({}, { projection: { title: 1, author: 1, _id: 0 } })
      .toArray();

    const titles = books.map((book) => `${book.author} - ${book.title}`);
    console.log(titles.join("\n"));
  },
};

try {
  const booksCollection = getBooksCollection();
  const command =
    Object.keys(parsedArgs).find((key) => handlers[key]) || "default";

  await handlers[command](parsedArgs[command], booksCollection);
} catch (err) {
  console.error("Error:", err);
} finally {
  await closeClient();
}
