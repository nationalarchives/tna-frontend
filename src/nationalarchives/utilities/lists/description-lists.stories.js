const argTypes = {
  items: { control: "object" },
  style: {
    control: "inline-radio",
    options: ["none", "zebra", "lined"],
  },
  stacked: {
    control: "boolean",
  },
  classes: { control: "text" },
};

export default {
  title: "Utilities/Lists/Description",
  argTypes,
};

const DescriptionListTemplate = ({ items, style, stacked, classes = "" }) =>
  `<dl class="tna-dl${style ? ` tna-dl--${style}` : ""}${stacked ? " tna-dl--stacked" : ""}${
    items.some((item) => item.icon) ? " tna-dl--icon-padding" : ""
  } ${classes}">${items.reduce(
    (list, item) => `${list}
    <dt>
      ${
        item.icon
          ? `<i class="fa-solid fa-${item.icon} fa-fw" aria-hidden="true"></i>`
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
  ],
};

export const ZebraDescriptionList = DescriptionListTemplate.bind({});
ZebraDescriptionList.parameters = {
  chromatic: { disableSnapshot: true },
};
ZebraDescriptionList.args = {
  items: [
    { title: "Alpha", description: "Lorem ipsum" },
    { title: "Beta", description: "Lorem ipsum" },
    { title: "Gamma", description: "Lorem ipsum" },
    { title: "Delta", description: "Lorem ipsum" },
    { title: "Epsilon", description: "Lorem ipsum" },
  ],
  style: "zebra",
};

export const LinedDescriptionList = DescriptionListTemplate.bind({});
LinedDescriptionList.parameters = {
  chromatic: { disableSnapshot: true },
};
LinedDescriptionList.args = {
  items: [
    { title: "Alpha", description: "Lorem ipsum" },
    { title: "Beta", description: "Lorem ipsum" },
    { title: "Gamma", description: "Lorem ipsum" },
    { title: "Delta", description: "Lorem ipsum" },
    { title: "Epsilon", description: "Lorem ipsum" },
  ],
  style: "lined",
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

export const ZebraDescriptionListWithIcons = DescriptionListTemplate.bind({});
ZebraDescriptionListWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
ZebraDescriptionListWithIcons.args = {
  items: [
    {
      title: "Held by",
      description: "The National Archives, Kew",
      icon: "landmark",
    },
    { title: "Date", description: "1972&ndash;1979", icon: "calendar" },
    { title: "Reference", description: "LC 4", icon: "database" },
  ],
  style: "zebra",
};

export const LinedDescriptionListWithIcons = DescriptionListTemplate.bind({});
LinedDescriptionListWithIcons.parameters = {
  chromatic: { disableSnapshot: true },
};
LinedDescriptionListWithIcons.args = {
  items: [
    {
      title: "Held by",
      description: "The National Archives, Kew",
      icon: "landmark",
    },
    { title: "Date", description: "1972&ndash;1979", icon: "calendar" },
    { title: "Reference", description: "LC 4", icon: "database" },
  ],
  style: "lined",
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
