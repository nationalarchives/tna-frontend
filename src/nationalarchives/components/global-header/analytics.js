export default [
  {
    scope: ".tna-global-header",
    areaName: "header",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-global-header__navigation-button",
        on: "click",
        data: {
          // eslint-disable-next-line no-unused-vars
          state: ($el, $scope, event) => {
            const expanded = $el.getAttribute("aria-expanded");
            if (expanded === null) {
              return null;
            }
            return expanded.toString() === "true" ? "opened" : "closed";
          },
        },
      },
    ],
  },
];
