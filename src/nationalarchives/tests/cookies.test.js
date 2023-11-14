import { describe, expect, test } from "@jest/globals";
import Cookies from "../lib/cookies.mjs";

describe("TEST MODULE", () => {
  test("MY TEST", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("all");
  });
});
