import { expect } from "storybook/test";
import uuidv4 from "../src/nationalarchives/lib/uuid.mjs";

export default {
  title: "Tests/UUID",
  render: () => "",
};

export const Initialisation = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    expect(uuid1).not.toEqual(uuid2);
  },
};
