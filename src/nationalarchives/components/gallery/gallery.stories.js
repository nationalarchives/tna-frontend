import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Gallery",
  argTypes: Object.fromEntries(
    Object.entries({
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
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

const exampleWidth = 600;
const exampleHeight = 400;

export const Standard = {
  args: {
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
  },
};

export const Bounded = {
  args: {
    ...Standard.args,
    bounded: true,
  },
};
