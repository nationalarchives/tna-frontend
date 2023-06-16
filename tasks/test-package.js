const fs = require("fs");
const packageJson = require("../package.json");

let failure = null;

const packageDirectory = "package";
const checkExists = [
  "",
  "package.json",
  "govuk-prototype-kit.config.json",
  "README.md",
  "nationalarchives",
  "nationalarchives/assets",
  "nationalarchives/assets/images/favicon.ico",
  "nationalarchives/assets/images/tna-horizontal-logo.svg",
  "nationalarchives/assets/images/tna-horizontal-logo-inverted.svg",
  "nationalarchives/assets/images/tna-square-logo.svg",
  "nationalarchives/assets/images/tna-square-logo-inverted.svg",
  "nationalarchives/components",
  // "nationalarchives/components/header/_header.scss",
  // "nationalarchives/components/header/_index.scss",
  // "nationalarchives/components/header/fixtures.json",
  // "nationalarchives/components/header/header.js",
  // "nationalarchives/components/header/header.mjs",
  // "nationalarchives/components/header/header.stories.js",
  // "nationalarchives/components/header/macro-options.json",
  // "nationalarchives/components/header/macro.njk",
  // "nationalarchives/components/header/template.njk",
  "nationalarchives/components/grid/_grid.scss",
  "nationalarchives/components/grid/_index.scss",
  "nationalarchives/components/grid/fixtures.json",
  "nationalarchives/components/grid/grid.stories.js",
  "nationalarchives/components/grid/macro-options.json",
  "nationalarchives/components/grid/macro.njk",
  "nationalarchives/components/grid/template.njk",
  "nationalarchives/_base.scss",
  "nationalarchives/_prototype-kit.scss",
  "nationalarchives/all.css",
  "nationalarchives/all.js",
  "nationalarchives/all.mjs",
  "nationalarchives/all.scss",
];

console.log(`Testing package file structure`);
checkExists.forEach((checkFile) => {
  const checkFilePath = `${packageDirectory}/${checkFile}`;

  try {
    fs.accessSync(checkFilePath);
    console.log(
      `🟢 [PASS] ${
        fs.lstatSync(checkFilePath).isDirectory() ? "Directory" : "File"
      } exists: ${checkFilePath.replace(/\/$/, "")}`
    );
  } catch (err) {
    console.error(`🔴 [FAIL] ${err}`);
    failure = 1;
  }
});

console.log("------------------------------------------");

console.log(`Testing package version`);
const compiledPackageJson = require("../package/package.json");
if (packageJson.version === compiledPackageJson.version) {
  console.log(`🟢 [PASS] Version ${packageJson.version} is set in the package`);
} else {
  console.error(
    `🔴 [FAIL] The package version should be ${packageJson.version} but is ${compiledPackageJson.version}`
  );
  failure = 2;
}

console.log("------------------------------------------");

console.log(`Testing prototype kit config`);
const expectedPrototypeKitConfigProperties = [
  "nunjucksPaths",
  "scripts",
  "assets",
  "sass",
];
const prototypeKitConfig = require(`../${packageDirectory}/govuk-prototype-kit.config.json`);
expectedPrototypeKitConfigProperties.forEach(
  (expectedPrototypeKitConfigProperty) => {
    if (
      Object.keys(prototypeKitConfig).includes(
        expectedPrototypeKitConfigProperty
      )
    ) {
      console.log(
        `🟢 [PASS] The prototype kit config contains "${expectedPrototypeKitConfigProperty}"`
      );
    } else {
      console.error(
        `🔴 [FAIL] The prototype kit config is missing "${expectedPrototypeKitConfigProperty}"`
      );
      failure = 3;
    }
  }
);

// TODO: Test CSS and JS for contents

if (failure !== null) {
  process.exit(failure);
}
