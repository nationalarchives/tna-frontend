export default {
  title: "Utilities/Tables",
};

const TableTemplate = () =>
  `<table class="tna-table">
  <caption class="tna-table__caption tna-heading-m tna-visually-hidden">Primary options</caption>
  <thead class="tna-table__head">
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="col">Name</th>
      <th class="tna-table__header" scope="col">Type</th>
      <th class="tna-table__header" scope="col">Description</th>
    </tr>
  </thead>
  <tbody class="tna-table__body">
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="row">items</th>
      <td class="tna-table__cell">array</td>
      <td class="tna-table__cell">
        <p><strong>Required.</strong></p>
        <p>See items.</p>
      </td>
    </tr>
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="row">noCollapse</th>
      <td class="tna-table__cell">string</td>
      <td class="tna-table__cell"></td>
    </tr>
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="row">classes</th>
      <td class="tna-table__cell">string</td>
      <td class="tna-table__cell">
        <p>Classes to add to the breadcrumbs.</p>
      </td>
    </tr>
    <tr class="tna-table__row">
      <th class="tna-table__header" scope="row">attributes</th>
      <td class="tna-table__cell">object</td>
      <td class="tna-table__cell">
        <p>HTML attributes (for example data attributes) to add to the breadcrumbs.</p>
      </td>
    </tr>
  </tbody>
</table>`;
export const Table = TableTemplate.bind({});
