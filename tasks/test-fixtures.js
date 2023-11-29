const { globSync } = require("glob");
const fs = require("fs");
const path = require("path");
const Diff = require("diff");
const nunjucks = require("nunjucks");

require.extensions[".njk"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

nunjucks.configure(path.join(__dirname, "..", "src"));

const pass = (message) => {
  console.log("\x1b[42m%s\x1b[0m", " PASS ", "\x1b[0m", message);
};

const fail = (message) => {
  console.error("\x1b[41m%s\x1b[0m", " FAIL ", "\x1b[0m", message);
};

const componentsDirectory = "src/nationalarchives/components/";
const componentFixturesFile = "/fixtures.json";

const components = globSync(
  `${componentsDirectory}*${componentFixturesFile}`,
).map((componentFixtureFile) =>
  componentFixtureFile
    .replace(new RegExp(`^${componentsDirectory}`), "")
    .replace(new RegExp(`${componentFixturesFile}$`), ""),
);

const failedComponents = components.filter((component) => {
  console.log(`\nComponent: ${component}`);
  const componentFixtures = require(
    `../${componentsDirectory}${component}${componentFixturesFile}`,
  );
  const componentNunjucks = require(
    `../${componentsDirectory}${component}/template.njk`,
  );
  const failedFixtures = componentFixtures.fixtures.filter((fixture) => {
    const result = nunjucks
      .renderString(componentNunjucks, {
        params: fixture.options,
      })
      .trim()
      .replace(/>\n\s*/g, ">")
      .replace(/\n\s*</g, "<");
    const mismatch = result !== fixture.html;
    if (mismatch) {
      fail(`${fixture.name} - ${componentsDirectory}${component}/template.njk`);
      console.log("\n");
      const diff = Diff.diffChars(fixture.html, result)
        .map(
          (part) =>
            `${
              part.added ? "\x1b[32m" : part.removed ? "\x1b[31m" : "\x1b[0m"
            }${part.value}`,
        )
        .join("");
      console.log(diff);
      console.log("\n");
    } else {
      pass(fixture.name);
    }
    return mismatch;
  });
  return failedFixtures.length;
});
console.log("\n------------------------------------------");
if (failedComponents.length) {
  fail(
    `${failedComponents.length} out of ${components.length} component${
      components.length === 1 ? "" : "s"
    } failed`,
  );
  process.exitCode = 1;
  throw new Error("Fixtures tests failed");
} else {
  pass(
    `${components.length} component${
      components.length === 1 ? "" : "s"
    } passed successfully`,
  );
}
console.log("------------------------------------------");
