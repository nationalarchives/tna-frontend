import Details from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Details",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      body: { control: "text" },
      text: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Details, { params });
  },
};

export const Standard = {
  args: {
    title: "Details",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
    classes: "tna-details--demo",
  },
};
