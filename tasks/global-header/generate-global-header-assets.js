var fs = require("fs");
const nunjucks = require("nunjucks");

require.extensions[".njk"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

nunjucks.configure(__dirname + "/../../src");

const globalHeaderComponentNunjucks = require("../../src/nationalarchives/components/global-header/template.njk");

const globalHeaderHTML = nunjucks
  .renderString(globalHeaderComponentNunjucks, {
    params: {
      logo: {
        href: "https://nationalarchives.gov.uk/",
      },
      topNavigation: [
        {
          text: "Search",
          href: "#/search",
          icon: "search",
        },
        {
          text: "Shop",
          href: "https://shop.nationalarchives.gov.uk/",
          icon: "shop",
        },
        // {
        //   text: "Sign in",
        //   href: "#/sign-in",
        //   icon: "user",
        // },
      ],
      navigation: [
        { text: "Visit", href: "www.nationalarchives.gov.uk/about/visit-us/" },
        {
          text: "What's on",
          href: "www.nationalarchives.gov.uk/about/visit-us/whats-on/",
        },
        {
          text: "Explore the collection",
          href: "https://beta.nationalarchives.gov.uk/explore-the-collection/",
        },
        {
          text: "Using the archive",
          href: "www.nationalarchives.gov.uk/help-with-your-research/",
        },
        { text: "Learn", href: "www.nationalarchives.gov.uk/education/" },
        {
          text: "Professional guidance and services",
          href: "www.nationalarchives.gov.uk/professional-guidance-and-services/",
        },
      ],
    },
  })
  .trim()
  .replace(/ " /g, '" ');

const footerComponentNunjucks = require("../../src/nationalarchives/components/footer/template.njk");

const footerHTML = nunjucks
  .renderString(footerComponentNunjucks, {
    params: {
      social: [
        {
          href: "https://twitter.com/UKNatArchives",
          icon: "twitter",
          title: "Visit us on Twitter",
        },
        {
          href: "https://www.youtube.com/c/TheNationalArchivesUK",
          icon: "youtube",
          title: "Watch us on YouTube",
        },
        {
          href: "https://www.facebook.com/TheNationalArchives",
          icon: "facebook",
          title: "See us on Facebook",
        },
        {
          href: "https://www.flickr.com/photos/nationalarchives",
          icon: "flickr",
          title: "See our Flickr feed",
        },
        {
          href: "https://www.instagram.com/nationalarchivesuk/",
          icon: "instagram",
          title: "See us on Instagram",
        },
        {
          href: "https://www.nationalarchives.gov.uk/rss/",
          icon: "rss",
          title: "Read our RSS feed",
        },
      ],
      navigation: [
        {
          title: "Quick links",
          items: [
            {
              text: "About us",
              href: "https://www.nationalarchives.gov.uk/about/",
            },
            {
              text: "Contact us",
              href: "https://www.nationalarchives.gov.uk/contact-us/",
            },
            {
              text: "News",
              href: "https://www.nationalarchives.gov.uk/about/news/",
            },
            {
              text: "Blog",
              href: "https://blog.nationalarchives.gov.uk/",
            },
            {
              text: "Podcasts and videos",
              href: "https://media.nationalarchives.gov.uk/",
            },
            {
              text: "Image library",
              href: "https://images.nationalarchives.gov.uk/",
            },
            {
              text: "Press room",
              href: "https://www.nationalarchives.gov.uk/about/press-room/",
            },
            {
              text: "Jobs and careers",
              href: "https://www.nationalarchives.gov.uk/about/jobs/",
            },
            {
              text: "British citizenship services",
              href: "https://www.nationalarchives.gov.uk/contact-us/british-citizenship-services/",
            },
            {
              text: "Historical Manuscripts Commission",
              href: "https://www.nationalarchives.gov.uk/archives-sector/our-archives-sector-role/historical-manuscripts-commission/",
            },
          ],
        },
        {
          title: "Our other websites",
          items: [
            {
              text: "UK Government Web Archive",
              href: "https://www.nationalarchives.gov.uk/webarchive/",
            },
            {
              text: "Legislation.gov.uk",
              href: "https://www.legislation.gov.uk/",
            },
            {
              text: "Find case law",
              href: "https://caselaw.nationalarchives.gov.uk/",
            },
            {
              text: "The Gazette",
              href: "https://www.thegazette.co.uk/",
              newTab: true,
            },
            {
              text: "The National Archives Trust",
              href: "https://www.nationalarchives.gov.uk/about/the-national-archives-trust/",
            },
          ],
        },
      ],
      showNewsletter: true,
      legal: [
        {
          text: "Accessibility statement",
          href: "#/accessibility",
        },
        {
          text: "Freedom of information",
          href: "#/freedom-of-information",
        },
        {
          text: "Terms and conditions",
          href: "#/terms-and-conditions",
        },
        {
          text: "Privacy policy",
          href: "#/privacy",
        },
        {
          text: "Cookies",
          href: "#/cookies",
        },
      ],
    },
  })
  .trim()
  .replace(/ " /g, '" ');

fs.readFile(
  "src/nationalarchives/components/global-header/README.md",
  "utf8",
  (err, data) => {
    if (err) throw err;
    const newReadme = data
      .replace("<!-- GLOBALHEADERHTML -->", globalHeaderHTML)
      .replace("<!-- FOOTERHTML -->", footerHTML);
    fs.writeFile("package-global-header/README.md", newReadme, (err) => {
      if (err) throw err;
    });
  },
);

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) throw err;
  const json = JSON.parse(data);
  const { version, repository, author, license, bugs } = json;
  const newJson = {
    name: "@nationalarchives/frontend-global-header",
    version,
    description: "The National Archives frontend cookie banner",
    repository,
    author,
    license,
    bugs,
    homepage: "https://github.com/nationalarchives/tna-frontend/wiki/Cookies",
    scripts: {},
  };
  fs.writeFile(
    "package-global-header/package.json",
    JSON.stringify(newJson, null, 2),
    (err) => {
      if (err) throw err;
    },
  );
});
