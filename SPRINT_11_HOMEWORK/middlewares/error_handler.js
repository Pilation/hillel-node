import { STATUS_CODES, MESSAGE } from "../common/index.js";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || MESSAGE.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    success: false,
    data: null,
    message,
  });
};
