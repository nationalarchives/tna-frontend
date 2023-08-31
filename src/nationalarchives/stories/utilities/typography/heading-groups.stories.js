const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  level: { control: "number", min: 1, max: 6, step: 1 },
  size: { control: "radio", options: ["m", "l", "xl"] },
  singleSentence: { control: "boolean" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const Template = ({
  supertitle,
  title,
  level = 3,
  size = "l",
  singleSentence,
}) =>
  singleSentence
    ? `<hgroup class="tna-hgroup tna-hgroup--${size}">
  <h${level} class="tna-hgroup__title">
    <span class="tna-hgroup__supertitle">${supertitle}</span>
    <span class="tna-hgroup__title">${title}</span>
  </h${level}>
</hgroup>`
    : `<hgroup class="tna-hgroup tna-hgroup--${size}">
  <p class="tna-hgroup__supertitle">${supertitle}</p>
  <h${level} class="tna-hgroup__title">${title}</h${level}>
</hgroup>`;

export const HeadingGroup = Template.bind({});
HeadingGroup.args = {
  supertitle: "The story of",
  title: "Alice Hawkins",
  singleSentence: true,
};

export const HeadingGroupSeparated = Template.bind({});
HeadingGroupSeparated.args = {
  supertitle: "Record revealed",
  title: "The Monteagle Letter",
  singleSentence: false,
};
