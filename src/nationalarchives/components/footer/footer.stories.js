import Footer from "./template.njk";
import "../../all.scss";
import "./_footer.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  navigation: { control: "object" },
  social: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "text" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Components/Footer",
  argTypes,
};

const Template = ({ navigation, social, classes, attributes }) => {
  return Footer({
    params: {
      navigation,
      social,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
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
          text: "Legislation.gov.ukOpens a new window",
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
    },
    {
      text: "YouTube",
      href: "#",
    },
    {
      text: "Flickr",
      href: "#",
    },
    {
      text: "Facebook",
      href: "#",
    },
    {
      text: "Instagram",
      href: "#",
    },
    {
      text: "RSS",
      href: "#",
    },
  ],
  classes: "tna-footer--demo",
};
