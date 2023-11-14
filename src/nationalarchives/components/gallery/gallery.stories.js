import Gallery from "./template.njk";
import macroOptions from "./macro-options.json";
// import { expect } from "@storybook/jest";
// import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  heading: { control: "object" },
  items: { control: "object" },
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

const Template = ({ heading, items, classes, attributes }) =>
  Gallery({
    params: {
      heading,
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  heading: { title: "My gallery", level: 3 },
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
      tabs:
        index === 0
          ? [
              {
                id: "tab-1",
                title: "Transcript",
                body: "<p>TEST TRANSCRIPT</p>",
              },
              {
                id: "tab-2",
                title: "Translation",
                body: "<p>TEST TRANSLATION</p>",
              },
            ]
          : index === 1
          ? [
              {
                id: "tab-1",
                title: "Transcript",
                body: "<p>TEST TRANSCRIPT</p>",
              },
            ]
          : null,
    })),

  classes: "tna-gallery--demo",
};
