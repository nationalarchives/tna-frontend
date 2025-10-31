import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Picture",
  argTypes: Object.fromEntries(
    Object.entries({
      src: { control: "text" },
      width: { control: "number" },
      height: { control: "number" },
      sources: { control: "object" },
      caption: { control: "text" },
      informationLabelOpen: { control: "text" },
      informationLabelClose: { control: "text" },
      informationItemHeadingLevel: {
        control: { type: "number", min: 1, max: 6 },
      },
      information: { control: "object" },
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
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    alt: "The National Archives office",
    width: 600,
    height: 400,
    caption: "<p>This is a pretty image</p>",
    informationItemHeadingLevel: 3,
    information: [
      {
        id: "transcript",
        title: "Transcript",
        body: "<p>Lorem ipsum transcript</p>",
      },
      {
        id: "translation",
        title: "Translation",
        body: "<p>Lorem ipsum translation</p>",
      },
    ],
    classes: "tna-picture--demo",
  },
};
