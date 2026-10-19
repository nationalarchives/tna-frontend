import { renderString } from "../../../.storybook/nunjucks.js";

import Template from "./partials/logo/template.njk?raw";

export default {
  title: "Templates/Logo",
  argTypes: {
    solid: { control: "boolean" },
    size: { control: "number" },
    adornable: { control: "boolean" },
  },
  render: (params) => renderString(Template, {params}, { padded: true }),
};

export const Logo = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {},
};
