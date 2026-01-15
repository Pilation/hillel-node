export const productSchema = {
  type: "object",
  properties: {
    category: {
      type: "string",
      minLength: 1,
      description: "Категорія товару (phones, laptops, тощо)",
    },
    title: {
      type: "string",
      minLength: 1,
      description: "Назва товару",
    },
    url: {
      type: "string",
      minLength: 1,
      pattern: "^[a-z0-9-]+$",
      description: "URL-friendly ідентифікатор товару",
    },
    price: {
      type: "number",
      minimum: 0,
      description: "Ціна товару в USD",
    },
    image: {
      type: "string",
      pattern: "^https?://",
      minLength: 1,
      description: "URL зображення товару",
    },
    description: {
      type: "string",
      minLength: 1,
      description: "Опис товару",
    },
    stock: {
      type: "integer",
      minimum: 0,
      description: "Кількість товару на складі",
    },
  },
  required: [
    "category",
    "title",
    "url",
    "price",
    "image",
    "description",
    "stock",
  ],
  additionalProperties: false,
};

export const goodsSchema = {
  type: "array",
  items: productSchema,
  minItems: 1,
};
