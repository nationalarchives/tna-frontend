import Button from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  title: { control: "text" },
  icon: { control: "text" },
  brandIcon: { control: "text" },
  accent: { control: "boolean" },
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

export const BrandIcon = Template.bind({});
BrandIcon.args = {
  text: "Twitter",
  href: "#",
  brandIcon: "twitter",
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
  ],
};
