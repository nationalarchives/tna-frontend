import Sidebar from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  items: { control: "object" },
  type: { control: "radio", options: ["headings", "top-headings", "pages"] },
  sticky: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Sidebar",
  argTypes,
};

const Template = ({
  heading,
  headingLevel,
  items,
  type,
  sticky,
  classes,
  attributes,
}) =>
  Sidebar({
    params: {
      heading,
      headingLevel,
      items,
      type,
      sticky,
      classes,
      attributes,
    },
  });

export const Headings = Template.bind({});
Headings.args = {
  headingLevel: 2,
  items: [
    {
      text: "Alpha",
      href: "#",
    },
    {
      text: "Beta",
      href: "#",
      current: true,
    },
    {
      text: "Gamma",
      href: "#",
    },
    {
      text: "Delta",
      href: "#",
      children: [
        {
          text: "Alpha",
          href: "#",
        },
        {
          text: "Beta",
          href: "#",
        },
        {
          text: "Gamma",
          href: "#",
        },
      ],
    },
    {
      text: "Epsilon",
      href: "#",
    },
    {
      text: "Zeta",
      href: "#",
    },
    {
      text: "Eta",
      href: "#",
    },
    {
      text: "Theta",
      href: "#",
    },
  ],
  type: "headings",
  classes: "tna-sidebar--demo",
};

export const TopHeadings = Template.bind({});
TopHeadings.args = {
  headingLevel: 2,
  items: [
    {
      text: "Alpha",
      href: "#",
      current: true,
    },
    {
      text: "Beta",
      href: "#",
    },
    {
      text: "Gamma",
      href: "#",
    },
    {
      text: "Delta",
      href: "#",
      children: [
        {
          text: "Alpha",
          href: "#",
        },
        {
          text: "Beta",
          href: "#",
        },
        {
          text: "Gamma",
          href: "#",
        },
      ],
    },
    {
      text: "Epsilon",
      href: "#",
    },
    {
      text: "Zeta",
      href: "#",
    },
    {
      text: "Eta",
      href: "#",
    },
    {
      text: "Theta",
      href: "#",
    },
  ],
  type: "top-headings",
  classes: "tna-sidebar--demo",
};

export const Pages = Template.bind({});
Pages.args = {
  heading: "Related pages",
  headingLevel: 2,
  items: [
    {
      text: "Alpha",
      href: "#",
    },
    {
      text: "Beta",
      href: "#",
    },
    {
      text: "Gamma",
      href: "#",
    },
    {
      text: "Delta",
      href: "#",
      current: true,
      children: [
        {
          text: "Alpha",
          href: "#",
        },
        {
          text: "Beta",
          href: "#",
        },
        {
          text: "Gamma",
          href: "#",
        },
      ],
    },
    {
      text: "Epsilon",
      href: "#",
    },
    {
      text: "Zeta",
      href: "#",
    },
    {
      text: "Eta",
      href: "#",
    },
    {
      text: "Theta",
      href: "#",
    },
  ],
  type: "pages",
  classes: "tna-sidebar--demo",
};
