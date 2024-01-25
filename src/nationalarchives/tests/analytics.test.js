import { describe, expect, test } from "@jest/globals";
import { GA4 } from "../analytics.mjs";

describe("Analytics", () => {
  test("Initialisation", async () => {
    const id = "example-id";
    const ga4 = new GA4(id);

    expect(ga4.gTagId).toEqual(id);
  });
});
