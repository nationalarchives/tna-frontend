import { expect } from "storybook/test";
import { breakpoints } from "../src/nationalarchives/lib/media.mjs";

export default {
  title: "Tests/Media",
  render: () => "",
};

export const Defaults = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async () => {
    const defaultBreakpoints = breakpoints();

    expect(defaultBreakpoints).toBeTypeOf("object");
    expect(defaultBreakpoints).toHaveProperty("tiny");
    expect(defaultBreakpoints.tiny).toEqual("480px");
    expect(defaultBreakpoints).toHaveProperty("small");
    expect(defaultBreakpoints.small).toEqual("768px");
    expect(defaultBreakpoints).toHaveProperty("medium");
    expect(defaultBreakpoints.medium).toEqual("1024px");
  },
};
