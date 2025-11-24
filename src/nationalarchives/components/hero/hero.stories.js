import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Hero",
  argTypes: Object.fromEntries(
    Object.entries({
      supertitle: { control: "text" },
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      body: { control: "text" },
      text: { control: "text" },
      imageSrc: { control: { type: "file", accept: ".jpg" } },
      imageAlt: { control: "text" },
      imageWidth: { control: { type: "number", min: 1 } },
      imageHeight: { control: { type: "number", min: 1 } },
      imageType: { control: "text" },
      imageSources: { control: "object" },
      imageCaption: { control: "text" },
      actions: { control: "object" },
      style: {
        control: "inline-radio",
        options: ["none", "contrast", "tint", "accent", "accent-light"],
      },
      layout: {
        control: "inline-radio",
        options: ["plain", "shift", "split", "layer"],
      },
      leftBorder: { control: "boolean" },
      narrow: { control: "boolean" },
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
  parameters: {
    chromatic: { delay: 1000 },
    viewport: {
      options: customViewports,
    },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
  },
  play: async ({ args, canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 100));

    const canvas = within(canvasElement);
    const image = canvas.getByAltText(args.imageAlt);
    const content = canvasElement.querySelector(".tna-hero__content");
    const summary = canvasElement.querySelector(".tna-hero__details-summary");
    const information = canvas.getByText(args.imageCaption);

    await step("Initial load", async () => {
      await expect(image).toBeVisible();
      await expect(content).toBeVisible();
      await expect(summary).toBeVisible();
      await expect(information).not.toBeVisible();
    });

    await step("Open information", async () => {
      await userEvent.click(summary);
      await expect(information).toBeVisible();
    });

    await step("Close information", async () => {
      await userEvent.click(summary);
      await expect(information).not.toBeVisible();
    });
  },
};

export const LargeContent = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    supertitle: "Focus on",
    title: "‘Not acceptable’: Gay Switchboard’s attempts to become a charity",
    body: `<p class="tna-large-paragraph">Switchboard LGBT+ Helpline is one of the oldest telephone help services for lesbian, gay, bisexual, transgender and queer people in the UK. Despite high demand for its support, prejudice and laws meant Switchboard’s journey to register as a charity was not easy.</p>`,
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
  },
};

export const Accent = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    supertitle: "Supertitle",
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "accent",
  },
};

export const Contrast = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    supertitle: "Supertitle",
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "contrast",
  },
};

export const Tint = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    supertitle: "Supertitle",
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "tint",
  },
};

export const Shifted = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "accent",
    layout: "shift",
  },
};

export const Split = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "accent",
    layout: "split",
  },
};

export const Narrow = {
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    style: "accent",
    // layout: "split",
    narrow: true,
  },
};

export const Actions = {
  args: {
    supertitle: "Supertitle",
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
    actions: [
      {
        text: "Action 1",
        href: "#",
      },
      {
        text: "Action 2",
        href: "#",
        icon: "globe",
      },
      {
        text: "Action 3",
        href: "#",
        title: "Go and do the action",
        icon: "chevron-right",
        rightAlignIcon: true,
      },
    ],
    style: "accent",
  },
};

export const CaptionWithNoHeading = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
  },
};

export const Sources = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageSources: [
      {
        src: "https://www.gstatic.com/webp/gallery/2.webp",
        type: "image/webp",
        media: "(max-width: 48em)",
        width: 550,
        height: 404,
      },
    ],
  },
};

export const Mobile = {
  parameters: {
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: {
    supertitle: "Supertitle",
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    imageCaption: "An interesting photo by a famous photographer ©2023",
  },
};
