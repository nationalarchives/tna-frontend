import Pagination from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  previous: { control: "object" },
  items: { control: "object" },
  next: { control: "object" },
  currentItemText: { control: "text" },
  spaced: { control: "boolean" },
  landmarkLabel: { control: "text" },
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

const Template = ({
  previous,
  items,
  next,
  currentItemText,
  spaced,
  landmarkLabel,
  classes,
  attributes,
}) =>
  Pagination({
    params: {
      previous,
      items,
      next,
      currentItemText,
      spaced,
      landmarkLabel,
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
First.parameters = {
  chromatic: { disableSnapshot: true },
};
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
Second.parameters = {
  chromatic: { disableSnapshot: true },
};
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
Third.parameters = {
  chromatic: { disableSnapshot: true },
};
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
Forth.parameters = {
  chromatic: { disableSnapshot: true },
};
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
Fifth.parameters = {
  chromatic: { disableSnapshot: true },
};
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
LastMinus4.parameters = {
  chromatic: { disableSnapshot: true },
};
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
LastMinus3.parameters = {
  chromatic: { disableSnapshot: true },
};
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
LastMinus2.parameters = {
  chromatic: { disableSnapshot: true },
};
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
LastMinus1.parameters = {
  chromatic: { disableSnapshot: true },
};
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
Last.parameters = {
  chromatic: { disableSnapshot: true },
};
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

export const NoNumbers = Template.bind({});
NoNumbers.args = {
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
};
