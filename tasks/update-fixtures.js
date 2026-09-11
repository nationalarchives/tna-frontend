import { globSync } from "glob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nunjucks from "nunjucks";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  const newComponentFixtures = {
    ...componentFixtures,
    fixtures: componentFixtures.fixtures.map((fixture) => ({
      ...fixture,
      html: nunjucks
        .renderString(componentNunjucks, {
          params: fixture.options,
        })
        .trim()
        .replace(/>\n\s*/gu, ">")
        .replace(/\n\s*</gu, "<"),
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
const templateFixtures = JSON.parse(
  fs.readFileSync(templateFixturesFile, "utf8"),
);
const newTemplateFixtures = {
  ...templateFixtures,
  fixtures: templateFixtures.fixtures.map((fixture) => ({
    ...fixture,
    html: nunjucks
      .renderString(
        fixture.template
          ? fs.readFileSync(`${templatesDirectory}${fixture.template}`, "utf8")
          : fixture.string,
        fixture.options,
      )
      .trim()
      .replace(/>\n\s*/gu, ">")
      .replace(/\n\s*</gu, "<"),
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
