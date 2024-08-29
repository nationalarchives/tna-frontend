const { globSync } = require("glob");
const fs = require("fs");
const path = require("path");
const Diff = require("diff");
const { renderNunjucks } = require("./lib/nunjucks");

const componentsDirectory = "src/nationalarchives/components/";
const componentFixturesFile = "/fixtures.json";
const fixturesOutputDirectory = "fixtures-html";

if (!fs.existsSync(fixturesOutputDirectory)) {
  fs.mkdirSync(fixturesOutputDirectory);
}

const components = globSync(
  `${componentsDirectory}*${componentFixturesFile}`,
).map((componentFixtureFile) =>
  componentFixtureFile
    .replace(new RegExp(`^${componentsDirectory}`), "")
    .replace(new RegExp(`${componentFixturesFile}$`), ""),
);

components.forEach((component) => {
  const componentFixtures = require(
    `../${componentsDirectory}${component}${componentFixturesFile}`,
  );
  const componentNunjucks = require(
    `../${componentsDirectory}${component}/template.njk`,
  );
  componentFixtures.fixtures.forEach((fixture) => {
    const result = renderNunjucks(componentNunjucks, {
      params: fixture.options,
    });
    fs.writeFile(
      `${fixturesOutputDirectory}/${component}-${fixture.name
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
