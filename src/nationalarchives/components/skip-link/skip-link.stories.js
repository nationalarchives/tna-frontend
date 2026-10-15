import { expect, userEvent, within } from "storybook/test";

import { renderInlineString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Skip link",
  argTypes: Object.fromEntries(
    Object.entries({
      text: { control: "text" },
      href: { control: "text" },
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
  render: (
    params,
  ) => `<div class="tna-template tna-template--blue-accent tna-template--light-theme">
  <div class="tna-template__body">
    <p>To view the skip link component tab to this example, or click inside this example and press tab.</p>
    ${renderInlineString(Template, {
      params,
    })}
    <main class="tna-main" id="main-content">
      <h1>Main content</h1>
    </main>
  </div>
</div>`,
};

export const Standard = {
  args: {
    classes: "tna-skip-link--demo",
  },
};

export const Test = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Skip to main content",
    href: "main-content",
    classes: "tna-skip-link--demo",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement),
      $skipLink = canvas.getByText(args.text),
      $linkedElement = document.getElementById(args.href);

    await expect($skipLink.getBoundingClientRect().x).toBeLessThanOrEqual(
      -$skipLink.getBoundingClientRect().width,
    );
    await expect($skipLink.getBoundingClientRect().y).toBeLessThanOrEqual(
      -$skipLink.getBoundingClientRect().height,
    );
    await expect($skipLink).not.toHaveFocus();
    await expect($linkedElement).not.toHaveFocus();
    await expect($linkedElement).not.toHaveAttribute("tabindex");

    await userEvent.keyboard("[Tab]");
    await expect($skipLink).toHaveFocus();
    await expect($skipLink.getBoundingClientRect().width).toBeGreaterThan(1);
    await expect($skipLink.getBoundingClientRect().height).toBeGreaterThan(1);
    await expect($skipLink.getBoundingClientRect().x).toBeGreaterThanOrEqual(0);
    await expect($skipLink.getBoundingClientRect().y).toBeGreaterThanOrEqual(0);

    await $skipLink.addEventListener("click", (event) =>
      event.preventDefault(),
    );
    await userEvent.click($skipLink);
    await expect($skipLink.getBoundingClientRect().x).toBeLessThanOrEqual(
      -$skipLink.getBoundingClientRect().width,
    );
    await expect($skipLink.getBoundingClientRect().y).toBeLessThanOrEqual(
      -$skipLink.getBoundingClientRect().height,
    );
    await expect($skipLink).not.toHaveFocus();
    await expect($linkedElement).toHaveAttribute("tabindex");
    await expect($linkedElement).toHaveFocus();

    await userEvent.keyboard("[Tab]");
    await expect($linkedElement).not.toHaveFocus();
    await expect($linkedElement).not.toHaveAttribute("tabindex");
  },
};
