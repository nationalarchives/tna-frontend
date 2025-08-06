import Panel from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  body: { control: "text" },
  text: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Panel",
  argTypes,
};

const Template = ({
  title,
  headingLevel,
  headingSize,
  body,
  text,
  classes,
  attributes,
}) =>
  Panel({
    params: {
      title,
      headingLevel,
      headingSize,
      body,
      text,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "Application received",
  body: "<p>Your application has been received and is being processed.</p><p>Your reference number is <strong>123456</strong>.</p>",
};
