import Button from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  title: { control: "text" },
  icon: { control: "text" },
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
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Button",
  argTypes,
};

const Template = ({
  text,
  href,
  title,
  icon,
  accent,
  small,
  plain,
  iconOnly,
  iconOnlyOnMobile,
  rightAlignIcon,
  buttonElement,
  buttonType,
  classes,
  attributes,
}) =>
  Button({
    params: {
      text,
      href,
      title,
      icon,
      accent,
      small,
      plain,
      iconOnly,
      iconOnlyOnMobile,
      rightAlignIcon,
      buttonElement,
      buttonType,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.parameters = {
  chromatic: { disableSnapshot: true },
};
Standard.args = {
  text: "Button",
  href: "#",
  classes: "tna-button--demo",
};

export const Accent = Template.bind({});
Accent.parameters = {
  chromatic: { disableSnapshot: true },
};
Accent.args = {
  text: "Button",
  href: "#",
  accent: true,
  classes: "tna-button--demo",
};

export const Icon = Template.bind({});
Icon.parameters = {
  chromatic: { disableSnapshot: true },
};
Icon.args = {
  text: "Explore the collection",
  href: "#",
  icon: "map-location-dot",
  classes: "tna-button--demo",
};

export const RightAlignedIcon = Template.bind({});
RightAlignedIcon.parameters = {
  chromatic: { disableSnapshot: true },
};
RightAlignedIcon.args = {
  text: "Search",
  href: "#",
  icon: "chevron-right",
  rightAlignIcon: true,
  classes: "tna-button--demo",
};

export const IconOnly = Template.bind({});
IconOnly.parameters = {
  chromatic: { disableSnapshot: true },
};
IconOnly.args = {
  text: "Show as a list",
  href: "#",
  icon: "list",
  iconOnly: true,
  classes: "tna-button--demo",
};

export const Small = Template.bind({});
Small.parameters = {
  chromatic: { disableSnapshot: true },
};
Small.args = {
  text: "Small button",
  href: "#",
  small: true,
  classes: "tna-button--demo",
};

export const SmallWithIcon = Template.bind({});
SmallWithIcon.parameters = {
  chromatic: { disableSnapshot: true },
};
SmallWithIcon.args = {
  text: "Explore the collection",
  href: "#",
  icon: "map-location-dot",
  small: true,
  classes: "tna-button--demo",
};

export const SmallIconOnly = Template.bind({});
SmallIconOnly.parameters = {
  chromatic: { disableSnapshot: true },
};
SmallIconOnly.args = {
  text: "Explore the collection",
  href: "#",
  icon: "map-location-dot",
  small: true,
  iconOnly: true,
  classes: "tna-button--demo",
};

export const Plain = Template.bind({});
Plain.parameters = {
  chromatic: { disableSnapshot: true },
};
Plain.args = {
  text: "Plain button",
  href: "#",
  plain: true,
  classes: "tna-button--demo",
};

export const SmallPlain = Template.bind({});
SmallPlain.parameters = {
  chromatic: { disableSnapshot: true },
};
SmallPlain.args = {
  text: "Plain small button",
  href: "#",
  small: true,
  plain: true,
  classes: "tna-button--demo",
};

export const SmallPlainIcon = Template.bind({});
SmallPlainIcon.parameters = {
  chromatic: { disableSnapshot: true },
};
SmallPlainIcon.args = {
  text: "Plain small button",
  href: "#",
  icon: "map-location-dot",
  small: true,
  plain: true,
  classes: "tna-button--demo",
};

export const ButtonElement = Template.bind({});
ButtonElement.parameters = {
  chromatic: { disableSnapshot: true },
};
ButtonElement.args = {
  text: "Button element",
  href: "#",
  buttonElement: true,
  classes: "tna-button--demo",
};
