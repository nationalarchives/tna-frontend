import { describe, expect, test } from "@jest/globals";
import {
  iso8601ToPrettyDatetime,
  updateTimeElement,
} from "../src/nationalarchives/lib/helpers.mjs";

describe("iso8601ToPrettyDatetime", () => {
  test("No datetime", async () => {
    expect(() => iso8601ToPrettyDatetime()).toThrow("No datetime provided");
  });

  ["invalid", "2001", "2001-02", "2001-02-03T12", "2001-02-03 12"].forEach(
    (datetime) => {
      test(`Invalid datetime (${datetime})`, async () => {
        expect(() => iso8601ToPrettyDatetime(datetime)).toThrow(
          "Invalid datetime provided",
        );
      });
    },
  );

  [
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
  ].forEach((datetime) => {
    test(`Valid datetime (${datetime[0]})`, async () => {
      expect(() => iso8601ToPrettyDatetime(datetime[0])).not.toThrow();
      expect(iso8601ToPrettyDatetime(datetime[0])).toEqual(datetime[1]);
    });
  });
});

describe("updateTimeElement", () => {
  const originalDateString = "ORIGINAL DATE STRING";

  const $originalEl = document.createElement("time");
  $originalEl.textContent = originalDateString;

  test("No datetime", async () => {
    const $el = $originalEl.cloneNode(true);
    updateTimeElement($el);
    expect($el.getAttribute("title")).toBeNull();
    expect($el.textContent).toEqual(originalDateString);
  });

  test("Plain", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
  });

  test("Invalid datetime", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "invalid");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toBeNull();
    expect($el.textContent).toEqual(originalDateString);
  });

  test("No time", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026");
  });

  test("Older ISO 8601 format", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29Z");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
  });

  test("No zulu", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
  });

  test("No zulu, older ISO 8601 format", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
  });

  test("Timezone offset", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29-05:00");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 18:48:29");
  });

  test("Timezone offset, older ISO 8601 format", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29-05:00");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("Thursday 5 March 2026, 18:48:29");
  });

  test("Already formatted", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
    $el.textContent = "Thursday 5 March 2026, 13:48:29";
    updateTimeElement($el);
    expect($el.hasAttribute("title")).toBeFalsy();
    expect($el.textContent).toEqual("Thursday 5 March 2026, 13:48:29");
  });

  test("Already paritally formatted no day", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
    $el.textContent = "5 March 2026, 13:48:29";
    updateTimeElement($el);
    expect($el.hasAttribute("title")).toBeFalsy();
    expect($el.textContent).toEqual("5 March 2026, 13:48:29");
  });

  test("Already paritally formatted no time", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
    $el.textContent = "Thursday 5 March 2026";
    updateTimeElement($el);
    expect($el.hasAttribute("title")).toBeFalsy();
    expect($el.textContent).toEqual("Thursday 5 March 2026");
  });

  test("Already paritally formatted no day or time", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05T13:48:29Z");
    $el.textContent = "5 March 2026";
    updateTimeElement($el);
    expect($el.hasAttribute("title")).toBeFalsy();
    expect($el.textContent).toEqual("5 March 2026");
  });
});
