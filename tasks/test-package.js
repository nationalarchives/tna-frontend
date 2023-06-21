const fs = require("fs");
const packageJson = require("../package.json");

let failure = null;

const componentJavascriptFiles = (component) => [
  `nationalarchives/components/${component}/${component}.js`,
  `nationalarchives/components/${component}/${component}.js.map`,
  `nationalarchives/components/${component}/${component}.mjs`,
];

const componentFiles = (component, excludeJavaScript = false) => [
  `nationalarchives/components/${component}`,
  `nationalarchives/components/${component}/_${component}.scss`,
  `nationalarchives/components/${component}/_index.scss`,
  `nationalarchives/components/${component}/fixtures.json`,
  `nationalarchives/components/${component}/macro-options.json`,
  `nationalarchives/components/${component}/macro.njk`,
  `nationalarchives/components/${component}/template.njk`,
  ...(excludeJavaScript ? [] : componentJavascriptFiles(component)),
];

const packageDirectory = "package";
const checkExists = [
  "",
  // Root files
  "package.json",
  "govuk-prototype-kit.config.json",
  "README.md",
  "nationalarchives",
  "nationalarchives/_base.scss",
  "nationalarchives/_prototype-kit.scss",
  "nationalarchives/all.css",
  "nationalarchives/all.css.map",
  "nationalarchives/all.js",
  "nationalarchives/all.js.map",
  "nationalarchives/all.mjs",
  "nationalarchives/all.scss",
  // Assets
  "nationalarchives/assets",
  "nationalarchives/assets/images/apple-touch-icon-152x152.png",
  "nationalarchives/assets/images/apple-touch-icon-167x167.png",
  "nationalarchives/assets/images/apple-touch-icon-180x180.png",
  "nationalarchives/assets/images/apple-touch-icon.png",
  "nationalarchives/assets/images/favicon.ico",
  "nationalarchives/assets/images/mask-icon.svg",
  "nationalarchives/assets/images/nationalarchives-opengraph-image.png",
  "nationalarchives/assets/images/tna-horizontal-logo-inverted.svg",
  "nationalarchives/assets/images/tna-horizontal-logo.svg",
  "nationalarchives/assets/images/tna-square-logo-inverted.svg",
  "nationalarchives/assets/images/tna-square-logo.svg",
  // Components
  "nationalarchives/components",
  ...componentFiles("button", true),
  ...componentFiles("card", true),
  ...componentFiles("footer", true),
  ...componentFiles("grid", true),
  ...componentFiles("sensitive-image"),
  // Tools
  "nationalarchives/tools",
  "nationalarchives/tools/_all.scss",
  "nationalarchives/tools/_exports.scss",
  // Utilities
  "nationalarchives/utilities",
  "nationalarchives/utilities/_all.scss",
  "nationalarchives/utilities/_global.scss",
  "nationalarchives/utilities/_grid.scss",
  "nationalarchives/utilities/_typography.scss",
  // Variables
  "nationalarchives/variables",
  "nationalarchives/variables/_all.scss",
  "nationalarchives/variables/_grid.scss",
  "nationalarchives/variables/_media.scss",
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

// console.log("------------------------------------------");

// TODO: Test CSS and JS for contents
// console.log(`Testing compiled JavaScript file`);
// const jsPackage = require("../package/nationalarchives/all.js")
// console.log(jsPackage)
// const {initAll} = require("../package/nationalarchives/all.mjs")
// console.log(initAll)

if (failure !== null) {
  process.exit(failure);
}
