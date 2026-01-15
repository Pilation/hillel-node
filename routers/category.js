import { Router } from "express";
import { getCategories } from "../utilities/get_categories.js";
import { getGoods } from "../utilities/get_goods.js";
import { prepareCategoryForView } from "../utilities/prepare_category_for_view.js";
import { MESSAGE, STATUS_CODES } from "../common/constants.js";

const router = Router();

async function checkCategory(req, res, next, category) {
  const categories = await getCategories();
  const currentCategoryExists = categories.includes(category);
  if (!currentCategoryExists) {
    return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGE.CATEGORY_NOT_FOUND);
  }
  next();
}

router.get("/", async (req, res) => {
  const categories = await getCategories();
  res.render("category", { categories });
});

router.param("category", checkCategory);

router.get("/:category", async (req, res) => {
  const goods = await getGoods();
  const section = prepareCategoryForView({
    categoryName: req.params.category,
    goods,
  });
  res.render("category_single", { section });
});

export default router;
