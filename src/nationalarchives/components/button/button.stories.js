import Button from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Button",
  argTypes: Object.fromEntries(
    Object.entries({
      text: { control: "text" },
      html: { control: "text" },
      href: { control: "text" },
      title: { control: "text" },
      icon: { control: "text" },
      iconSvg: { control: "text" },
      accent: { control: "boolean" },
      small: { control: "boolean" },
      plain: { control: "boolean" },
      iconOnly: { control: "boolean" },
      iconOnlyOnMobile: { control: "boolean" },
      rightAlignIcon: { control: "boolean" },
      buttonElement: { control: "boolean" },
      buttonType: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Button, { params });
  },
};

export const Standard = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Button",
    href: "#",
    classes: "tna-button--demo",
  },
};

export const Accent = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Button",
    href: "#",
    accent: true,
    classes: "tna-button--demo",
  },
};

export const Icon = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Explore the collection",
    href: "#",
    icon: "map-location-dot",
    classes: "tna-button--demo",
  },
};

export const RightAlignedIcon = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Search",
    href: "#",
    icon: "chevron-right",
    rightAlignIcon: true,
    classes: "tna-button--demo",
  },
};

export const IconOnly = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Show as a list",
    href: "#",
    icon: "list",
    iconOnly: true,
    classes: "tna-button--demo",
  },
};

export const Small = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Small button",
    href: "#",
    small: true,
    classes: "tna-button--demo",
  },
};

export const SmallWithIcon = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Explore the collection",
    href: "#",
    icon: "map-location-dot",
    small: true,
    classes: "tna-button--demo",
  },
};

export const SmallIconOnly = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Explore the collection",
    href: "#",
    icon: "map-location-dot",
    small: true,
    iconOnly: true,
    classes: "tna-button--demo",
  },
};

export const Plain = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Plain button",
    href: "#",
    plain: true,
    classes: "tna-button--demo",
  },
};

export const SmallPlain = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Plain small button",
    href: "#",
    small: true,
    plain: true,
    classes: "tna-button--demo",
  },
};

export const SmallPlainIcon = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Plain small button",
    href: "#",
    icon: "map-location-dot",
    small: true,
    plain: true,
    classes: "tna-button--demo",
  },
};

export const ButtonElement = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Button element",
    href: "#",
    buttonElement: true,
    classes: "tna-button--demo",
  },
};
