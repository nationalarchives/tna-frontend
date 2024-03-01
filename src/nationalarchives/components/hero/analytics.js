export default [
  {
    scope: ".tna-hero",
    areaName: "hero",
    events: [
      {
        eventName: "toggle_caption",
        targetElement: ".tna-hero__details-summary",
        on: "click",
        data: {
          // eslint-disable-next-line no-unused-vars
          state: ($el, $scope, event) => {
            const wasExpanded =
              $scope
                .querySelector(".tna-hero__details")
                ?.hasAttribute("open") ?? false;
            return wasExpanded ? "closed" : "opened";
          },
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) =>
            $scope.querySelector("img[alt]")?.getAttribute("alt"),
        },
      },
    ],
  },
];
