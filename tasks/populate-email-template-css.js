const fs = require("fs");

const replacementString = "<!-- COMPILED_EMAIL_CSS -->";

fs.readFile(
  "package/nationalarchives/email.css",
  "utf8",
  (err, compiledCSS) => {
    if (err) {
      console.error(err);
      return;
    }

    compiledCSS = compiledCSS
      .replace("/*# sourceMappingURL=email.css.map */", "")
      .trim();

    const emailNunjucksLocation =
      "package/nationalarchives/templates/layouts/email.njk";
    fs.readFile(emailNunjucksLocation, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        emailNunjucksLocation,
        data.replace(
          replacementString,
          `<style media="all" type="text/css">${compiledCSS}</style>`,
        ),
        (err) => {
          if (err) {
            return console.error(err);
          }
        },
      );
    });

    const templateFixturesLocation =
      "package/nationalarchives/templates/fixtures.json";
    fs.readFile(templateFixturesLocation, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        templateFixturesLocation,
        data.replace(
          replacementString,
          `<style media=\\"all\\" type=\\"text/css\\">${compiledCSS.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}</style>`,
        ),
        (err) => {
          if (err) {
            return console.error(err);
          }
        },
      );
    });
  },
);
