import Fieldset from "./template.njk";
import TextInput from "../text-input/template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  legend: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: {
    control: "inline-radio",
    options: ["xs", "s", "m", "l", "xl"],
  },
  html: { control: "text" },
  id: { control: "text" },
  hint: { control: "text" },
  error: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Fieldset",
  argTypes,
};

const Template = ({
  legend,
  headingLevel,
  headingSize,
  html,
  id,
  hint,
  error,
  classes,
  attributes,
}) =>
  Fieldset({
    params: {
      legend,
      headingLevel,
      headingSize,
      html,
      id,
      hint,
      error,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  legend: "Fieldset",
  headingLevel: 1,
  headingSize: "xl",
  html: Array(6)
    .fill("")
    .reduce(
      (prev, value, index) =>
        prev +
        TextInput({
          params: {
            label: "Text input",
            headingLevel: 2,
            headingSize: "xs",
            hint: "This is a hint",
            // hint: index %2 === 0 ? "This is a hint" : null,
            // error: index % 3 === 0 ? { text: "This is an error" } : null,
            name: `text-input${index + 1}`,
            id: `text-input${index + 1}`,
            size: [null, "xl", "l", "m", "s", "xs"][index] || null,
          },
        }),
      "",
    ),
  id: "fieldset-1",
};
