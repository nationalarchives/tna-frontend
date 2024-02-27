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
        {
          text: "Visit",
          href: "https://www.nationalarchives.gov.uk/about/visit-us/",
        },
        {
          text: "What's on",
          href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
        },
        {
          text: "Explore the collection",
          href: "https://beta.nationalarchives.gov.uk/explore-the-collection/",
        },
        {
          text: "Using the archives",
          href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
        },
        {
          text: "Learn",
          href: "https://www.nationalarchives.gov.uk/education/",
        },
        {
          text: "Professional guidance & services",
          href: "https://www.nationalarchives.gov.uk/information-management/",
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
              href: "https://www.nationalarchives.gov.uk/about/our-role/",
            },
            {
              text: "Our history",
              href: "https://www.nationalarchives.gov.uk/about/our-role/what-we-do/our-history/",
            },
            {
              text: "Our people",
              href: "https://www.nationalarchives.gov.uk/about/jobs/staff-profiles/",
            },
            {
              text: "News",
              href: "https://www.nationalarchives.gov.uk/about/news/",
            },
            {
              text: "Contact us",
              href: "https://www.nationalarchives.gov.uk/contact-us/",
            },
            {
              text: "Jobs & careers",
              href: "https://www.nationalarchives.gov.uk/about/jobs/",
            },
            {
              text: "Get involved",
              href: "https://www.nationalarchives.gov.uk/about/get-involved/",
            },
          ],
        },
        {
          title: "Our websites help",
          items: [
            {
              text: "UK Government Web Archive",
              href: "https://www.nationalarchives.gov.uk/webarchive/",
              newTab: true,
            },
            {
              text: "Legislation.gov.uk",
              href: "https://www.legislation.gov.uk/",
              newTab: true,
            },
            {
              text: "Find case law",
              href: "https://caselaw.nationalarchives.gov.uk/",
              newTab: true,
            },
            {
              text: "The Gazette",
              href: "https://www.thegazette.co.uk/",
              newTab: true,
            },
          ],
        },
        {
          title: "Quick links",
          items: [
            {
              text: "Press room",
              href: "https://www.nationalarchives.gov.uk/about/press-room/",
            },
            {
              text: "Venue hire",
              href: "https://www.nationalarchives.gov.uk/about/visit-us/venue-hire/",
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
