import { describe, expect, test } from "@jest/globals";
import uuidv4 from "../src/nationalarchives/lib/uuid.mjs";

describe("UUID", () => {
  test("Initialisation", async () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    expect(uuid1).not.toEqual(uuid2);
  });
});
