import { globSync } from "glob";
import fs from "fs";
import { renderNunjucks } from "./lib/nunjucks.js";

const fixturesOutputDirectory = "fixtures-html";

if (!fs.existsSync(fixturesOutputDirectory)) {
  fs.mkdirSync(fixturesOutputDirectory);
}

const componentsDirectory = "src/nationalarchives/components/";
const componentFixturesFile = "/fixtures.json";

const components = globSync(
  `${componentsDirectory}*${componentFixturesFile}`,
).map((componentFixtureFile) =>
  componentFixtureFile
    .replace(new RegExp(`^${componentsDirectory}`), "")
    .replace(new RegExp(`${componentFixturesFile}$`), ""),
);

components.forEach((component) => {
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
  componentFixtures.fixtures.forEach((fixture) => {
    const result = renderNunjucks(componentNunjucks, {
      params: fixture.options,
    });
    fs.writeFile(
      `${fixturesOutputDirectory}/component-${component}-${fixture.name
        .replace(/[^0-9a-z]/gi, "-")
        .toLowerCase()}.html`,
      result,
      (err) => {
        if (err) {
          return console.log(err);
        }
      },
    );
  });
});

const templatesDirectory = "src/nationalarchives/templates/";

JSON.parse(fs.readFileSync(`${templatesDirectory}fixtures.json`, "utf8"))
  .fixtures.filter((fixture) => fixture.omitFixtureHtmlValidation !== true)
  .forEach((fixture) => {
    const templateNunjucks = fs.readFileSync(
      `${templatesDirectory}${fixture.template}`,
      "utf8",
    );
    const result = renderNunjucks(templateNunjucks, {
      ...fixture.options,
    });
    fs.writeFile(
      `${fixturesOutputDirectory}/template-${fixture.name
        .replace(/[^0-9a-z]/gi, "-")
        .toLowerCase()}.html`,
      result,
      (err) => {
        if (err) {
          return console.log(err);
        }
      },
    );
  });
