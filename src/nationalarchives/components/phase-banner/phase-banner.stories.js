import PhaseBanner from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

const argTypes = Object.fromEntries(
  Object.entries({
    phase: { control: "text" },
    message: { control: "text" },
    classes: { control: "text" },
    attributes: { control: "object" },
  }).map(([key, value]) => [
    key,
    {
      ...value,
      description: macroOptions.find((option) => option.name === key)
        ?.description,
    },
  ]),
);

export default {
  title: "Components/Phase banner",
  argTypes,
  render: (params) => {
    return nunjucks.renderString(PhaseBanner, { params });
  },
};

export const Standard = {
  args: {
    phase: "beta",
    message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
  },
};
