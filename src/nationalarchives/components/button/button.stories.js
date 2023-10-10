import Button from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  title: { control: "text" },
  icon: { control: "text" },
  brandIcon: { control: "text" },
  accent: { control: "boolean" },
  small: { control: "boolean" },
  plain: { control: "boolean" },
  iconOnly: { control: "boolean" },
  buttonElement: { control: "boolean" },
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
  brandIcon,
  accent,
  small,
  plain,
  iconOnly,
  buttonElement,
  classes,
  attributes,
}) =>
  Button({
    params: {
      text,
      href,
      title,
      icon,
      brandIcon,
      accent,
      small,
      plain,
      iconOnly,
      buttonElement,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  text: "Button",
  href: "#",
  classes: "tna-button--demo",
};

export const Accent = Template.bind({});
Accent.args = {
  text: "Button",
  href: "#",
  accent: true,
  classes: "tna-button--demo",
};

export const Icon = Template.bind({});
Icon.args = {
  text: "Explore the collection",
  href: "#",
  icon: "map-location-dot",
  classes: "tna-button--demo",
};

export const SmallIcon = Template.bind({});
SmallIcon.args = {
  text: "Explore the collection",
  href: "#",
  icon: "map-location-dot",
  small: true,
  classes: "tna-button--demo",
};

export const BrandIcon = Template.bind({});
BrandIcon.args = {
  text: "Twitter",
  href: "#",
  brandIcon: "twitter",
  classes: "tna-button--demo",
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  text: "Show as a list",
  href: "#",
  icon: "list",
  iconOnly: true,
  classes: "tna-button--demo",
};

export const Small = Template.bind({});
Small.args = {
  text: "Small button",
  href: "#",
  small: true,
  classes: "tna-button--demo",
};

export const Plain = Template.bind({});
Plain.args = {
  text: "Plain button",
  href: "#",
  plain: true,
  classes: "tna-button--demo",
};

export const SmallPlain = Template.bind({});
SmallPlain.args = {
  text: "Plain small button",
  href: "#",
  small: true,
  plain: true,
  classes: "tna-button--demo",
};

export const ButtonElement = Template.bind({});
ButtonElement.args = {
  text: "Button element",
  href: "#",
  buttonElement: true,
  classes: "tna-button--demo",
};

const GroupTemplate = ({ buttons }) =>
  `<div class="tna-button-group">
    ${buttons.map((button) => Template(button)).join("")}
</div>`;

export const Group = GroupTemplate.bind({});
Group.args = {
  buttons: [
    {
      text: "Button 1",
      href: "#",
      classes: "tna-button--demo",
    },
    {
      text: "Button 2",
      href: "#",
      accent: true,
      classes: "tna-button--demo",
    },
    {
      text: "Call us",
      href: "#",
      icon: "phone",
      classes: "tna-button--demo",
    },
    {
      text: "Button",
      buttonElement: true,
      classes: "tna-button--demo",
    },
    {
      text: "Plain",
      plain: true,
      classes: "tna-button--demo",
    },
  ],
};
