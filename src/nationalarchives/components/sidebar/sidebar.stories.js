import Sidebar from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l"] },
  items: { control: "object" },
  type: { control: "radio", options: ["contents", "sections", "pages"] },
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
  headingSize,
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
      headingSize,
      items,
      type,
      sticky,
      classes,
      attributes,
    },
  });

export const Contents = Template.bind({});
Contents.args = {
  headingLevel: 2,
  heading: "Contents",
  items: [
    {
      text: "Accessibility statement",
      href: "#",
    },
    {
      text: "Feedback and contact information",
      href: "#",
    },
    {
      text: "Enforcement procedure",
      href: "#",
    },
    {
      text: "Compliance status",
      href: "#",
    },
    {
      text: "Non-accessible content",
      href: "#",
      children: [
        {
          text: "Non-compliance with the accessibility regulations",
          href: "#",
        },
        {
          text: "Disproportionate burden",
          href: "#",
        },
        {
          text: "Content that’s not within the scope of the accessibility regulations",
          href: "#",
        },
      ],
    },
    {
      text: "Other identified and tracked accessibility concerns",
      href: "#",
    },
    {
      text: "Testing our products for accessibility",
      href: "#",
    },
    {
      text: "How the National Archives Design System team makes their websites accessible",
      href: "#",
    },
    {
      text: "Preparation of this accessibility statement",
      href: "#",
    },
  ],
  type: "contents",
  classes: "tna-sidebar--demo",
};

export const Sections = Template.bind({});
Sections.args = {
  heading: "On this page",
  headingLevel: 2,
  items: [
    {
      text: "A band of guerrillas",
      href: "#",
      current: true,
    },
    {
      text: "War begins",
      href: "#",
    },
    {
      text: "Forming the ERC",
      href: "#",
    },
    {
      text: "The fall of Hong Kong",
      href: "#",
    },
    {
      text: "The ERC's guerrilla activities",
      href: "#",
    },
    {
      text: "Chan Chak’s escape",
      href: "#",
    },
    {
      text: "Francis Lee and Lieutenant Colonel Ride",
      href: "#",
    },
    {
      text: "Raymond Wong's recommendation",
      href: "#",
    },
    {
      text: "Co-operation between the ERC and BAAG",
      href: "#",
    },
    {
      text: "The ERC's legacy",
      href: "#",
    },
    {
      text: "Exhibition",
      href: "#",
    },
  ],
  type: "sections",
  classes: "tna-sidebar--demo",
};

export const Pages = Template.bind({});
Pages.args = {
  heading: "Components",
  headingLevel: 2,
  items: [
    {
      text: "Accordion",
      href: "#",
    },
    {
      text: "Breadcrumbs",
      href: "#",
    },
    {
      text: "Button",
      href: "#",
      current: true,
      children: [
        {
          text: "Status",
          href: "#",
        },
        {
          text: "Icons",
          href: "#",
        },
        {
          text: "Button groups",
          href: "#",
        },
      ],
    },
    {
      text: "Card",
      href: "#",
    },
    {
      text: "Checkboxes",
      href: "#",
    },
    {
      text: "Compound filters",
      href: "#",
    },
    {
      text: "Cookie banner",
      href: "#",
    },
    {
      text: "Date input",
      href: "#",
    },
    {
      text: "Date search",
      href: "#",
    },
    {
      text: "Details",
      href: "#",
    },
  ],
  type: "pages",
  classes: "tna-sidebar--demo",
};
