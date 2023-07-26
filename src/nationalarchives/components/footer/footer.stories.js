import Footer from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  address: { control: "text" },
  navigation: { control: "object" },
  social: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Work in progress/Components/Footer",
  argTypes,
};

const Template = ({
  title,
  address,
  navigation,
  social,
  classes,
  attributes,
}) => {
  return Footer({
    params: {
      title,
      address,
      navigation,
      social,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  title: "The National Archives",
  address: "Kew, Richmond TW9 4DU",
  navigation: [
    {
      title: "Find out more",
      items: [
        {
          text: "Contact us",
          href: "#",
        },
        {
          text: "Press room",
          href: "#",
        },
        {
          text: "Jobs and careers",
          href: "#",
        },
        {
          text: "Friends of The National Archives",
          href: "#",
        },
      ],
    },
    {
      title: "Site help",
      items: [
        {
          text: "Help",
          href: "#",
        },
        {
          text: "Website A-Z index",
          href: "#",
        },
        {
          text: "Accessibility",
          href: "#",
        },
      ],
    },
    {
      title: "Websites",
      items: [
        {
          text: "Blog",
          href: "#",
        },
        {
          text: "Podcasts and videos",
          href: "#",
        },
        {
          text: "Shop",
          href: "#",
        },
        {
          text: "Image library",
          href: "#",
        },
        {
          text: "UK Government Web Archive",
          href: "#",
        },
        {
          text: "Legislation.gov.uk",
          href: "#",
        },
        {
          text: "Find case law",
          href: "#",
        },
        {
          text: "The Gazette",
          href: "#",
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          text: "Terms of use",
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
        {
          text: "Freedom of Information",
          href: "#",
        },
        {
          text: "Transparency",
          href: "#",
        },
        {
          text: "Our fees",
          href: "#",
        },
      ],
    },
  ],
  social: [
    {
      text: "Twitter",
      href: "#",
      image: "/images/footer/twitter.svg",
    },
    {
      text: "YouTube",
      href: "#",
      image: "/images/footer/youtube.svg",
    },
    {
      text: "Flickr",
      href: "#",
      image: "/images/footer/flickr.svg",
    },
    {
      text: "Facebook",
      href: "#",
      image: "/images/footer/facebook.svg",
    },
    {
      text: "Instagram",
      href: "#",
      image: "/images/footer/instagram.svg",
    },
    {
      text: "RSS",
      href: "#",
      image: "/images/footer/rss.svg",
    },
  ],
  classes: "tna-footer--demo",
};
