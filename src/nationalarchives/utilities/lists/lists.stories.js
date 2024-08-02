const argTypes = {
  items: { control: "object" },
  plain: { control: "boolean" },
  classes: { control: "text" },
};

export default {
  title: "Utilities/Lists",
  argTypes,
};

const UnorderedListTemplate = ({ items, style, classes = "" }) =>
  `<ul class="tna-ul${style ? ` tna-ul--${style}` : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    "",
  )}</ul>`;
export const UnorderedList = UnorderedListTemplate.bind({});
UnorderedList.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};
export const UnorderedListPlain = UnorderedListTemplate.bind({});
UnorderedListPlain.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "plain",
};
export const UnorderedListDashed = UnorderedListTemplate.bind({});
UnorderedListDashed.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListDashed.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "dashed",
};

const UnorderedListNestedTemplate = ({ items, style, classes = "" }) =>
  `<ul class="tna-ul${style ? ` tna-ul--${style}` : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}
      <ul class="tna-ul${style ? ` tna-ul--${style}` : ""} ${classes}">${items.reduce(
        (list, item) => `${list}<li>${item}</li>`,
        "",
      )}</ul>
    </li>`,
    "",
  )}</ul>`;
export const UnorderedListNested = UnorderedListNestedTemplate.bind({});
UnorderedListNested.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListNested.args = {
  items: ["Alpha", "Beta", "Gamma", "Delta"],
};

const OrderedListTemplate = ({ items, style, classes = "" }) =>
  `<ol class="tna-ol${style ? ` tna-ol--${style}` : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    "",
  )}</ol>`;
export const OrderedList = OrderedListTemplate.bind({});
OrderedList.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};
export const OrderedListPlain = OrderedListTemplate.bind({});
OrderedListPlain.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "plain",
};
export const OrderedListDashed = OrderedListTemplate.bind({});
OrderedListDashed.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListDashed.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "dashed",
};

const OrderedListNestedTemplate = ({ items, style, classes = "" }) =>
  `<ol class="tna-ol${style ? ` tna-ol--${style}` : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}
      <ol class="tna-ol${style ? ` tna-ol--${style}` : ""} ${classes}">${items.reduce(
        (list, item) => `${list}<li>${item}</li>`,
        "",
      )}</ol>
    </li>`,
    "",
  )}</ol>`;
export const OrderedListNested = OrderedListNestedTemplate.bind({});
OrderedListNested.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListNested.args = {
  items: ["Alpha", "Beta", "Gamma", "Delta"],
};

const DescriptionListTemplate = ({ items, plain, classes = "" }) =>
  `<dl class="tna-dl${plain ? " tna-dl--plain" : ""}${
    items.some((item) => item.icon) ? " tna-dl--icon-padding" : ""
  } ${classes}">${items.reduce(
    (list, item) => `${list}
    <dt>
      ${
        item.icon
          ? `<i class="fa-solid fa-${item.icon}" aria-hidden="true"></i>`
          : ""
      }
      ${item.title}
    </dt>
    ${
      Array.isArray(item.description)
        ? item.description.reduce(
            (descriptions, description) =>
              `${descriptions}<dd>${description}</dd>`,
            "",
          )
        : `<dd>${item.description}</dd>`
    }`,
    "",
  )}
</dl>`;

export const DescriptionList = DescriptionListTemplate.bind({});
DescriptionList.parameters = {
  chromatic: { disableSnapshot: true },
};
DescriptionList.args = {
  items: [
    { title: "Alpha", description: "Lorem ipsum" },
    { title: "Beta", description: "Lorem ipsum" },
    { title: "Gamma", description: "Lorem ipsum" },
    { title: "Delta", description: "Lorem ipsum" },
    { title: "Epsilon", description: "Lorem ipsum" },
    { title: "Zeta", description: "Lorem ipsum" },
    { title: "Eta", description: "Lorem ipsum" },
  ],
};

export const PlainDescriptionList = DescriptionListTemplate.bind({});
PlainDescriptionList.parameters = {
  chromatic: { disableSnapshot: true },
};
PlainDescriptionList.args = {
  items: [
    { title: "Alpha", description: "Lorem ipsum" },
    { title: "Beta", description: "Lorem ipsum" },
    { title: "Gamma", description: "Lorem ipsum" },
    { title: "Delta", description: "Lorem ipsum" },
  ],
  plain: true,
};

export const DescriptionListWithIcons = DescriptionListTemplate.bind({});
DescriptionListWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
DescriptionListWithIcons.args = {
  items: [
    {
      title: "Held by",
      description: "The National Archives, Kew",
      icon: "landmark",
    },
    { title: "Date", description: "1972&ndash;1979", icon: "calendar" },
    { title: "Reference", description: "LC 4", icon: "database" },
  ],
};

export const PlainDescriptionListWithIcons = DescriptionListTemplate.bind({});
PlainDescriptionListWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
PlainDescriptionListWithIcons.args = {
  items: [
    {
      title: "Held by",
      description: "The National Archives, Kew",
      icon: "landmark",
    },
    { title: "Date", description: "1972&ndash;1979", icon: "calendar" },
    { title: "Reference", description: "LC 4", icon: "database" },
  ],
  plain: true,
};

export const ComplexDescriptionList = DescriptionListTemplate.bind({});
ComplexDescriptionList.parameters = {
  chromatic: { disableSnapshot: true },
};
ComplexDescriptionList.args = {
  items: [
    { title: "Alpha", description: "Lorem ipsum" },
    { title: "Beta", description: "Lorem ipsum" },
    {
      title: "Gamma",
      description: ["Lorem ipsum 1", "Lorem ipsum 2", "Lorem ipsum 3"],
    },
    {
      title: "Delta",
      description: ["Lorem ipsum 1", "Lorem ipsum 2", "Lorem ipsum 3"],
    },
    { title: "Epsilon", description: ["Lorem ipsum 1", "Lorem ipsum 2"] },
    { title: "Zeta", description: "Lorem ipsum" },
    { title: "Eta", description: ["Lorem ipsum 1", "Lorem ipsum 2"] },
  ],
};

const ChipListTemplate = ({ items, plain, classes = "" }) =>
  `<dl class="tna-dl-chips${plain ? " tna-dl-chips--plain" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}
    <dt>${item.title}</dt>
    <dd>
      <${item.href ? "a" : "span"} class="tna-dl-chips__item">
        ${item.icon ? `<i class="fa-solid fa-${item.icon}" aria-hidden="true"></i>` : ""}
        ${item.text}
      </${item.href ? "a" : "span"}>
    </dd>`,
    "",
  )}</dl>`;
export const ChipList = ChipListTemplate.bind({});
ChipList.parameters = {
  chromatic: { disableSnapshot: true },
};
ChipList.args = {
  items: [
    { title: "Published", text: "Saturday 28 June 2014", icon: "calendar" },
    { title: "Author", text: "James Cronan", icon: "user", href: "#" },
    { title: "Category", text: "Records and research", href: "#" },
    { title: "Comments", text: "3 comments" },
  ],
};
export const PlainChipList = ChipListTemplate.bind({});
PlainChipList.parameters = {
  chromatic: { disableSnapshot: true },
};
PlainChipList.args = {
  items: [
    { title: "Published", text: "Saturday 28 June 2014", icon: "calendar" },
    { title: "Author", text: "James Cronan", icon: "user", href: "#" },
    { title: "Category", text: "Records and research", href: "#" },
    { title: "Comments", text: "3 comments" },
  ],
  plain: true,
};
