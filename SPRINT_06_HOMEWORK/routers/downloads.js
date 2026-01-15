import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { getDirname } from "../utilities/index.js";
import { MESSAGE, STATUS_CODES } from "../common/constants.js";

const router = Router();

const __dirname = getDirname(import.meta.url);

router.get("/:fileName", async (req, res) => {
  try {
    const { fileName } = req.params;
    await fs.access(path.resolve(__dirname, "..", "data", fileName));
    res.download(path.resolve(__dirname, "..", "data", fileName));
  } catch (err) {
    console.error(err);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(MESSAGE.INTERNAL_SERVER_ERROR);
  }
});

export default router;
