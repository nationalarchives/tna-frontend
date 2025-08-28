const getFileDetails = ($el) =>
  JSON.stringify(
    Array.from($el.files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })),
  );

export default [
  {
    scope: ".tna-file-input",
    areaName: "file-input",
    events: [
      {
        eventName: "blurred",
        on: "blur",
        data: {
          value: getFileDetails,
          state: ($el) => $el.files.length,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope) =>
            $scope
              .closest(".tna-form-item")
              ?.querySelector(".tna-form-item__heading")
              ?.innerText?.trim(),
        },
      },
      {
        eventName: "cancelled",
        on: "cancel",
        data: {
          value: getFileDetails,
          state: ($el) => $el.files.length,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope) =>
            $scope
              .closest(".tna-form-item")
              ?.querySelector(".tna-form-item__heading")
              ?.innerText?.trim(),
        },
      },
      {
        eventName: "changed",
        on: "change",
        data: {
          value: getFileDetails,
          state: ($el) => $el.files.length,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope) =>
            $scope
              .closest(".tna-form-item")
              ?.querySelector(".tna-form-item__heading")
              ?.innerText?.trim(),
        },
      },
    ],
  },
];
