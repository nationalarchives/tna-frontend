export default {
  title: "Utilities/Tables",
};

const TableTemplate = () =>
  `<div class="tna-container">
  <div class="tna-column tna-column--full">
    <div class="tna-table-wrapper">
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
          <tr class="tna-table__row">
            <th class="tna-table__header" scope="row">2020</th>
            <td class="tna-table__cell">Rat</td>
            <td class="tna-table__cell tna-table__cell--numeric">123,456</td>
            <td class="tna-table__cell tna-table__cell--numeric">789</td>
          </tr>
          <tr class="tna-table__row">
            <th class="tna-table__header" scope="row">2021</th>
            <td class="tna-table__cell">Ox</td>
            <td class="tna-table__cell tna-table__cell--numeric">456,789</td>
            <td class="tna-table__cell tna-table__cell--numeric">123</td>
          </tr>
          <tr class="tna-table__row">
            <th class="tna-table__header" scope="row">2022</th>
            <td class="tna-table__cell">Tiger</td>
            <td class="tna-table__cell tna-table__cell--numeric">42,424</td>
            <td class="tna-table__cell tna-table__cell--numeric">1,337</td>
          </tr>
        </tbody>
        <tfoot class="tna-table__foot">
          <tr class="tna-table__row">
            <th class="tna-table__header" scope="row">Totals</th>
            <td class="tna-table__cell"></td>
            <td class="tna-table__cell tna-table__cell--numeric">622,669</td>
            <td class="tna-table__cell tna-table__cell--numeric">2,249</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>`;
export const Table = TableTemplate.bind({});
