import { languages } from "prismjs";
import { expect, fireEvent, within } from "storybook/test";

import { renderString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Code block",
  argTypes: Object.fromEntries(
    Object.entries({
      filename: { control: "text" },
      language: { control: "select", options: Object.keys(languages) },
      code: { control: "text" },
      copy: { control: "object" },
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
  render: (params) => renderString(Template, { params }, { padded: true }),
};

export const Standard = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    code: "Plaintext code block",
  },
};

export const WithFilename = {
  args: {
    filename: "index.html",
    language: "html",
    code: `<!-- HTML for the back button component -->
<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
  },
};

export const WithCopyButton = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    language: "javascript",
    code: `const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/gu, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );`,
    copy: {
      enabled: true,
      label: "Copy this code",
      titlePrefix: "Copy this code block for",
    },
  },
  play: async ({ canvasElement }) => {
    // Click the copy button and check the clipboard content
    const canvas = within(canvasElement);
    await fireEvent.focus(canvasElement.ownerDocument);
    const copyButton = canvas.getByRole("button", { name: /Copy this code/i });
    await fireEvent.click(copyButton);
    //   const clipboardText = await navigator.clipboard.readText();
    //   expect(clipboardText).toBe(`const uuidv4 = () =>
    // ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/gu, (c) =>
    //   (
    //     c ^
    //     (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    //   ).toString(16),
    // );`);
    // expect(await copyButton.textContent).toBe("Code copied");
    await fireEvent.blur(copyButton);
    expect(await copyButton.textContent).toBe("Copy this code");
  },
};
