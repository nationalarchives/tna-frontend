import Details from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  body: { control: "text" },
  text: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Details",
  argTypes,
};

const Template = ({ title, body, text, classes, attributes }) =>
  Details({
    params: { title, body, text, classes, attributes },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "Details",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
  classes: "tna-details--demo",
};
