const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  level: { control: "number", min: 1, max: 6, step: 1 },
  size: { control: "radio", options: ["m", "l", "xl"] },
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
}) => `<hgroup class="tna-hgroup tna-hgroup--${size}">
  <p class="tna-hgroup__supertitle">${supertitle}</p>
  <h${level} class="tna-hgroup__title">${title}</h${level}>
</hgroup>`;

export const HeadingGroup = Template.bind({});
HeadingGroup.args = {
  supertitle: "Record revealed",
  title: "The Monteagle Letter",
};
