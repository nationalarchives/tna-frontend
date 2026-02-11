import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

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
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  render: (params) => {
    return nunjucks.renderString(Template, { params });
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
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="24" aria-hidden="true" focusable="false"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>',
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
