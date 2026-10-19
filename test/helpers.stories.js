import { expect } from "storybook/test";
import {
  iso8601ToPrettyDatetime,
  updateTimeElement,
} from "../src/nationalarchives/lib/helpers.mjs";

export default {
  title: "Tests/Helpers",
  render: () => "",
};

export const Iso8601ToPrettyDatetime = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ step }) => {
    await step("No datetime", async () => {
      expect(() => iso8601ToPrettyDatetime()).toThrow("No datetime provided");
    });

    for (const testDatetime of ["invalid", "2001-02-03T12", "2001-02-03 12"]) {
      await step(`Invalid datetime (${testDatetime})`, async () => {
        expect(() => iso8601ToPrettyDatetime(testDatetime)).toThrow(
          "Invalid datetime provided",
        );
      });
    }

    for (const [input, expected] of [
      ["2001", "Monday 1 January 2001"],
      ["2001-02", "Thursday 1 February 2001"],
      ["2001-02-03", "Saturday 3 February 2001"],
      ["2001-02-03T12:30", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03T12:30Z", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03T12:30:45", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03T12:30:45Z", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03T12:30:45+00:00", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03T12:30:45+01:00", "Saturday 3 February 2001, 11:30:45"],
      ["2001-02-03T12:30:45-00:00", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03T12:30:45-01:00", "Saturday 3 February 2001, 13:30:45"],
      ["2001-02-03T12:30+00:00", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03T12:30+01:00", "Saturday 3 February 2001, 11:30"],
      ["2001-02-03T12:30-00:00", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03T12:30-01:00", "Saturday 3 February 2001, 13:30"],
      ["2001-02-03T00:00", "Saturday 3 February 2001, 00:00"],
      ["2001-02-03 12:30", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03 12:30Z", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03 12:30:45", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03 12:30:45Z", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03 12:30:45+00:00", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03 12:30:45+01:00", "Saturday 3 February 2001, 11:30:45"],
      ["2001-02-03 12:30:45-00:00", "Saturday 3 February 2001, 12:30:45"],
      ["2001-02-03 12:30:45-01:00", "Saturday 3 February 2001, 13:30:45"],
      ["2001-02-03 12:30+00:00", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03 12:30+01:00", "Saturday 3 February 2001, 11:30"],
      ["2001-02-03 12:30-00:00", "Saturday 3 February 2001, 12:30"],
      ["2001-02-03 12:30-01:00", "Saturday 3 February 2001, 13:30"],
      ["2001-02-03 00:00", "Saturday 3 February 2001, 00:00"],
      [100000000000, "Saturday 3 March 1973, 09:46:40"],
      [100000020000, "Saturday 3 March 1973, 09:47"],
      [99964800000, "Saturday 3 March 1973, 00:00"],
    ]) {
      await step(`Valid datetime (${input})`, async () => {
        expect(() => iso8601ToPrettyDatetime(input)).not.toThrow();
        expect(iso8601ToPrettyDatetime(input)).toEqual(expected);
      });
    }
  },
};

export const UpdateTimeElement = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ step }) => {
    const originalDateString = "ORIGINAL DATE STRING";

    const $originalEl = document.createElement("time");
    $originalEl.textContent = originalDateString;

    await step("No datetime", async () => {
      const $el = $originalEl.cloneNode(true);
      updateTimeElement($el);
      expect($el.getAttribute("title")).toBeNull();
      expect($el.textContent).toEqual(originalDateString);
    });

    await step("Plain", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
    });

    await step("Invalid datetime", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "invalid");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toBeNull();
      expect($el.textContent).toEqual(originalDateString);
    });

    await step("No time", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026");
    });

    await step("Older ISO 8601 format", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05 13:48:29Z");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
    });

    await step("No zulu", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
    });

    await step("No zulu, older ISO 8601 format", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05 13:48:29");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
    });

    await step("Timezone offset", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29-05:00");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 18:48:29");
    });

    await step("Timezone offset, older ISO 8601 format", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05 13:48:29-05:00");
      updateTimeElement($el);
      expect($el.getAttribute("title")).toEqual(originalDateString);
      expect($el.textContent).toEqual("Thursday 5 March 2026, 18:48:29");
    });

    await step("Already formatted", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
      $el.textContent = "Thursday 5 March 2026, 13:48:29";
      updateTimeElement($el);
      expect($el.hasAttribute("title")).toBeFalsy();
      expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
    });

    await step("Already paritally formatted no day", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
      $el.textContent = "5 March 2026, 13:48:29";
      updateTimeElement($el);
      expect($el.hasAttribute("title")).toBeFalsy();
      expect($el.textContent).toEqual("5 March 2026, 13:48:29");
    });

    await step("Already paritally formatted no time", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
      $el.textContent = "Thursday 5 March 2026";
      updateTimeElement($el);
      expect($el.hasAttribute("title")).toBeFalsy();
      expect($el.textContent).toEqual("Thursday 5 March 2026");
    });

    await step("Already paritally formatted no day or time", async () => {
      const $el = $originalEl.cloneNode(true);
      $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
      $el.textContent = "5 March 2026";
      updateTimeElement($el);
      expect($el.hasAttribute("title")).toBeFalsy();
      expect($el.textContent).toEqual("5 March 2026");
    });
  },
};
