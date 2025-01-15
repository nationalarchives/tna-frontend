import SecondaryNavigation from "./template.njk";
import macroOptions from "./macro-options.json";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  items: { control: "object" },
  noBottomBorder: { control: "boolean" },
  overflow: { control: "boolean" },
  noUnindentation: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Secondary navigation",
  argTypes,
};

const Template = ({
  title,
  headingLevel,
  items,
  noBottomBorder,
  overflow,
  noUnindentation,
  classes,
  attributes,
}) =>
  `<div class="tna-container"><div class="tna-column tna-column--full">${SecondaryNavigation(
    {
      params: {
        title,
        headingLevel,
        items,
        noBottomBorder,
        overflow,
        noUnindentation,
        classes,
        attributes,
      },
    },
  )}</div></div>`;

export const Default = Template.bind({});
Default.args = {
  title: "Our plans",
  headingLevel: 2,
  items: [
    {
      name: "Alpha",
      href: "#",
    },
    {
      name: "Beta",
      href: "#",
      current: true,
    },
    {
      name: "Gamma",
      href: "#",
    },
    {
      name: "Delta",
      href: "#",
    },
  ],
};

export const Medium = Template.bind({});
Medium.parameters = {
  viewport: {
    defaultViewport: "medium",
  },
  chromatic: {
    viewports: [customViewports["medium"].styles.width.replace(/px$/, "")],
  },
};
Medium.args = { ...Default.args };

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: "small",
  },
  chromatic: {
    viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
  },
};
Mobile.args = { ...Default.args };
