import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Pagination",
  argTypes: Object.fromEntries(
    Object.entries({
      previous: { control: "object" },
      items: { control: "object" },
      next: { control: "object" },
      landmarkLabel: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  render: (params) => {
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
  },
};

export const NoNumbers = {
  args: {
    previous: {
      href: "#",
      text: "Previous: TS 11/45/166",
      description: "Previous item description",
    },
    next: {
      href: "#",
      text: "Next: TS 11/45/168",
      description:
        "Next item description which is quite long and should wrap onto multiple lines to test the layout of the pagination component when this happens",
    },
  },
};
