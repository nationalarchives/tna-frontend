const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const Template = ({
  supertitle,
  title,
}) => `<hgroup class="tna-hgroup tna-hgroup--heading-2">
  <p class="tna-hgroup__supertitle">${supertitle}</p>
  <h2 class="tna-hgroup__title">${title}</h2>
</hgroup>`;

export const HeadingGroup = Template.bind({});
HeadingGroup.args = {
  supertitle: "The story of",
  title: "This is a title",
};
