import SkipLink from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Skip link",
  argTypes,
};

const Template = ({ text, href, classes, attributes }) =>
  `<p>To view the skip link component tab to this example, or click inside this example and press tab.</p>
  ${SkipLink({
    params: { text, href, classes, attributes },
  })}`;

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-skip-link--demo",
};
