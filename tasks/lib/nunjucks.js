const nunjucks = require("nunjucks");
const path = require("path");
const fs = require("fs");

require.extensions[".njk"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

nunjucks.configure(path.join(__dirname, "../..", "src"));

exports.nunjucks = nunjucks;

exports.renderNunjucks = (string, params, trimWhitespace = false) =>
  trimWhitespace
    ? nunjucks
        .renderString(string, params)
        .trim()
        .replace(/>\n\s*/g, ">")
        .replace(/\n\s*</g, "<")
    : nunjucks.renderString(string, params);
