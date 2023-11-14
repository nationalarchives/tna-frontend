const { globSync } = require("glob");
const fs = require("fs");
const Diff = require("diff");
const nunjucks = require("nunjucks");

require.extensions[".njk"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

nunjucks.configure(__dirname + "/../src");

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
      .renderString(
        componentNunjucks.replace(
          '{% from "nationalarchives/components/',
          '{% from "src/nationalarchives/components/',
        ),
        {
          params: fixture.options,
        },
      )
      .trim()
      .replace(/>\n\s*/g, ">")
      .replace(/\n\s*</g, "<");
    const mismatch = result !== fixture.html;
    if (mismatch) {
      console.error(`  🔴 [FAIL] ${fixture.name}\n`);
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
      console.log(`  🟢 [PASS] ${fixture.name}`);
    }
    return mismatch;
  });
  return failedFixtures.length;
});
console.log("\n------------------------------------------");
if (failedComponents.length) {
  console.error(
    `🔴 [FAIL] ${failedComponents.length} out of ${
      components.length
    } component${components.length === 1 ? "" : "s"} failed`,
  );
  process.exitCode = 1;
  throw new Error("Fixtures tests failed");
} else {
  console.log(
    `🟢 [PASS] ${components.length} component${
      components.length === 1 ? "" : "s"
    } passed successfully`,
  );
}
console.log("------------------------------------------");
