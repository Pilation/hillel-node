export function parseArgs(args) {
  const result = {};
  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.substring(2).split("=");
      result[key] = value || true;
    }
  }
  return result;
}
