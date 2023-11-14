import Tabs from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  title: { control: "text" },
  items: { control: "object" },
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
  title: "Components/Tabs",
  argTypes,
};

const Template = ({ title, items, sticky, classes, attributes }) =>
  Tabs({
    params: {
      title,
      items,
      sticky,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "Example tabs",
  items: [
    {
      id: "unique-id-a",
      title: "Alpha section",
      body: '<h2 class="tna-heading-l">Alpha title</h2><p>Lorem ipsum</p>',
    },
    {
      id: "unique-id-b",
      title: "Beta section",
      body: '<h2 class="tna-heading-l">Beta title</h2><p>Lorem ipsum</p>',
    },
    {
      id: "unique-id-c",
      title: "Gamma section",
      body: '<h2 class="tna-heading-l">Gamma title</h2><p>Lorem ipsum</p>',
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
      body: '<h2 class="tna-heading-l">Alpha title</h2><p>Lorem ipsum</p>',
    },
    {
      id: "unique-id-b",
      title: "Beta section",
      body: '<h2 class="tna-heading-l">Beta title</h2><p>Lorem ipsum</p>',
    },
    {
      id: "unique-id-c",
      title: "Gamma section",
      body: '<h2 class="tna-heading-l">Gamma title</h2><p>Lorem ipsum</p>',
    },
  ],
  classes: "tna-tabs--demo",
};
Test.play = async ({ args, canvasElement, step }) => {
  await new Promise((r) => setTimeout(r, 100));

  const canvas = within(canvasElement);

  const tablist = canvas.getByRole("tablist");
  const [buttonA, buttonB, buttonC] = args.items.map((item) =>
    canvas.getByText(item.title),
  );
  const [sectionA, sectionB, sectionC] = args.items.map((item) =>
    canvasElement.querySelector(`#${item.id}`),
  );

  const expectButtonToBeCurrent = async (button) => {
    await expect(button).toHaveAttribute("tabindex", "0");
    await expect(button).toHaveAttribute("aria-selected", "true");
    await expect(button).toHaveFocus();
  };

  const expectButtonNotToBeCurrent = async (button) => {
    await expect(button).toHaveAttribute("tabindex", "-1");
    await expect(button).toHaveAttribute("aria-selected", "false");
  };

  const expectSectionToBeCurrent = async (section) => {
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute("tabindex", "0");
  };

  const expectSectionNotToBeCurrent = async (section) => {
    await expect(section).not.toBeVisible();
    await expect(section).toHaveAttribute("tabindex", "-1");
  };

  const expectButtonAndSectionAToBeCurrent = async (section) => {
    await step("Test tab buttons", async () => {
      await expectButtonToBeCurrent(buttonA);
      await expectButtonNotToBeCurrent(buttonB);
      await expectButtonNotToBeCurrent(buttonC);
    });

    await step("Test tab sections", async () => {
      await expectSectionToBeCurrent(sectionA);
      await expectSectionNotToBeCurrent(sectionB);
      await expectSectionNotToBeCurrent(sectionC);
    });
  };

  const expectButtonAndSectionBToBeCurrent = async (section) => {
    await step("Test tab buttons", async () => {
      await expectButtonNotToBeCurrent(buttonA);
      await expectButtonToBeCurrent(buttonB);
      await expectButtonNotToBeCurrent(buttonC);
    });

    await step("Test tab sections", async () => {
      await expectSectionNotToBeCurrent(sectionA);
      await expectSectionToBeCurrent(sectionB);
      await expectSectionNotToBeCurrent(sectionC);
    });
  };

  const expectButtonAndSectionCToBeCurrent = async (section) => {
    await step("Test tab buttons", async () => {
      await expectButtonNotToBeCurrent(buttonA);
      await expectButtonNotToBeCurrent(buttonB);
      await expectButtonToBeCurrent(buttonC);
    });

    await step("Test tab sections", async () => {
      await expectSectionNotToBeCurrent(sectionA);
      await expectSectionNotToBeCurrent(sectionB);
      await expectSectionToBeCurrent(sectionC);
    });
  };

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

  await userEvent.click(buttonA);

  await step("First tab (already selected)", async () => {
    await userEvent.click(buttonA);
    await expectButtonAndSectionAToBeCurrent();
  });

  await step("Second tab", async () => {
    await userEvent.click(buttonB);
    await expectButtonAndSectionBToBeCurrent();
  });

  await step("Third tab", async () => {
    await userEvent.click(buttonC);
    await expectButtonAndSectionCToBeCurrent();
  });

  await step("First tab", async () => {
    await userEvent.click(buttonA);
    await expectButtonAndSectionAToBeCurrent();
  });

  await step("Keyboard interaciton", async () => {
    await step("Left/right", async () => {
      await userEvent.click(buttonA);
      await expectButtonAndSectionAToBeCurrent();

      await userEvent.keyboard("[ArrowRight]");
      await expectButtonAndSectionBToBeCurrent();

      await userEvent.keyboard("[ArrowRight]");
      await expectButtonAndSectionCToBeCurrent();

      await userEvent.keyboard("[ArrowRight]");
      await expectButtonAndSectionAToBeCurrent();

      await userEvent.keyboard("[ArrowRight]");
      await expectButtonAndSectionBToBeCurrent();

      await userEvent.keyboard("[ArrowLeft]");
      await expectButtonAndSectionAToBeCurrent();

      await userEvent.keyboard("[ArrowLeft]");
      await expectButtonAndSectionCToBeCurrent();

      await userEvent.keyboard("[ArrowLeft]");
      await expectButtonAndSectionBToBeCurrent();

      await userEvent.keyboard("[ArrowLeft]");
      await expectButtonAndSectionAToBeCurrent();
    });

    await step("Home/end", async () => {
      await userEvent.click(buttonA);
      await expectButtonAndSectionAToBeCurrent();

      await userEvent.keyboard("[Home]");
      await expectButtonAndSectionAToBeCurrent();

      await userEvent.keyboard("[End]");
      await expectButtonAndSectionCToBeCurrent();

      await userEvent.keyboard("[End]");
      await expectButtonAndSectionCToBeCurrent();

      await userEvent.keyboard("[Home]");
      await expectButtonAndSectionAToBeCurrent();
    });

    buttonA.blur();
  });
};
