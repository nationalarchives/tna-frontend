import nunjucks from "nunjucks";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Button group",
  argTypes: {
    small: { control: "boolean" },
  },
  render: (params) => {
    return nunjucks.renderString(
      `{%- from "nationalarchives/components/button/macro.njk" import tnaButton -%}
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
        iconSvg:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="24" aria-hidden="true" focusable="false"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>',
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
