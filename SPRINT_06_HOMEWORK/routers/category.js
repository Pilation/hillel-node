import { Router } from "express";
import { getCategories } from "../utilities/get_categories.js";
import { getGoods } from "../utilities/get_goods.js";
import { prepareCategoryForView } from "../utilities/prepare_category_for_view.js";
import { MESSAGE, STATUS_CODES } from "../common/constants.js";

const router = Router();

async function checkCategory(req, res, next, category) {
  try {
    const categories = await getCategories();
    const currentCategoryExists = categories.includes(category);
    if (!currentCategoryExists) {
      const error = new Error(MESSAGE.CATEGORY_NOT_FOUND);
      error.status = STATUS_CODES.NOT_FOUND;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
}

router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.render("category", { categories });
  } catch (error) {
    next(error);
  }
});

router.param("category", checkCategory);

router.get("/:category", async (req, res, next) => {
  try {
    const goods = await getGoods();
    const section = prepareCategoryForView({
      categoryName: req.params.category,
      goods,
    });
    res.render("category_single", { section });
  } catch (error) {
    next(error);
  }
});

export default router;
