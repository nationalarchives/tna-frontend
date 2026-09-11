import fs from "fs";
import { globSync } from "glob";
import * as Diff from "diff";
import { pass, fail } from "./lib/passfail.js";
import { renderNunjucks } from "./lib/nunjucks.js";

const componentsDirectory = "src/nationalarchives/components/";
const componentFixturesFile = "/fixtures.json";

const components = globSync(`${componentsDirectory}*${componentFixturesFile}`)
  .map((componentFixtureFile) =>
    componentFixtureFile
      .replace(new RegExp(`^${componentsDirectory}`), "")
      .replace(new RegExp(`${componentFixturesFile}$`), ""),
  )
  .reverse();

const failedComponents = components.filter((component) => {
  console.log(`\nComponent: ${component}`);
  const componentFixtures = JSON.parse(
    fs.readFileSync(
      `${componentsDirectory}${component}${componentFixturesFile}`,
      "utf8",
    ),
  );
  const componentNunjucks = fs.readFileSync(
    `${componentsDirectory}${component}/template.njk`,
    "utf8",
  );
  const failedFixtures = componentFixtures.fixtures.filter((fixture) => {
    const result = renderNunjucks(
      componentNunjucks,
      { params: fixture.options },
      true,
    );
    const mismatch = result !== fixture.html;
    if (mismatch) {
      fail(`${fixture.name} (${componentsDirectory}${component}/template.njk)`);
      console.log("\n");
      const diff = Diff.diffChars(fixture.html, result)
        .map(
          (part) =>
            `${
              part.added ? "\x1b[32m" : part.removed ? "\x1b[31m" : "\x1b[0m"
            }${part.value}`,
        )
        .join("");
      console.log(diff.replace(/></gu, ">\n<"));
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

console.log("\nTemplates");
const templatesDirectory = "src/nationalarchives/templates/";
const templateFixturesFile = `${templatesDirectory}fixtures.json`;
const templateFixtures = JSON.parse(
  fs.readFileSync(templateFixturesFile, "utf8"),
);
const failedTemplates = templateFixtures.fixtures.filter((fixture) => {
  const templateNunjucks = fs.readFileSync(
    `${templatesDirectory}${fixture.template}`,
    "utf8",
  );
  const result = renderNunjucks(templateNunjucks, fixture.options, true);
  const mismatch = result !== fixture.html;
  if (mismatch) {
    fail(`${fixture.name} (${fixture.template})`);
    console.log("\n");
    const diff = Diff.diffChars(fixture.html, result)
      .map(
        (part) =>
          `${
            part.added ? "\x1b[32m" : part.removed ? "\x1b[31m" : "\x1b[0m"
          }${part.value}`,
      )
      .join("");
    console.log(diff.replace(/></gu, ">\n<"));
    console.log("\n");
    return true;
  }
  pass(fixture.name);
  return false;
});
console.log("\n------------------------------------------");
if (failedTemplates.length) {
  fail(
    `${failedTemplates.length} out of ${templateFixtures.fixtures.length} template${
      templateFixtures.fixtures.length === 1 ? "" : "s"
    } failed`,
  );
  process.exitCode = 1;
  throw new Error("Fixtures tests failed");
} else {
  pass(
    `${templateFixtures.fixtures.length} template${
      templateFixtures.fixtures.length === 1 ? "" : "s"
    } passed successfully`,
  );
}
console.log("------------------------------------------");
