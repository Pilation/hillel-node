import { readFile } from "fs/promises";
import { join } from "path";
import { getDirname } from "./get_dirname.js";
import { getCachedGoods, setCachedGoods } from "./cache.js";
import { validateGoodsArray } from "../validation/validateGoods.js";
import { MESSAGE } from "../common/constants.js";

const __dirname = getDirname(import.meta.url);

export async function getGoods() {
  const cached = getCachedGoods();
  if (cached) {
    return cached;
  }

  const filePath = join(__dirname, "..", "data", "goods.json");
  try {
    const data = await readFile(filePath, "utf-8");
    const goods = JSON.parse(data);
    const { valid, errors } = validateGoodsArray(goods);

    if (!valid) {
      throw new Error(`${MESSAGE.INVALID_DATA}: ${JSON.stringify(errors)}`);
    }
    setCachedGoods(goods);
    return goods;
  } catch (err) {
    console.error(err);
    return [];
  }
}
