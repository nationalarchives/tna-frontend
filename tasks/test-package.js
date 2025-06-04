const fs = require("fs");
const packageJson = require("../package.json");
const jsdom = require("jsdom");
const { pass, fail } = require("./lib/passfail");
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
  "nationalarchives/all+analytics.js",
  "nationalarchives/all+analytics.js.map",
  "nationalarchives/all+analytics.mjs",
  "nationalarchives/analytics.js",
  "nationalarchives/analytics.js.map",
  "nationalarchives/analytics.mjs",
  "nationalarchives/font-awesome.css",
  "nationalarchives/font-awesome.css.map",
  "nationalarchives/font-awesome.scss",
  "nationalarchives/ie.css",
  "nationalarchives/ie.css.map",
  "nationalarchives/ie.scss",
  "nationalarchives/print.css",
  "nationalarchives/print.css.map",
  "nationalarchives/prototype-kit.css",
  "nationalarchives/prototype-kit.css.map",
  "nationalarchives/prototype-kit.scss",
  // Assets
  "nationalarchives/assets/fonts/fa-brands-400.ttf",
  "nationalarchives/assets/fonts/fa-brands-400.woff2",
  "nationalarchives/assets/fonts/fa-solid-900.ttf",
  "nationalarchives/assets/fonts/fa-solid-900.woff2",
  "nationalarchives/assets/fonts/OpenSans-Bold.ttf",
  "nationalarchives/assets/fonts/OpenSans-Regular.ttf",
  "nationalarchives/assets/fonts/RobotoMono-Medium.ttf",
  "nationalarchives/assets/fonts/RobotoMono-Regular.ttf",
  "nationalarchives/assets/images/icon-48x48.png",
  "nationalarchives/assets/images/icon-72x72.png",
  "nationalarchives/assets/images/icon-96x96.png",
  "nationalarchives/assets/images/icon-120x120.png",
  "nationalarchives/assets/images/icon-144x144.png",
  "nationalarchives/assets/images/icon-152x152.png",
  "nationalarchives/assets/images/icon-167x167.png",
  "nationalarchives/assets/images/icon-180x180.png",
  "nationalarchives/assets/images/icon-192x192.png",
  "nationalarchives/assets/images/icon-256x256.png",
  "nationalarchives/assets/images/icon-512x512.png",
  "nationalarchives/assets/images/icon-1024x1024.png",
  "nationalarchives/assets/images/favicon.ico",
  "nationalarchives/assets/images/mask-icon.svg",
  "nationalarchives/assets/images/mstile-150x150.png",
  "nationalarchives/assets/images/nationalarchives-opengraph-image.png",
  "nationalarchives/assets/images/tna-square-logo.svg",
  // Components
  ...componentFiles("accordion", "Accordion"),
  ...componentFiles("breadcrumbs", "Breadcrumbs"),
  ...componentFiles("button"),
  ...componentFiles("card"),
  ...componentFiles("checkboxes"),
  ...componentFiles("compound-filters"),
  ...componentFiles("cookie-banner", "CookieBanner"),
  ...componentFiles("date-input", "DateInput"),
  ...componentFiles("date-search"),
  ...componentFiles("details"),
  ...componentFiles("error-summary", "ErrorSummary"),
  ...componentFiles("files-list"),
  ...componentFiles("footer", "Footer"),
  ...componentFiles("gallery", "Gallery"),
  ...componentFiles("global-header", "GlobalHeader"),
  ...componentFiles("header", "Header"),
  ...componentFiles("hero"),
  ...componentFiles("index-grid"),
  ...componentFiles("pagination"),
  ...componentFiles("phase-banner"),
  ...componentFiles("picture", "Picture"),
  ...componentFiles("quick-filters"),
  ...componentFiles("radios"),
  ...componentFiles("search-field"),
  ...componentFiles("secondary-navigation"),
  ...componentFiles("select"),
  ...componentFiles("sidebar"),
  ...componentFiles("skip-link", "SkipLink"),
  ...componentFiles("tabs", "Tabs"),
  ...componentFiles("text-input", "TextInput"),
  ...componentFiles("textarea"),
  ...componentFiles("warning"),
  // Tools
  "nationalarchives/tools/_a11y.scss",
  "nationalarchives/tools/_colour.scss",
  "nationalarchives/tools/_grid.scss",
  "nationalarchives/tools/_index.scss",
  "nationalarchives/tools/_media.scss",
  "nationalarchives/tools/_spacing.scss",
  "nationalarchives/tools/_typography.scss",
  // Utilities
  "nationalarchives/utilities/_a11y.scss",
  "nationalarchives/utilities/_animations.scss",
  "nationalarchives/utilities/_areas.scss",
  "nationalarchives/utilities/colour/_index.scss",
  "nationalarchives/utilities/_columns.scss",
  "nationalarchives/utilities/_debug.scss",
  "nationalarchives/utilities/forms/_index.scss",
  "nationalarchives/utilities/_global.scss",
  "nationalarchives/utilities/grid/_index.scss",
  "nationalarchives/utilities/grid/fixtures.json",
  "nationalarchives/utilities/grid/macro-options.json",
  "nationalarchives/utilities/grid/macro.njk",
  "nationalarchives/utilities/grid/template.njk",
  "nationalarchives/utilities/_index.scss",
  "nationalarchives/utilities/lists/_index.scss",
  "nationalarchives/utilities/overrides/_index.scss",
  "nationalarchives/utilities/_reset.scss",
  "nationalarchives/utilities/tables/_index.scss",
  "nationalarchives/utilities/typography/_index.scss",
  // Variables
  "nationalarchives/variables/_a11y.scss",
  "nationalarchives/variables/_assets.scss",
  "nationalarchives/variables/_borders.scss",
  "nationalarchives/variables/_colour.scss",
  "nationalarchives/variables/_features.scss",
  "nationalarchives/variables/_forms.scss",
  "nationalarchives/variables/_grid.scss",
  "nationalarchives/variables/_index.scss",
  "nationalarchives/variables/_media.scss",
  "nationalarchives/variables/_spacing.scss",
  "nationalarchives/variables/_typography.scss",
  // Templates
  "nationalarchives/templates/layouts/_generic.njk",
  "nationalarchives/templates/layouts/_prototype-kit.njk",
  "nationalarchives/templates/error-page-not-found.njk",
  "nationalarchives/templates/index-grid.njk",
  "nationalarchives/templates/list.njk",
  "nationalarchives/templates/plain.njk",
  // Config
  "config/.babelrc.json",
  "config/.eslintrc.js",
  "config/.htmlvalidate.json",
  "config/stylelint.config.js",
];

console.log("Testing package file structure...");
checkExists.forEach((checkFile) => {
  const checkFilePath = `${packageDirectory}/${checkFile}`;
  try {
    fs.accessSync(checkFilePath);
    pass(
      `${
        fs.lstatSync(checkFilePath).isDirectory() ? "Directory" : "File"
      } exists: ${checkFilePath.replace(/\/$/, "")}`,
    );
  } catch (err) {
    fail(err);
    process.exitCode = 1;
    throw new Error("File structure test failed");
  }
});

console.log("\n");

console.log("Testing package version...");
const compiledPackageJson = require("../package/package.json");
const compiledPackageLockJson = require("../package/package-lock.json");
if (packageJson.version === compiledPackageJson.version) {
  pass(`Version ${packageJson.version} is set in the package`);
} else {
  fail(
    `The package version should be ${packageJson.version} but is ${compiledPackageJson.version}`,
  );
  process.exitCode = 1;
  throw new Error("Package version test failed");
}
if (compiledPackageLockJson.version === compiledPackageJson.version) {
  pass("The version in package-lock.json matches the version in package.json");
} else {
  fail(
    `The version in package-lock.json should be ${packageJson.version} but is ${compiledPackageLockJson.version}`,
  );
  process.exitCode = 1;
  throw new Error("Package lock version test failed");
}

console.log("\n");

console.log("Testing prototype kit config...");
const expectedPrototypeKitConfigProperties = [
  "nunjucksPaths",
  "scripts",
  "assets",
  "stylesheets",
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
      pass(
        `Prototype kit config contains: ${expectedPrototypeKitConfigProperty}`,
      );
    } else {
      fail(
        `Prototype kit config is missing: ${expectedPrototypeKitConfigProperty}`,
      );
      process.exitCode = 1;
      throw new Error("Prototype kit config test failed");
    }
  },
);

console.log("\n");

console.log("Testing compiled JavaScript files...");
const { JSDOM } = jsdom;
const { window } = new JSDOM(``);
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
global.window = window;
global.document = window.document;
["all.js", "analytics.js", "all+analytics.js"].forEach((file) => {
  const jsAllPackage = require(`../package/nationalarchives/${file}`);
  let exports = [];
  if (file === "all.js" || file === "all+analytics.js") {
    exports = [
      ...exports,
      { name: "initAll", type: "function" },
      { name: "Cookies", type: "function" },
    ];
    Object.keys(componentsWithJavaScript).forEach((component) => {
      const componentClass = componentsWithJavaScript[component];
      if (
        Object.keys(jsAllPackage).includes(componentClass) &&
        typeof jsAllPackage[componentClass] === "function"
      ) {
        pass(`${file} function exists: ${componentClass}()`);
      } else {
        fail(`${file} function missing: ${componentClass}()`);
        process.exitCode = 1;
        throw new Error("Component JavaScript test failed");
      }
    });
  }
  if (file === "analytics.js" || file === "all+analytics.js") {
    exports = [
      ...exports,
      { name: "EventTracker", type: "function" },
      { name: "GA4", type: "function" },
      { name: "helpers", type: "object" },
    ];
  }
  exports.forEach((eachExport) => {
    if (
      Object.keys(jsAllPackage).includes(eachExport.name) &&
      typeof jsAllPackage[eachExport.name] === eachExport.type
    ) {
      pass(
        `${file} ${eachExport.type} exists: ${eachExport.name}${eachExport.type === "function" ? "()" : ""}`,
      );
    } else {
      fail(
        `${file} ${eachExport.type} missing: ${eachExport.name}${eachExport.type === "function" ? "()" : ""}`,
      );
      process.exitCode = 1;
      throw new Error("JavaScript test failed");
    }
  });
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
    pass(`${component}.js function exists: ${componentClass}()`);
  } else {
    fail(`${component}.js function missing: ${componentClass}()`);
    process.exitCode = 1;
    throw new Error("Standalone component JavaScript test failed");
  }
});

console.log("\n");

console.log("Testing compiled CSS files...");
const cssAllPackage = fs
  .readFileSync("package/nationalarchives/all.css")
  .toString();
const checkForClasses = ["tna-template", "tna-template__body"];
checkForClasses.forEach((cssClass) => {
  const escapedClass = cssClass.replace("-", "\\-");
  const regExp = cssAllPackage.match(new RegExp(`.${escapedClass}\{`, "g"));
  if (regExp) {
    pass(
      `${cssClass.replace(/`{$/, "")} selector occurs ${regExp.length} time${
        regExp.length === 1 ? "" : "s"
      } in compiled CSS`,
    );
  } else {
    fail(`${cssClass.replace(/`{$/, "")} selector missing from compiled CSS`);
    process.exitCode = 1;
    throw new Error("CSS test failed");
  }
});

console.log("\n");

console.log("Testing file sizes...");
console.log("\n");
const cssFilesToCheckSize = [
  "all.css",
  "prototype-kit.css",
  "font-awesome.css",
  "print.css",
  "ie.css",
];
const jsFilesToCheckSize = ["all.js", "analytics.js", "all+analytics.js"];
const longestFilenameToCheckSize = [
  ...cssFilesToCheckSize,
  ...jsFilesToCheckSize,
].reduce((longest, file) => (file.length > longest ? file.length : longest), 0);
const testFileSizes = (files) => {
  files.forEach((file) => {
    try {
      const fileStats = fs.statSync(`package/nationalarchives/${file}`);
      console.log(
        `  ${file.padEnd(longestFilenameToCheckSize)}     ${Math.round(fileStats.size / 1000)} KB (${fileStats.size} bytes)`,
      );
    } catch (err) {
      console.error(err);
    }
  });
};
console.log(`  ${"CSS FILE".padEnd(longestFilenameToCheckSize)}     SIZE`);
console.log(`  ${"".padEnd(longestFilenameToCheckSize, "-")}-----------`);
testFileSizes(cssFilesToCheckSize);
console.log("\n");
console.log(`  ${"JS FILE".padEnd(longestFilenameToCheckSize)}     SIZE`);
console.log(`  ${"".padEnd(longestFilenameToCheckSize, "-")}-----------`);
testFileSizes(jsFilesToCheckSize);

console.log("\n");
