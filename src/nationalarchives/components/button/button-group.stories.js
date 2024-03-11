import Button from "./template.njk";

export default {
  title: "Components/Button group",
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

const GroupTemplate = ({ buttons }) =>
  `<div class="tna-button-group">
    ${buttons.map((button) => Template(button)).join("")}
</div>`;

export const Group = GroupTemplate.bind({});
Group.args = {
  buttons: [
    {
      text: "Standard",
      href: "#",
      classes: "tna-button--demo",
    },
    {
      text: "Accent",
      href: "#",
      accent: true,
      classes: "tna-button--demo",
    },
    {
      text: "Icon",
      href: "#",
      icon: "phone",
      classes: "tna-button--demo",
    },
    {
      text: "Right Aligned Icon",
      href: "#",
      icon: "chevron-right",
      rightAlignIcon: true,
      classes: "tna-button--demo",
    },
    {
      text: "Icon Only",
      href: "#",
      icon: "list",
      iconOnly: true,
      classes: "tna-button--demo",
    },
    {
      text: "Icon Only On Mobile",
      href: "#",
      icon: "list",
      iconOnlyOnMobile: true,
      classes: "tna-button--demo",
    },
    {
      text: "Plain",
      plain: true,
      classes: "tna-button--demo",
    },
    {
      text: "Plain With Icon",
      href: "#",
      icon: "map-location-dot",
      plain: true,
      classes: "tna-button--demo",
    },
    {
      text: "Button",
      buttonElement: true,
      classes: "tna-button--demo",
    },
  ],
};

const GroupOfSmallTemplate = ({ buttons }) =>
  `<div class="tna-button-group">
    ${buttons.map((button) => Template({ ...button, text: `Small ${button.text}`, small: true })).join("")}
</div>`;

export const GroupOfSmall = GroupOfSmallTemplate.bind({});
GroupOfSmall.args = Group.args;

const SmallGroupTemplate = ({ buttons }) =>
  `<div class="tna-button-group tna-button-group--small">
    ${buttons.map((button) => Template({ ...button, text: `Small ${button.text}` })).join("")}
</div>`;

export const SmallGroup = SmallGroupTemplate.bind({});
SmallGroup.args = Group.args;
