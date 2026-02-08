import { getMigrationsCollection } from "../db/collections.js";

export const setMigration = async (migration) => {
  const result = await getMigrationsCollection().insertOne(migration);
  console.log(`Migration record created:`, migration);
  return result;
};
