import { Router } from "express";
import { getGoods } from "../utilities/index.js";
import { prepareCategoryRandom } from "../utilities/prepare_category_for_view.js";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const goods = await getGoods();
    const phones = prepareCategoryRandom({
      categoryName: "phones",
      goods,
      numberOfItems: 4,
    });
    const laptops = prepareCategoryRandom({
      categoryName: "laptops",
      goods,
      numberOfItems: 4,
    });
    const sections = [phones, laptops];
    res.render("main", { sections });
  } catch (error) {
    next(error);
  }
});

export default router;
