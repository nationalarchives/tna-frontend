const fs = require("fs");

const emailNunjucksLocation = "package/nationalarchives/templates/email.njk";

fs.readFile(emailNunjucksLocation, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile(
    "package/nationalarchives/email.css",
    "utf8",
    (err, compiledCSS) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        emailNunjucksLocation,
        data.replace(
          "<!-- COMPILED_CSS -->",
          `<style media="all" type="text/css">${compiledCSS.replace("/*# sourceMappingURL=email.css.map */", "").trim()}</style>`,
        ),
        (err) => {
          if (err) {
            return console.error(err);
          }
        },
      );
    },
  );
});
