import Footer from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  meta: { control: "text" },
  social: { control: "object" },
  navigation: { control: "object" },
  showNewsletter: { control: "boolean" },
  legal: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Footer",
  argTypes,
};

const Template = ({
  meta,
  social,
  navigation,
  showNewsletter,
  legal,
  classes,
  attributes,
}) =>
  Footer({
    params: {
      meta,
      social,
      navigation,
      showNewsletter,
      legal,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  social: [
    {
      href: "https://twitter.com/UKNatArchives",
      icon: "twitter",
      title: "The National Archives X feed (formally known as Twitter)",
    },
    {
      href: "https://www.youtube.com/c/TheNationalArchivesUK",
      icon: "youtube",
      title: "The National Archives YouTube channel",
    },
    {
      href: "https://www.facebook.com/TheNationalArchives",
      icon: "facebook",
      title: "The National Archives Facebook page",
    },
    {
      href: "https://www.flickr.com/photos/nationalarchives",
      icon: "flickr",
      title: "The National Archives Flickr feed",
    },
    {
      href: "https://www.instagram.com/nationalarchivesuk/",
      icon: "instagram",
      title: "The National Archives Instagram feed",
    },
    {
      href: "https://www.tiktok.com/@uknatarchives",
      icon: "tiktok",
      title: "The National Archives TikTok feed",
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
          text: "Podcasts",
          href: "https://media.nationalarchives.gov.uk/index.php/category/podcasts-2/",
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
        { text: "Legislation.gov.uk", href: "https://www.legislation.gov.uk/" },
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
        {
          text: "Friends of The National Archives",
          href: "https://www.nationalarchives.gov.uk/about/get-involved/friends-of-the-national-archives/",
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
  classes: "tna-footer--demo",
};

export const Minimal = Template.bind({});
Minimal.args = {
  classes: "tna-footer--demo",
};
