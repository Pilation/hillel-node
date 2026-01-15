import { dirname } from "path";
import { fileURLToPath } from "url";

export function getDirname(metaUrl) {
  return dirname(fileURLToPath(metaUrl));
}
