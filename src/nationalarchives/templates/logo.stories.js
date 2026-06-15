import nunjucks from "nunjucks";

import Template from "./partials/logo/template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Templates/Logo",
  argTypes: {
    solid: { control: "boolean" },
    size: { control: "number" },
    adornable: { control: "boolean" },
  },
  render: (params) =>
    nunjucks.renderString(Template, {
      params,
    }),
};

export const Logo = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {},
};
