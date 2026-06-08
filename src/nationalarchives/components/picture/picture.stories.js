import nunjucks from "nunjucks";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

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
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  render: (params) => nunjucks.renderString(Template, { params }),
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


export const ResponsiveImages = {
  args: {
    src: "https://placehold.co/1200x800/00623b/fff?text=1200x800&font=museo&font_size=48",
    alt: "A placeholder image",
    width: 1200,
    height: 800,
    srcSet: [
      {
        src: "https://placehold.co/300x200/f00/fff?text=300x200&font=museo&font_size=32",
        width: 300,
        size: "(max-width: 300px) and (max-resolution: 1x)",
      },
      {
        src: "https://placehold.co/300x200/0f0/fff?text=300x200&font=museo&font_size=32",
        width: 600,
        size: "(max-width: 600px) and (min-resolution: 1.25x)",
      },
      // {
      //   src: "https://placehold.co/600x400/00623b/fff?text=600x400&font=museo&font_size=32",
      //   width: 600,
      //   size: "(max-width: 2000px)",
      // },
      {
        src: "https://placehold.co/900x600/00623b/fff?text=900x600&font=museo&font_size=48",
        width: 900,
        size: "100vw",
      }
    ],
    caption: "<p>This is a pretty image</p>",
  },
};
