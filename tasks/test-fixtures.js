const { globSync } = require("glob");
const Diff = require("diff");
const { pass, fail } = require("./lib/passfail");
const { renderNunjucks } = require("./lib/nunjucks");

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
    const result = renderNunjucks(componentNunjucks, fixture.options, true);
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
      return true;
    }
    pass(fixture.name);
    return false;
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
