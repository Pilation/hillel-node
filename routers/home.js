import { Router } from "express";
import { getGoods } from "../utilities/index.js";
import { prepareCategoryWithNumberRandomItemsForView } from "../utilities/prepare_category_for_view.js";
const router = Router();

router.get("/", async (req, res) => {
  const goods = await getGoods();
  const phones = prepareCategoryWithNumberRandomItemsForView({
    categoryName: "phones",
    goods,
    numberOfItems: 4,
  });
  const laptops = prepareCategoryWithNumberRandomItemsForView({
    categoryName: "laptops",
    goods,
    numberOfItems: 4,
  });
  const sections = [phones, laptops];
  res.render("main", { sections });
});

export default router;
