import { STATUS_CODES, MESSAGE } from "../common/index.js";

export const notFoundHandler = (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send(MESSAGE.NOT_FOUND);
};
