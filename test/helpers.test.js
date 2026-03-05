import { describe, expect, test } from "@jest/globals";
import { updateTimeElement } from "../src/nationalarchives/lib/helpers.mjs";

describe("updateTimeElement", () => {
  const originalDateString = "5 March 2026, 13:48 (UTC)";
  const originalDatetime = "2026-03-05T13:48:29Z";

  const $originalEl = document.createElement("time");
  $originalEl.setAttribute("datetime", originalDatetime);
  $originalEl.textContent = originalDateString;

  test("Plain", async () => {
    const $el = $originalEl.cloneNode(true);
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("5 March 2026, 13:48:29");
  });

  test("No datetime", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.removeAttribute("datetime");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toBeNull();
    expect($el.textContent).toEqual(originalDateString);
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
    expect($el.textContent).toEqual("5 March 2026");
  });

  test("Older ISO 8601 format", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29Z");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("5 March 2026, 13:48:29");
  });

  test("No zulu", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("5 March 2026, 13:48:29");
  });

  test("Timezone offset", async () => {
    const $el = $originalEl.cloneNode(true);
    $el.setAttribute("datetime", "2026-03-05 13:48:29-05:00");
    updateTimeElement($el);
    expect($el.getAttribute("title")).toEqual(originalDateString);
    expect($el.textContent).toEqual("5 March 2026, 18:48:29");
  });
});
