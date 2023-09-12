import CookieBanner from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  url: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Cookie banner",
  argTypes,
};

const Template = ({ url, classes, attributes }) =>
  CookieBanner({
    params: {
      url,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};
