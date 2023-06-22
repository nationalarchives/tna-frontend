const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  singleSentence: { control: "boolean" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const Template = ({ supertitle, title, singleSentence }) =>
  singleSentence
    ? `<hgroup class="tna-hgroup tna-hgroup--heading-2">
  <h2 class="tna-hgroup__title">
    <span class="tna-hgroup__supertitle">${supertitle}</span>
    ${title}
  </h2>
</hgroup>`
    : `<hgroup class="tna-hgroup tna-hgroup--heading-2">
  <p class="tna-hgroup__supertitle">${supertitle}</p>
  <h2 class="tna-hgroup__title">${title}</h2>
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
};
