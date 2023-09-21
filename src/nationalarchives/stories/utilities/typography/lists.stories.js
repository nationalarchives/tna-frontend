const argTypes = {
  items: { control: "object" },
  plain: { control: "boolean" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const UnorderedListTemplate = ({ items, plain }) =>
  `<ul class="tna-ul${plain ? " tna-ul--plain" : ""}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    "",
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
    "",
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

const DescriptionListTemplate = ({ items, plain }) =>
  `<dl class="tna-dl${plain ? " tna-dl--plain" : ""}${
    items.some((item) => item.icon) ? " tna-dl--icon-padding" : ""
  }">${items.reduce(
    (list, item) => `${list}
    <dt>
      ${item.icon ? `<i class="fa-solid fa-${item.icon}"></i>` : ""}
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
