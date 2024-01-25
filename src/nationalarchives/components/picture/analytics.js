export default [
  {
    scope: ".tna-picture",
    areaName: "picture",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-picture__toggle-transcript",
        onEvent: "click",
        data: {
          // eslint-disable-next-line no-unused-vars
          state: ($el, $scope, event) => {
            const expanded = $el.getAttribute("aria-expanded");
            if (expanded === null) {
              return null;
            }
            return expanded.toString() === "true" ? "expanded" : "closed";
          },
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) =>
            $scope.querySelector(".tna-picture__image").getAttribute("alt"),
        },
      },
    ],
  },
];
