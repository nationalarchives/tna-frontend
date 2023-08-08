import Message from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  message: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Message",
  argTypes,
};

const Template = ({ message, classes, attributes }) => {
  return Message({
    params: {
      message,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  message:
    "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
  classes: "tna-messaage--demo",
};
