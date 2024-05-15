import Accordion from "./template.njk";
import macroOptions from "./macro-options.json";
// import { within, userEvent, expect } from "@storybook/test";

const argTypes = {
  items: { control: "object" },
  group: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Accordion",
  argTypes,
};

const Template = ({ items, group, classes, attributes }) =>
  Accordion({
    params: { items, group, classes, attributes },
  });

export const Standard = Template.bind({});
Standard.args = {
  items: [
    {
      title: "Alpha",
      text: "Content",
      // open: true,
    },
    {
      title: "Beta",
      body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
    },
    {
      title: "Gamma",
      body: `<table class="tna-table">
  <caption class="tna-table__caption">
    Records added and removed between 2020 and 2022.
  </caption>
  <thead class="tna-table__head">
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="col">Year</th>
      <th class="tna-table__header" scope="col">Chinese zodiac sign</th>
      <th class="tna-table__header tna-table__header--numeric" scope="col">Records added</th>
      <th class="tna-table__header tna-table__header--numeric" scope="col">Size (megabytes)</th>
    </tr>
  </thead>
  <tbody class="tna-table__body">
    <tr>
      <th class="tna-table__header" scope="row">2020</th>
      <td class="tna-table__cell">Rat</td>
      <td class="tna-table__cell tna-table__cell--numeric">123,456</td>
      <td class="tna-table__cell tna-table__cell--numeric">789</td>
    </tr>
    <tr>
      <th class="tna-table__header" scope="row">2021</th>
      <td class="tna-table__cell">Ox</td>
      <td class="tna-table__cell tna-table__cell--numeric">456,789</td>
      <td class="tna-table__cell tna-table__cell--numeric">123</td>
    </tr>
    <tr>
      <th class="tna-table__header" scope="row">2022</th>
      <td class="tna-table__cell">Tiger</td>
      <td class="tna-table__cell tna-table__cell--numeric">42,424</td>
      <td class="tna-table__cell tna-table__cell--numeric">1,337</td>
    </tr>
  </tbody>
  <tfoot class="tna-table__foot">
    <tr>
      <th class="tna-table__header" scope="row">Totals</th>
      <td class="tna-table__cell"></td>
      <td class="tna-table__cell tna-table__cell--numeric">622,669</td>
      <td class="tna-table__cell tna-table__cell--numeric">2,249</td>
    </tr>
  </tfoot>
</table>`,
    },
    {
      title: "Gamma 2",
      body: `<div class="tna-table-wrapper">
  <table class="tna-table">
    <caption class="tna-table__caption">
      Records added and removed between 2020 and 2022.
    </caption>
    <thead class="tna-table__head">
      <tr class="tna-table__row">
        <th class="tna-table__header" scope="col">Year</th>
        <th class="tna-table__header" scope="col">Chinese zodiac sign</th>
        <th class="tna-table__header tna-table__header--numeric" scope="col">Records added</th>
        <th class="tna-table__header tna-table__header--numeric" scope="col">Size (megabytes)</th>
      </tr>
    </thead>
    <tbody class="tna-table__body">
      <tr>
        <th class="tna-table__header" scope="row">2020</th>
        <td class="tna-table__cell">Rat</td>
        <td class="tna-table__cell tna-table__cell--numeric">123,456</td>
        <td class="tna-table__cell tna-table__cell--numeric">789</td>
      </tr>
      <tr>
        <th class="tna-table__header" scope="row">2021</th>
        <td class="tna-table__cell">Ox</td>
        <td class="tna-table__cell tna-table__cell--numeric">456,789</td>
        <td class="tna-table__cell tna-table__cell--numeric">123</td>
      </tr>
      <tr>
        <th class="tna-table__header" scope="row">2022</th>
        <td class="tna-table__cell">Tiger</td>
        <td class="tna-table__cell tna-table__cell--numeric">42,424</td>
        <td class="tna-table__cell tna-table__cell--numeric">1,337</td>
      </tr>
    </tbody>
    <tfoot class="tna-table__foot">
      <tr>
        <th class="tna-table__header" scope="row">Totals</th>
        <td class="tna-table__cell"></td>
        <td class="tna-table__cell tna-table__cell--numeric">622,669</td>
        <td class="tna-table__cell tna-table__cell--numeric">2,249</td>
      </tr>
    </tfoot>
  </table>
</div>`,
    },
  ],
  group: "test",
  classes: "tna-accordion--demo",
};
