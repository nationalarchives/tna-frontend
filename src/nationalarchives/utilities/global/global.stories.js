import Template from "../../templates/partials/logo.njk?raw";
import nunjucks from "nunjucks";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Utilities/Globals",
  argTypes: {
    solid: { control: "boolean" },
    size: { control: "number" },
    adornable: { control: "boolean" },
  },
  render: (params) => {
    return nunjucks.renderString(`${Template} {{ tnaLogo(params) }}`, {
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
