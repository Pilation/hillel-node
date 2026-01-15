import { getCachedCategories, setCachedCategories } from "./cache.js";
import { getGoods } from "./get_goods.js";

export async function getCategories() {
  const cached = getCachedCategories();
  if (cached) {
    return cached;
  }

  const goods = await getGoods();
  const categories = [...new Set(goods.map((item) => item.category))];
  setCachedCategories(categories);

  return categories;
}
