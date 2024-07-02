import Gallery from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l"] },
  body: { control: "text" },
  text: { control: "text" },
  items: { control: "object" },
  id: { control: "text" },
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

const Template = ({
  title,
  headingLevel,
  headingSize,
  body,
  text,
  items,
  id,
  classes,
  attributes,
}) =>
  Gallery({
    params: {
      title,
      headingLevel,
      headingSize,
      body,
      text,
      items,
      id,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "My gallery",
  headingLevel: 3,
  text: "Lorem ipsum",
  items: Array(6)
    .fill({
      alt: "",
      width: "",
      height: "",
    })
    .map((item, index) => ({
      ...item,
      src: `https://picsum.photos/id/${index + 1}/${
        index % 3 === 0 ? "800/600" : index % 3 === 1 ? "600/600" : "600/800"
      }`,
      alt: `Photo ${index + 1}`,
      description: `Photo #${index + 1}`,
    })),
  id: "test",
  classes: "tna-gallery--demo",
};
