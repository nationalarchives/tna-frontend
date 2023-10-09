import SkipLink from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Skip link",
  argTypes,
};

const Template = ({ text, href, classes, attributes }) =>
  `<p>To view the skip link component tab to this example, or click inside this example and press tab.</p>
  ${SkipLink({
    params: { text, href, classes, attributes },
  })}
  <main id="main-content" role="main">
    <h1>Main content</h1>
  </main>`;

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-skip-link--demo",
};

export const Test = Template.bind({});
Test.args = {
  text: "Skip to main content",
  href: "main-content",
  classes: "tna-skip-link--demo",
};
Test.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement);

  const $skipLink = canvas.getByText(args.text);
  const $linkedElement = document.getElementById(args.href);

  await expect($skipLink.getBoundingClientRect().width).toBe(1);
  await expect($skipLink.getBoundingClientRect().height).toBe(1);
  await expect($skipLink.getBoundingClientRect().x).toBeLessThanOrEqual(-1);
  await expect($skipLink).not.toHaveFocus();
  await expect($linkedElement).not.toHaveFocus();
  await expect($linkedElement).not.toHaveAttribute("tabindex");

  await userEvent.keyboard("[Tab]");
  await expect($skipLink).toHaveFocus();
  await expect($skipLink.getBoundingClientRect().width).toBeGreaterThan(1);
  await expect($skipLink.getBoundingClientRect().height).toBeGreaterThan(1);
  await expect($skipLink.getBoundingClientRect().x).toBeGreaterThanOrEqual(0);

  await userEvent.click($skipLink);
  await expect($skipLink.getBoundingClientRect().width).toBe(1);
  await expect($skipLink.getBoundingClientRect().height).toBe(1);
  await expect($skipLink.getBoundingClientRect().x).toBeLessThanOrEqual(-1);
  await expect($skipLink).not.toHaveFocus();
  await expect($linkedElement).toHaveAttribute("tabindex");
  await expect($linkedElement).toHaveFocus();

  await userEvent.keyboard("[Tab]");
  await expect($linkedElement).not.toHaveFocus();
  await expect($linkedElement).not.toHaveAttribute("tabindex");
};
