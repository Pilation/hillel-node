import { STATUS_CODES, MESSAGE } from "../common/index.js";

export const notFoundHandler = (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    success: false,
    data: null,
    message: MESSAGE.NOT_FOUND,
  });
};
