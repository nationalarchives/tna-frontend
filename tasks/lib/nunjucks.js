import nunjucks from "nunjucks";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

nunjucks.configure(path.join(__dirname, "../..", "src"));

export const renderNunjucks = (string, params, trimWhitespace = false) =>
  trimWhitespace
    ? nunjucks
        .renderString(string, params)
        .trim()
        .replace(/>\n\s*/gu, ">")
        .replace(/\n\s*</gu, "<")
    : nunjucks.renderString(string, params);
