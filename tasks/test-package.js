const fs = require("fs");
const packageJson = require("../package.json");
const jsdom = require("jsdom");
require("node-self");

const componentsWithJavaScript = {};

const componentJavascriptFiles = (component, javascriptClass) => {
  componentsWithJavaScript[component] = javascriptClass;
  return [
    `nationalarchives/components/${component}/${component}.js`,
    `nationalarchives/components/${component}/${component}.js.map`,
    `nationalarchives/components/${component}/${component}.mjs`,
  ];
};

const componentFiles = (component, javascriptClass = null) => [
  `nationalarchives/components/${component}/_index.scss`,
  `nationalarchives/components/${component}/${component}.scss`,
  `nationalarchives/components/${component}/${component}.css`,
  `nationalarchives/components/${component}/${component}.css.map`,
  `nationalarchives/components/${component}/fixtures.json`,
  `nationalarchives/components/${component}/macro-options.json`,
  `nationalarchives/components/${component}/macro.njk`,
  `nationalarchives/components/${component}/template.njk`,
  ...(javascriptClass
    ? componentJavascriptFiles(component, javascriptClass)
    : []),
];

const packageDirectory = "package";
const checkExists = [
  // Root files
  "package.json",
  "govuk-prototype-kit.config.json",
  "README.md",
  "nationalarchives/all.css",
  "nationalarchives/all.css.map",
  "nationalarchives/all.js",
  "nationalarchives/all.js.map",
  "nationalarchives/all.mjs",
  "nationalarchives/all.scss",
  // Assets
  "nationalarchives/assets/images/apple-touch-icon-152x152.png",
  "nationalarchives/assets/images/apple-touch-icon-167x167.png",
  "nationalarchives/assets/images/apple-touch-icon-180x180.png",
  "nationalarchives/assets/images/apple-touch-icon.png",
  "nationalarchives/assets/images/favicon.ico",
  "nationalarchives/assets/images/mask-icon.svg",
  "nationalarchives/assets/images/nationalarchives-opengraph-image.png",
  "nationalarchives/assets/images/tna-horizontal-logo-inverted.svg",
  "nationalarchives/assets/images/tna-horizontal-logo.svg",
  "nationalarchives/assets/images/tna-square-logo.svg",
  // Components
  ...componentFiles("breadcrumbs", "Breadcrumbs"),
  ...componentFiles("button"),
  ...componentFiles("card"),
  ...componentFiles("cookie-banner", "CookieBanner"),
  ...componentFiles("filters"),
  ...componentFiles("footer"),
  ...componentFiles("gallery", "Gallery"),
  ...componentFiles("grid"),
  ...componentFiles("header", "Header"),
  ...componentFiles("hero"),
  ...componentFiles("index-grid"),
  ...componentFiles("message"),
  ...componentFiles("pagination"),
  ...componentFiles("phase-banner"),
  ...componentFiles("picture", "Picture"),
  ...componentFiles("profile"),
  ...componentFiles("sensitive-image", "SensitiveImage"),
  ...componentFiles("skip-link", "SkipLink"),
  ...componentFiles("tabs", "Tabs"),
  // Tools
  "nationalarchives/tools/_index.scss",
  "nationalarchives/tools/_grid.scss",
  "nationalarchives/tools/_media.scss",
  "nationalarchives/tools/_typography.scss",
  // Utilities
  "nationalarchives/utilities/_index.scss",
  "nationalarchives/utilities/_global.scss",
  "nationalarchives/utilities/_typography.scss",
  // Variables
  "nationalarchives/variables/_index.scss",
  "nationalarchives/variables/_colour.scss",
  "nationalarchives/variables/_grid.scss",
  "nationalarchives/variables/_media.scss",
  "nationalarchives/variables/_typography.scss",
  // Templates
  "nationalarchives/templates/homepage.njk",
  "nationalarchives/templates/search-results.njk",
  "nationalarchives/templates/layouts/_generic.njk",
];

console.log(`Testing package file structure`);
checkExists.forEach((checkFile) => {
  const checkFilePath = `${packageDirectory}/${checkFile}`;
  try {
    fs.accessSync(checkFilePath);
    console.log(
      `  🟢 [PASS] ${
        fs.lstatSync(checkFilePath).isDirectory() ? "Directory" : "File"
      } exists: ${checkFilePath.replace(/\/$/, "")}`,
    );
  } catch (err) {
    console.error(`  🔴 [FAIL] ${err}`);
    process.exit();
  }
});

console.log("\n");

console.log(`Testing package version`);
const compiledPackageJson = require("../package/package.json");
if (packageJson.version === compiledPackageJson.version) {
  console.log(
    `  🟢 [PASS] Version ${packageJson.version} is set in the package`,
  );
} else {
  console.error(
    `  🔴 [FAIL] The package version should be ${packageJson.version} but is ${compiledPackageJson.version}`,
  );
  process.exit();
}

console.log("\n");

console.log(`Testing prototype kit config`);
const expectedPrototypeKitConfigProperties = [
  "nunjucksPaths",
  "scripts",
  "assets",
  "sass",
  "templates",
];
const prototypeKitConfig = require(
  `../${packageDirectory}/govuk-prototype-kit.config.json`,
);
expectedPrototypeKitConfigProperties.forEach(
  (expectedPrototypeKitConfigProperty) => {
    if (
      Object.keys(prototypeKitConfig).includes(
        expectedPrototypeKitConfigProperty,
      )
    ) {
      console.log(
        `  🟢 [PASS] Prototype kit config contains: ${expectedPrototypeKitConfigProperty}`,
      );
    } else {
      console.error(
        `  🔴 [FAIL] Prototype kit config is missing: ${expectedPrototypeKitConfigProperty}`,
      );
      process.exit();
    }
  },
);

console.log("\n");

console.log(`Testing compiled JavaScript files`);
const { JSDOM } = jsdom;
const { window } = new JSDOM(``);
global.window = window;
global.document = window.document;
const jsAllPackage = require("../package/nationalarchives/all.js");
if (
  Object.keys(jsAllPackage).includes("initAll") &&
  typeof jsAllPackage.initAll === "function"
) {
  console.log(`  🟢 [PASS] all.js function exists: initAll()`);
} else {
  console.error(`  🔴 [FAIL] all.js function missing: initAll()`);
  process.exit();
}
if (
  Object.keys(jsAllPackage).includes("Cookies") &&
  typeof jsAllPackage.Cookies === "function"
) {
  console.log(`  🟢 [PASS] all.js class exists: Cookies`);
} else {
  console.error(`  🔴 [FAIL] all.js class missing: Cookies`);
  process.exit();
}
Object.keys(componentsWithJavaScript).forEach((component) => {
  const componentClass = componentsWithJavaScript[component];
  if (
    Object.keys(jsAllPackage).includes(componentClass) &&
    typeof jsAllPackage[componentClass] === "function"
  ) {
    console.log(`  🟢 [PASS] all.js function exists: ${componentClass}()`);
  } else {
    console.error(`  🔴 [FAIL] all.js function missing: ${componentClass}()`);
    process.exit();
  }
});
Object.keys(componentsWithJavaScript).forEach((component) => {
  const componentClass = componentsWithJavaScript[component];
  const jsComponentPackage = require(
    `../package/nationalarchives/components/${component}/${component}.js`,
  );
  if (
    Object.keys(jsComponentPackage).includes(componentClass) &&
    typeof jsComponentPackage[componentClass] === "function"
  ) {
    console.log(
      `  🟢 [PASS] ${component}.js function exists: ${componentClass}()`,
    );
  } else {
    console.error(
      `  🔴 [FAIL] ${component}.js function missing: ${componentClass}()`,
    );
    process.exit();
  }
});

console.log("\n");

// TODO: Test CSS for contents
