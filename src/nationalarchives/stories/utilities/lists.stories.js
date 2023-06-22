const argTypes = {
  items: { control: "object" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const UnorderedListTemplate = ({ items, plain }) =>
  `<ul class="tna-ul${plain ? " tna-ul--plain" : ""}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    ""
  )}</ul>`;
export const UnorderedList = UnorderedListTemplate.bind({});
UnorderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};
export const UnorderedListPlain = UnorderedListTemplate.bind({});
UnorderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  plain: true,
};

const OrderedListTemplate = ({ items, plain }) =>
  `<ol class="tna-ol${plain ? " tna-ol--plain" : ""}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    ""
  )}</ol>`;
export const OrderedList = OrderedListTemplate.bind({});
OrderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};
export const OrderedListPlain = OrderedListTemplate.bind({});
OrderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  plain: true,
};
