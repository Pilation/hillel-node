import { STATUS_CODES, MESSAGE } from "../common/index.js";

export const errorHandler = (err, req, res) => {
  const status = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || MESSAGE.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
