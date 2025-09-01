import nunjucks from "nunjucks";

export default {
  title: "Components/Button group",
  argTypes: {
    small: { control: "boolean" },
  },
  render: (params) => {
    nunjucks.configure("src");
    nunjucks.configure("src");
    return nunjucks.renderString(
      `{% from "nationalarchives/components/button/macro.njk" import tnaButton %}
      <div class="tna-button-group{% if params.small %} tna-button-group--small{% endif %}">
        {% for button in params.buttons %}
          {{ tnaButton(button) }}
        {% endfor %}
      </div>`,
      { params },
    );
  },
};

export const Group = {
  args: {
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
        html: "<em>HTML</em>",
        href: "#",
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
      {
        text: "Plain button",
        plain: true,
        buttonElement: true,
        classes: "tna-button--demo",
      },
    ],
  },
};

export const SmallGroup = {
  args: { ...Group.args, small: true },
};
