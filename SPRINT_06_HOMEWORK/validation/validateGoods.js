import Ajv from "ajv";
import { goodsSchema, productSchema } from "./schemas.js";

const ajv = new Ajv({ allErrors: true });

const validateProduct = ajv.compile(productSchema);
const validateGoods = ajv.compile(goodsSchema);

export function validateSingleProduct(product) {
  const valid = validateProduct(product);
  return {
    valid,
    errors: valid ? null : validateProduct.errors,
  };
}

export function validateGoodsArray(goods) {
  const valid = validateGoods(goods);
  return {
    valid,
    errors: valid ? null : validateGoods.errors,
  };
}
