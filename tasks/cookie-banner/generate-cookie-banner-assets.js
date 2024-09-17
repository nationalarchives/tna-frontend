var fs = require("fs");
const nunjucks = require("nunjucks");

require.extensions[".njk"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

nunjucks.configure(__dirname + "/../../src");

const componentNunjucks = require("../../src/nationalarchives/components/cookie-banner/template.njk");

const html = nunjucks
  .renderString(componentNunjucks, {
    params: {
      serviceName: "my service",
      cookiesUrl: "/cookies",
      policies: "",
      policiesKey: "",
      preferencesSetKey: "",
      cookiesDomain: "myservice.nationalarchives.gov.uk",
      cookiesPath: "/",
      allowInsecure: false,
    },
  })
  .trim()
  .replace(/ " /g, '" ');

fs.readFile(
  "src/nationalarchives/components/cookie-banner/README.md",
  "utf8",
  (err, data) => {
    if (err) throw err;
    const newReadme = data.replace("<!-- COOKIEBANNERHTML -->", html);
    fs.writeFile("package-cookie-banner/README.md", newReadme, (err) => {
      if (err) throw err;
    });
  },
);

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) throw err;
  const json = JSON.parse(data);
  const { version, repository, author, license, bugs } = json;
  const newJson = {
    name: "@nationalarchives/frontend-cookie-banner",
    version,
    description: "The National Archives frontend cookie banner",
    repository,
    author,
    license,
    bugs,
    homepage:
      "https://nationalarchives.github.io/tna-frontend-docs/get-started/cookies/",
    scripts: {},
  };
  fs.writeFile(
    "package-cookie-banner/package.json",
    JSON.stringify(newJson, null, 2),
    (err) => {
      if (err) throw err;
    },
  );
});
