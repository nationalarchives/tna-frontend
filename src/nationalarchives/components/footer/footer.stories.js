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
  meta: "<p>Open today<br>09:00&mdash;19:00</p>",
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
  classes: "tna-footer--demo",
};

export const Minimal = Template.bind({});
Minimal.args = {
  classes: "tna-footer--demo",
};
