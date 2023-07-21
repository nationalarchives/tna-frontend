import Tabs from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  title: { control: "text" },
  items: { control: "array" },
  sticky: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Experimental/Tabs",
  argTypes,
};

const Template = ({ title, items, sticky, classes, attributes }) => {
  return Tabs({
    params: {
      title,
      items,
      sticky,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  title: "Example tabs",
  items: [
    {
      id: "unique-id-a",
      title: "Alpha section",
      html: "<h2>Alpha title</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-b",
      title: "Beta section",
      html: "<h2>Beta title</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-c",
      title: "Gamma section",
      html: "<h2>Gamma title</h2><p>Lorem ipsum</p>",
    },
  ],
  classes: "tna-tabs--demo",
};

export const Test = Template.bind({});
Test.args = {
  title: "Example tabs",
  items: [
    {
      id: "unique-id-a",
      title: "Alpha section",
      html: "<h2>Alpha title</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-b",
      title: "Beta section",
      html: "<h2>Beta title</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-c",
      title: "Gamma section",
      html: "<h2>Gamma title</h2><p>Lorem ipsum</p>",
    },
  ],
  classes: "tna-tabs--demo",
};

Test.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement);

  const tablist = canvas.getByRole("tablist");
  const [buttonA, buttonB, buttonC] = args.items.map((item) =>
    canvas.getByText(item.title),
  );
  const [sectionA, sectionB, sectionC] = args.items.map((item) =>
    canvasElement.querySelector(`#${item.id}`),
  );

  await step("Initial load", async () => {
    await step("Test tablist", async () => {
      await expect(tablist).toBeDefined();
      await expect(tablist).toBeVisible();
    });

    await step("Test tab buttons", async () => {
      await step("First tab button", async () => {
        await expect(buttonA).toBeVisible();
        await expect(buttonA).toHaveAttribute("id", `${args.items[0].id}-tab`);
        await expect(buttonA).toHaveAttribute("role", "tab");
        await expect(buttonA).toHaveAttribute("tabindex", "0");
        await expect(buttonA).toHaveAttribute("aria-selected", "true");
        await expect(buttonA).toHaveAttribute(
          "aria-controls",
          args.items[0].id,
        );
      });

      await step("Second tab button", async () => {
        await expect(buttonB).toBeVisible();
        await expect(buttonB).toHaveAttribute("id", `${args.items[1].id}-tab`);
        await expect(buttonB).toHaveAttribute("role", "tab");
        await expect(buttonB).toHaveAttribute("tabindex", "-1");
        await expect(buttonB).toHaveAttribute("aria-selected", "false");
        await expect(buttonB).toHaveAttribute(
          "aria-controls",
          args.items[1].id,
        );
      });

      await step("Third tab button", async () => {
        await expect(buttonC).toBeVisible();
        await expect(buttonC).toHaveAttribute("id", `${args.items[2].id}-tab`);
        await expect(buttonC).toHaveAttribute("role", "tab");
        await expect(buttonC).toHaveAttribute("tabindex", "-1");
        await expect(buttonC).toHaveAttribute("aria-selected", "false");
        await expect(buttonC).toHaveAttribute(
          "aria-controls",
          args.items[2].id,
        );
      });
    });

    await step("Test tab sections", async () => {
      await expect(sectionA).toBeVisible();
      await expect(sectionA).toHaveAttribute("id", args.items[0].id);
      await expect(sectionA).toHaveAttribute("role", "tabpanel");
      await expect(sectionA).toHaveAttribute(
        "aria-labelledby",
        `${args.items[0].id}-tab`,
      );
      await expect(sectionA).toHaveAttribute("tabindex", "0");

      await expect(sectionB).not.toBeVisible();
      await expect(sectionB).toHaveAttribute("id", args.items[1].id);
      await expect(sectionB).toHaveAttribute("role", "tabpanel");
      await expect(sectionB).toHaveAttribute(
        "aria-labelledby",
        `${args.items[1].id}-tab`,
      );
      await expect(sectionB).toHaveAttribute("tabindex", "0");

      await expect(sectionC).not.toBeVisible();
      await expect(sectionC).toHaveAttribute("id", args.items[2].id);
      await expect(sectionC).toHaveAttribute("role", "tabpanel");
      await expect(sectionC).toHaveAttribute(
        "aria-labelledby",
        `${args.items[2].id}-tab`,
      );
      await expect(sectionC).toHaveAttribute("tabindex", "0");
    });
  });

  await step("First tab (already selected)", async () => {
    await step("Test tab sections", async () => {
      await userEvent.click(buttonA);
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();
    });
  });

  await step("Second tab", async () => {
    await step("Test tab sections", async () => {
      await userEvent.click(buttonB);
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).toBeVisible();
      await expect(sectionC).not.toBeVisible();
    });
  });

  await step("Third tab", async () => {
    await step("Test tab sections", async () => {
      await userEvent.click(buttonC);
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).toBeVisible();
    });
  });

  await step("First tab", async () => {
    await step("Test tab sections", async () => {
      await userEvent.click(buttonA);
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();
    });
  });

  await step("Keyboard interaciton", async () => {
    await step("Left/right", async () => {
      await userEvent.click(buttonA);
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowRight]");
      await expect(buttonB).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowRight]");
      await expect(buttonC).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).toBeVisible();

      await userEvent.keyboard("[ArrowRight]");
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowRight]");
      await expect(buttonB).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowLeft]");
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowLeft]");
      await expect(buttonC).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).toBeVisible();

      await userEvent.keyboard("[ArrowLeft]");
      await expect(buttonB).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[ArrowLeft]");
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();
    });

    await step("Home/end", async () => {
      await userEvent.click(buttonA);
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[Home]");
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();

      await userEvent.keyboard("[End]");
      await expect(buttonC).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).toBeVisible();

      await userEvent.keyboard("[End]");
      await expect(buttonC).toHaveFocus();
      await expect(sectionA).not.toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).toBeVisible();

      await userEvent.keyboard("[Home]");
      await expect(buttonA).toHaveFocus();
      await expect(sectionA).toBeVisible();
      await expect(sectionB).not.toBeVisible();
      await expect(sectionC).not.toBeVisible();
    });
  });
};
