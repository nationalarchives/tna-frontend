import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Pagination",
  argTypes: Object.fromEntries(
    Object.entries({
      previous: { control: "object" },
      items: { control: "object" },
      next: { control: "object" },
      currentItemText: { control: "text" },
      solid: { control: "boolean" },
      spaced: { control: "boolean" },
      landmarkLabel: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 6,
        href: "#",
      },
      {
        number: 7,
        current: true,
        href: "#",
      },
      {
        number: 8,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const First = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    items: [
      {
        number: 1,
        current: true,
        href: "#",
      },
      {
        number: 2,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const Second = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        number: 2,
        current: true,
        href: "#",
      },
      {
        number: 3,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const Third = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        number: 2,
        href: "#",
      },
      {
        number: 3,
        current: true,
        href: "#",
      },
      {
        number: 4,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const Forth = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        number: 2,
        href: "#",
      },
      {
        number: 3,
        href: "#",
      },
      {
        number: 4,
        current: true,
        href: "#",
      },
      {
        number: 5,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const Fifth = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 4,
        href: "#",
      },
      {
        number: 5,
        current: true,
        href: "#",
      },
      {
        number: 6,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const LastMinus4 = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 37,
        href: "#",
      },
      {
        number: 38,
        current: true,
        href: "#",
      },
      {
        number: 39,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const LastMinus3 = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 38,
        href: "#",
      },
      {
        number: 39,
        current: true,
        href: "#",
      },
      {
        number: 40,
        href: "#",
      },
      {
        number: 41,
        href: "#",
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const LastMinus2 = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 39,
        href: "#",
      },
      {
        number: 40,
        current: true,
        href: "#",
      },
      {
        number: 41,
        href: "#",
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const LastMinus1 = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 40,
        href: "#",
      },
      {
        number: 41,
        current: true,
        href: "#",
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    classes: "tna-pagination--demo",
  },
};

export const Last = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 41,
        href: "#",
      },
      {
        number: 42,
        current: true,
        href: "#",
      },
    ],
    classes: "tna-pagination--demo",
  },
};

export const Solid = {
  args: {
    previous: {
      href: "#",
    },
    items: [
      {
        number: 1,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 6,
        href: "#",
      },
      {
        number: 7,
        current: true,
        href: "#",
      },
      {
        number: 8,
        href: "#",
      },
      {
        ellipsis: true,
      },
      {
        number: 42,
        href: "#",
      },
    ],
    next: {
      href: "#",
    },
    solid: true,
    classes: "tna-pagination--demo",
  },
};

export const NoNumbers = {
  args: {
    previous: {
      href: "#",
      text: "TS 11/45/166",
      title: "From the catalogue: TS 11/45/166",
    },
    currentItemText: "From the catalogue: TS 11/45/167",
    next: {
      href: "#",
      text: "TS 11/45/168",
      title: "From the catalogue: TS 11/45/168",
    },
    spaced: true,
    classes: "tna-pagination--demo",
  },
};
