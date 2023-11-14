import Pagination from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  landmarkLabel: { control: "text" },
  previous: { control: "object" },
  items: { control: "object" },
  next: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Pagination",
  argTypes,
};

const Template = ({ previous, items, next, classes, attributes }) =>
  Pagination({
    params: {
      previous,
      items,
      next,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
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
};

export const First = Template.bind({});
First.args = {
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
};

export const Second = Template.bind({});
Second.args = {
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
};

export const Third = Template.bind({});
Third.args = {
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
};

export const Forth = Template.bind({});
Forth.args = {
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
};

export const Fifth = Template.bind({});
Fifth.args = {
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
};

export const LastMinus4 = Template.bind({});
LastMinus4.args = {
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
};

export const LastMinus3 = Template.bind({});
LastMinus3.args = {
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
};

export const LastMinus2 = Template.bind({});
LastMinus2.args = {
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
};

export const LastMinus1 = Template.bind({});
LastMinus1.args = {
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
};

export const Last = Template.bind({});
Last.args = {
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
};
