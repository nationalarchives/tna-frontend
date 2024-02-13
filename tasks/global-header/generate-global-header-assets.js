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
        href: "#/",
      },
      topNavigation: [
        {
          text: "Search",
          href: "#/search",
          icon: "search",
        },
        {
          text: "Shop",
          href: "#/shop",
          icon: "bag-shopping",
        },
        // {
        //   text: "Sign in",
        //   href: "#/sign-in",
        //   icon: "user",
        // },
      ],
      navigation: [
        {
          text: "Visit",
          href: "#/visit",
        },
        {
          text: "What's on",
          href: "#/whats-on",
        },
        {
          text: "Explore the collection",
          href: "#/explore-the-collection",
        },
        {
          text: "Using the archives",
          href: "#/using-the-archives",
        },
        {
          text: "Learn",
          href: "#/learn",
        },
        {
          text: "Professional guidance & services",
          href: "#/professional-guidance-and-services",
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
      meta: "<p>Open today<br />09:00&mdash;19:00</p>",
      social: [
        {
          text: "Twitter",
          href: "https://twitter.com/UKNatArchives",
          brandIcon: "twitter",
        },
        {
          text: "YouTube",
          href: "https://www.youtube.com/c/TheNationalArchivesUK",
          brandIcon: "youtube",
        },
        {
          text: "Facebook",
          href: "https://www.facebook.com/TheNationalArchives",
          brandIcon: "facebook",
        },
        {
          text: "Flickr",
          href: "https://www.flickr.com/photos/nationalarchives",
          brandIcon: "flickr",
        },
        {
          text: "Instagram",
          href: "https://www.instagram.com/nationalarchivesuk/",
          brandIcon: "instagram",
        },
        {
          text: "RSS",
          href: "https://www.nationalarchives.gov.uk/rss/",
          icon: "rss",
        },
      ],
      navigation: [
        {
          title: "About us",
          items: [
            {
              text: "Our role",
              href: "#",
            },
            {
              text: "Our history",
              href: "#",
            },
            {
              text: "Our collection",
              href: "#",
            },
            {
              text: "Our people",
              href: "#",
            },
            {
              text: "How we are run",
              href: "#",
            },
            {
              text: "Our research and academic collaboration",
              href: "#",
            },
            {
              text: "News",
              href: "#",
            },
            {
              text: "Contact us",
              href: "#",
            },
            {
              text: "Jobs & careers",
              href: "#",
            },
            {
              text: "Get involved",
              href: "#",
            },
          ],
        },
        {
          title: "Our websites help",
          items: [
            {
              text: "UK Government Web Archive",
              href: "#",
              newTab: true,
            },
            {
              text: "Legislation.gov.uk",
              href: "#",
              newTab: true,
            },
            {
              text: "Find case law",
              href: "#",
              newTab: true,
            },
            {
              text: "The Gazette",
              href: "#",
              newTab: true,
            },
          ],
        },
        {
          title: "Quick links",
          items: [
            {
              text: "Press room",
              href: "#",
            },
            {
              text: "Venue hire",
              href: "#",
            },
          ],
        },
      ],
      showNewsletter: true,
      legal: [
        {
          text: "Accessibility statement",
          href: "#",
        },
        {
          text: "Freedom of information",
          href: "#",
        },
        {
          text: "Terms and conditions",
          href: "#",
        },
        {
          text: "Privacy policy",
          href: "#",
        },
        {
          text: "Cookies",
          href: "#",
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
