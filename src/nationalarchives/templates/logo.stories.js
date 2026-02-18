import Template from "./partials/logo/template.njk?raw";
import nunjucks from "nunjucks";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Templates/Logo",
  argTypes: {
    solid: { control: "boolean" },
    size: { control: "number" },
    adornable: { control: "boolean" },
  },
  render: (params) => {
    return nunjucks.renderString(Template, {
      params,
    });
  },
};

export const Logo = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {},
};
