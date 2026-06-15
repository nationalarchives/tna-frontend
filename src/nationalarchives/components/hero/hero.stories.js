import nunjucks from "nunjucks";
import { expect, userEvent, within } from "storybook/test";

import { customViewports } from "../../../../.storybook/viewports";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

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
        options: ["plain", "shift", "split", "over"],
      },
      large: { control: "boolean" },
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
    viewport: {
      options: customViewports,
    },
  },
  render: (params) => nunjucks.renderString(Template, { params }),
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
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = within(canvasElement),
      image = canvas.getByAltText(args.imageAlt),
      content = canvasElement.querySelector(".tna-hero__content"),
      summary = canvasElement.querySelector(".tna-hero__details-summary"),
      information = canvas.getByText(args.imageCaption);

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

export const Over = {
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
    layout: "over",
  },
};

export const Large = {
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
    large: true,
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
      viewports: [customViewports.small.styles.width.replace(/px$/u, "")],
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
