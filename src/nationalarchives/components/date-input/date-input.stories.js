import { expect, fireEvent, userEvent, within } from "storybook/test";

import { renderString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Date input",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 0, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      fields: { control: "object" },
      fieldLabels: { control: "object" },
      value: { control: "object" },
      error: { control: "object" },
      autofillDateOfBirth: { control: "boolean" },
      progressive: { control: "boolean" },
      formItemClasses: { control: "text" },
      formItemAttributes: { control: "object" },
      fieldsetClasses: { control: "text" },
      fieldsetAttributes: { control: "object" },
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
  render: (params) => renderString(Template, { params }),
};

export const Standard = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date11",
    name: "date11",
    classes: "tna-date-input--demo",
  },
};

export const Predefined = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date12",
    name: "date12",
    value: {
      day: "01",
      month: "02",
      year: "2003",
    },
    classes: "tna-date-input--demo",
  },
};

export const Progressive = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date13",
    name: "date13",
    progressive: true,
    classes: "tna-date-input--demo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      yearInput = canvas.getByLabelText("Year"),
      monthInput = canvas.getByLabelText("Month"),
      dayInput = canvas.getByLabelText("Day");

    fireEvent.pageShow(canvasElement);

    await expect(yearInput).toBeVisible();
    await expect(monthInput).not.toBeVisible();
    await expect(dayInput).not.toBeVisible();

    const invalidYears = ["a", " ", "2oo3", "0", "-1"];
    for (const year of invalidYears) {
      await userEvent.clear(yearInput);
      await userEvent.type(yearInput, year);
      await expect(yearInput).toBeVisible();
      await expect(monthInput).not.toBeVisible();
      await expect(dayInput).not.toBeVisible();
    }

    const validYears = ["2003", "2"];
    for (const year of validYears) {
      await userEvent.clear(yearInput);
      await userEvent.type(yearInput, year);
      await expect(yearInput).toBeVisible();
      await expect(monthInput).toBeVisible();
      await expect(dayInput).not.toBeVisible();
    }

    const invalidMonths = ["a", " ", "janu", "13", "0", "-1"];
    for (const month of invalidMonths) {
      await userEvent.clear(monthInput);
      await userEvent.type(monthInput, month);
      await expect(yearInput).toBeVisible();
      await expect(monthInput).toBeVisible();
      await expect(dayInput).not.toBeVisible();
    }

    const validMonths = ["01", "12", "jan", " jan", "6"];
    for (const month of validMonths) {
      await userEvent.clear(monthInput);
      await userEvent.type(monthInput, month);
      await expect(yearInput).toBeVisible();
      await expect(monthInput).toBeVisible();
      await expect(dayInput).toBeVisible();
    }

    await userEvent.type(dayInput, "01");
    await userEvent.clear(yearInput);
    await fireEvent.change(yearInput);
    await expect(monthInput).not.toBeVisible();
    await expect(dayInput).not.toBeVisible();
    await userEvent.type(yearInput, "2004");
    expect(monthInput).toBeVisible();
    expect(monthInput).toHaveValue("6");
    expect(dayInput).toBeVisible();
    expect(dayInput).toHaveValue("01");

    await userEvent.clear(dayInput);
    await userEvent.clear(monthInput);
    await userEvent.clear(yearInput);
    fireEvent.pageShow(canvasElement);
  },
};

export const OnlyMonthYear = {
  args: {
    label: "Enter a month",
    headingLevel: 4,
    headingSize: "m",
    id: "date14",
    name: "date14",
    fields: ["m", "y"],
    classes: "tna-date-input--demo",
  },
};

export const OnlyYear = {
  args: {
    label: "Enter a year",
    headingLevel: 4,
    headingSize: "m",
    id: "date15",
    name: "date15",
    fields: ["y"],
    classes: "tna-date-input--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date16",
    name: "date16",
    hint: "The earliest date of the record",
    classes: "tna-date-input--demo",
  },
};

export const Error = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date17",
    name: "date17",
    error: {
      text: "Date is not valid",
    },
    classes: "tna-date-input--demo",
  },
};
