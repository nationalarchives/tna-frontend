import Accordion from "./template.njk";
import macroOptions from "./macro-options.json";
import { fireEvent, expect } from "@storybook/test";

const argTypes = {
  itemHeadingLevel: { control: { type: "number", min: 1, max: 6 } },
  items: { control: "object" },
  id: { control: "text" },
  singleOpenItem: { control: "boolean" },
  toggleAllButton: { control: "object" },
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

const Template = (params) => Accordion({ params });

export const Standard = Template.bind({});
Standard.args = {
  itemHeadingLevel: 2,
  items: [
    {
      title: "Alpha",
      text: "Content",
    },
    {
      title: "Beta",
      body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
    },
    {
      title: "Gamma",
      body: `<ul class="tna-ul">
  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
  <li>Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim.</li>
  <li>Donec bibendum est leo, sed dapibus mauris facilisis vitae.</li>
  <li>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi.</li>
</ul>`,
    },
    {
      title: "Delta",
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
  id: "accordion-example-Standard",
  classes: "tna-accordion--demo",
};

export const OpenItems = Template.bind({});
OpenItems.parameters = {
  chromatic: { disableSnapshot: true },
};
OpenItems.args = {
  itemHeadingLevel: 2,
  items: [
    {
      title: "Alpha",
      text: "Content",
    },
    {
      title: "Beta",
      body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
    },
    {
      title: "Gamma",
      body: `<ul class="tna-ul">
  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
  <li>Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim.</li>
  <li>Donec bibendum est leo, sed dapibus mauris facilisis vitae.</li>
  <li>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi.</li>
</ul>`,
      open: true,
    },
    {
      title: "Delta",
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
  id: "accordion-example-OpenItems",
  classes: "tna-accordion--demo",
};

export const SingleOpenItem = Template.bind({});
SingleOpenItem.parameters = {
  chromatic: { disableSnapshot: true },
};
SingleOpenItem.args = {
  ...Standard.args,
  singleOpenItem: true,
};

export const ToggleAllButton = Template.bind({});
ToggleAllButton.parameters = {
  chromatic: { disableSnapshot: true },
};
ToggleAllButton.args = {
  ...Standard.args,
  toggleAllButton: {
    enabled: true,
    // openAllLabel: "Expand all",
    // closeAllLabel: "Collapse all",
  },
};

export const Test = Template.bind({});
Test.parameters = {
  chromatic: { disableSnapshot: true },
};
Test.args = { ...SingleOpenItem.args };
Test.play = async ({ step }) => {
  const $allDetails = Array.from(
    document.querySelectorAll(".tna-accordion__details"),
  );

  await step("Initial load", async () => {
    await $allDetails.forEach(async ($details) => {
      await expect(
        $details.querySelector(".tna-accordion__summary"),
      ).toBeVisible();
      await expect(
        $details.querySelector(".tna-accordion__content"),
      ).not.toBeVisible();
    });
  });

  await step("Open first item", async () => {
    await fireEvent.click(
      $allDetails[0].querySelector(".tna-accordion__summary"),
    );
    await $allDetails.forEach(async ($details, index) => {
      if (index === 0) {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).toBeVisible();
      } else {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).not.toBeVisible();
      }
    });
  });

  await step("Close first item", async () => {
    await fireEvent.click(
      $allDetails[0].querySelector(".tna-accordion__summary"),
    );
    await $allDetails.forEach(async ($details) => {
      await expect(
        $details.querySelector(".tna-accordion__content"),
      ).not.toBeVisible();
    });
  });

  await step("Open first item", async () => {
    await fireEvent.click(
      $allDetails[0].querySelector(".tna-accordion__summary"),
    );
    await $allDetails.forEach(async ($details, index) => {
      if (index === 0) {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).toBeVisible();
      } else {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).not.toBeVisible();
      }
    });
  });

  // TODO: fireEvent doesn't work on Firefox
  await step("Open second item", async () => {
    await fireEvent.click(
      $allDetails[1].querySelector(".tna-accordion__summary"),
    );
    await $allDetails.forEach(async ($details, index) => {
      if (index === 1) {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).toBeVisible();
      } else {
        await expect(
          $details.querySelector(".tna-accordion__content"),
        ).not.toBeVisible();
      }
    });
  });

  await step("Close second item", async () => {
    await fireEvent.click(
      $allDetails[1].querySelector(".tna-accordion__summary"),
    );
    await $allDetails.forEach(async ($details) => {
      await expect(
        $details.querySelector(".tna-accordion__content"),
      ).not.toBeVisible();
    });
  });
};
