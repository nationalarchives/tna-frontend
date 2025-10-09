import Gallery from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  body: { control: "text" },
  text: { control: "text" },
  items: { control: "object" },
  id: { control: "text" },
  bounded: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Gallery",
  argTypes,
};

const Template = (params) =>
  Gallery({
    params,
  });

const exampleWidth = 600;
const exampleHeight = 400;

export const Standard = Template.bind({});
Standard.args = {
  items: Array(24)
    .fill({
      alt: "",
      width: "",
      height: "",
    })
    .map((item, index) => ({
      ...item,
      src: `https://picsum.photos/id/${index + 50}/${
        index % 3 === 0
          ? `${exampleWidth}/${exampleHeight}`
          : index % 3 === 1
            ? `${exampleWidth}/${exampleWidth}`
            : `${exampleHeight}/${exampleWidth}`
      }`,
      width: index % 3 === 0 ? exampleWidth : exampleHeight,
      height:
        index % 3 === 0
          ? exampleHeight
          : index % 3 === 1
            ? exampleHeight
            : exampleWidth,
      alt: `Photo ${index + 1}`,
      description: `This is photo number ${index + 1}`,
    })),
  id: "test",
  classes: "tna-gallery--demo",
};

export const Bounded = Template.bind({});
Bounded.args = {
  ...Standard.args,
  bounded: true,
};
