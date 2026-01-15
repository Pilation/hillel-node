import { getRandomItems } from "./get_random_items.js";

export function prepareCategoryForView({ categoryName, goods }) {
  const categoryGoods = goods.filter((item) => item.category === categoryName);
  return {
    category: categoryName,
    items: categoryGoods,
  };
}

export function prepareCategoryRandom({ categoryName, goods, numberOfItems }) {
  const categoryData = prepareCategoryForView({ categoryName, goods });
  const randomItems = getRandomItems(categoryData.items, numberOfItems);
  return {
    ...categoryData,
    items: randomItems,
  };
}
