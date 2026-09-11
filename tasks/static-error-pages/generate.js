import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderNunjucks } from "../lib/nunjucks.js";
import packageJson from "../../package.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputDirectory = "error-pages";
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const errorPageNunjucks = fs.readFileSync(
  path.join(__dirname, "template.njk"),
  "utf8",
);
const compiledCSS = fs
  .readFileSync("package/nationalarchives/error-page.css", "utf8")
  .replace("/*# sourceMappingURL=all.css.map */", "");
const compiledCSSIE = fs
  .readFileSync("package/nationalarchives/ie.css", "utf8")
  .replace("/*# sourceMappingURL=ie.css.map */", "");

[
  {
    name: "page-not-found",
    pageTitle: "Page not found",
    body: `<p>If you typed the web address, check it is correct.</p>
<p>If you pasted the web address, check you copied the entire address.</p>
<p>If the web address is correct or you selected a link or button, <a href="https://www.nationalarchives.gov.uk/contact-us/">contact us</a> to let us help.</p>`,
  },
  {
    name: "restricted",
    pageTitle: "Restricted",
    body: `<p>You are not permitted to view this content.</p>
<p>If you typed the web address, check it is correct.</p>
<p>If you pasted the web address, check you copied the entire address.</p>
<p>If you believe you should be able to view this content, <a href="https://www.nationalarchives.gov.uk/contact-us/">contact us</a> to request access.</p>`,
  },
  {
    name: "service-issue",
    pageTitle: "There is a problem with the service",
    body: `<p>Try again in a few minutes.</p>
<p>If the web address is correct or you selected a link or button, <a href="https://www.nationalarchives.gov.uk/contact-us/">contact us</a> to let us help.</p>`,
  },
  {
    name: "rate-limited",
    pageTitle: "Too many requests",
    body: `<p>You have requested too many resources in a set timeframe.</p>
<p>Try again in a few minutes.</p>`,
  },
].forEach((errorPage) => {
  const { name, ...params } = errorPage;
  const html = renderNunjucks(errorPageNunjucks, {
    ...params,
    tna_frontend_version: packageJson.version,
  })
    .replace("/* COMPILED_CSS */", compiledCSS)
    .replace("/* COMPILED_CSS_IE */", compiledCSSIE);
  fs.writeFile(`${outputDirectory}/${errorPage.name}.html`, html, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});
