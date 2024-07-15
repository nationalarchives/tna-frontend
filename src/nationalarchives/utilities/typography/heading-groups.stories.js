const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  level: { control: "number", min: 1, max: 6, step: 1 },
  size: { control: "radio", options: ["m", "l", "xl"] },
  plainSupertitle: { control: "boolean" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const HeadingGroupTemplate = ({
  supertitle,
  title,
  level,
  size,
  plainSupertitle,
}) =>
  `<hgroup class="tna-hgroup-${size}">
  <p class="tna-hgroup__supertitle${
    plainSupertitle ? " tna-hgroup__supertitle--plain" : ""
  }">${supertitle}</p>
  <h${level} class="tna-hgroup__title">${title}</h${level}>
</hgroup>`;

export const HeadingGroup = HeadingGroupTemplate.bind({});
HeadingGroup.parameters = {
  chromatic: { disableSnapshot: true },
};
HeadingGroup.args = {
  supertitle: "Record revealed",
  title: "The Monteagle Letter",
  level: 3,
  size: "l",
  plainSupertitle: false,
};

const HeadingGroupSingleSentenceTemplate = ({
  supertitle,
  title,
  level,
  size,
  plainSupertitle,
}) =>
  `<hgroup class="tna-hgroup-${size}">
  <h${level} class="tna-hgroup__title">
    <span class="tna-hgroup__supertitle${
      plainSupertitle ? " tna-hgroup__supertitle--plain" : ""
    }">${supertitle}</span>
    <span class="tna-hgroup__title">${title}</span>
  </h${level}>
</hgroup>`;

export const HeadingGroupSingleSentence =
  HeadingGroupSingleSentenceTemplate.bind({});
HeadingGroupSingleSentence.parameters = {
  chromatic: { disableSnapshot: true },
};
HeadingGroupSingleSentence.args = {
  supertitle: "The story of",
  title: "Alice Hawkins",
  level: 3,
  size: "l",
  plainSupertitle: false,
};

const HeadingGroupPlainSupertitleTemplate = ({
  supertitle,
  title,
  level,
  size,
  plainSupertitle,
}) =>
  `<hgroup class="tna-hgroup-${size}">
  <p class="tna-hgroup__supertitle${
    plainSupertitle ? " tna-hgroup__supertitle--plain" : ""
  }">${supertitle}</p>
  <h${level} class="tna-hgroup__title">${title}</h${level}>
</hgroup>`;

export const HeadingGroupPlainSupertitle =
  HeadingGroupPlainSupertitleTemplate.bind({});
HeadingGroupPlainSupertitle.parameters = {
  chromatic: { disableSnapshot: true },
};
HeadingGroupPlainSupertitle.args = {
  supertitle: "Record revealed",
  title: "The Monteagle Letter",
  level: 3,
  size: "l",
  plainSupertitle: true,
};
