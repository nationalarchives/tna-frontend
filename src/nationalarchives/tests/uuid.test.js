import { describe, expect, test } from "@jest/globals";
import { TextEncoder, TextDecoder, store, options } from "util";
import uuidv4 from "../lib/uuid.mjs";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.store = store;
global.options = options;

describe("UUID", () => {
  test("Initialisation", async () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    expect(uuid1).not.toEqual(uuid2);
  });
});
