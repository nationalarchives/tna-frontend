export default {
  title: "Tests/Blank",
  render: () => {
    return `
      <div data-module="tna-accordion"></div>
      <div data-module="tna-breadcrumbs"></div>
      <div data-module="tna-cookie-banner"></div>
      <div data-module="tna-date-input-progressive"></div>
      <div data-module="tna-error-summary"></div>
      <div data-module="tna-file-input"></div>
      <div data-module="tna-footer"></div>
      <div data-module="tna-gallery"></div>
      <div data-module="tna-global-header"></div>
      <div data-module="tna-header"></div>
      <div data-module="tna-picture"></div>
      <div data-module="tna-skip-link"></div>
      <div data-module="tna-text-input"></div>
      <div data-module="tna-tabs"></div>
    `;
  },
};

export const Standard = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
