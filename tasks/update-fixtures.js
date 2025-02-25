const { globSync } = require("glob");
var fs = require("fs");
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
components.forEach((component) => {
  const componentFixtures = require(
    `../${componentsDirectory}${component}${componentFixturesFile}`,
  );
  const componentNunjucks = require(
    `../${componentsDirectory}${component}/template.njk`,
  );
  const newComponentFixtures = {
    ...componentFixtures,
    fixtures: componentFixtures.fixtures.map((fixture) => ({
      ...fixture,
      html: nunjucks
        .renderString(componentNunjucks, {
          params: fixture.options,
        })
        .trim()
        .replace(/>\n\s*/g, ">")
        .replace(/\n\s*</g, "<"),
    })),
  };

  const allFixtureDifferences = newComponentFixtures.fixtures.reduce(
    (differences, fixture) =>
      fixture.html !==
      componentFixtures.fixtures.find((f) => f.name === fixture.name)?.html
        ? differences + 1
        : differences,
    0,
  );

  if (allFixtureDifferences) {
    fs.writeFile(
      `${componentsDirectory}${component}${componentFixturesFile}`,
      `${JSON.stringify(newComponentFixtures, null, 2).trim()}\n`,
      (err) => {
        if (err) throw err;
        console.log(
          `${allFixtureDifferences} ${component} fixture(s) updated successfully`,
        );
      },
    );
  }
});

const templatesDirectory = "src/nationalarchives/templates/";
const templateFixturesFile = `${templatesDirectory}fixtures.json`;
const templateFixtures = require(`../${templateFixturesFile}`);
const newTemplateFixtures = {
  ...templateFixtures,
  fixtures: templateFixtures.fixtures.map((fixture) => ({
    ...fixture,
    html: nunjucks
      .renderString(
        require(`../${templatesDirectory}${fixture.template}`),
        fixture.options,
      )
      .trim()
      .replace(/>\n\s*/g, ">")
      .replace(/\n\s*</g, "<"),
  })),
};
const allFixtureDifferences = newTemplateFixtures.fixtures.reduce(
  (differences, fixture) =>
    fixture.html !==
    templateFixtures.fixtures.find((f) => f.name === fixture.name)?.html
      ? differences + 1
      : differences,
  0,
);
if (allFixtureDifferences) {
  fs.writeFile(
    templateFixturesFile,
    `${JSON.stringify(newTemplateFixtures, null, 2).trim()}\n`,
    (err) => {
      if (err) throw err;
      console.log(
        `${allFixtureDifferences} template fixture(s) updated successfully`,
      );
    },
  );
}
