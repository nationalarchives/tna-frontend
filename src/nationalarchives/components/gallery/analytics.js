import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-gallery",
    areaName: "gallery",
    rootEventName: "select_media",
    rootData: {
      media_type: "gallery",
      media_duration: ($el, $scope) =>
        $scope.querySelectorAll(".tna-gallery__navigation-item").length,
      media_provider: "tna",
      media_title: ($el, $scope, event, index, instance) =>
        $scope.querySelector(".tna-gallery__header-inner")?.innerText?.trim() ||
        `gallery_${instance}`,
      media_progress: ($el, $scope) =>
        (Array.from(
          $scope.querySelectorAll(".tna-gallery__navigation-item"),
        ).findIndex(
          ($itemButton) => $itemButton.getAttribute("aria-current") === "true",
        ) || -1) + 1,
    },
    events: [
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-item",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link: "image",
          media_action: "progress",
          media_progress: valueGetters.index,
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-prev",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope
              .querySelector(
                ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
              )
              ?.innerText?.trim(),
        },
        rootData: {
          data_link: "previous",
          media_action: "progress",
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-next",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope
              .querySelector(
                ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
              )
              ?.innerText?.trim(),
        },
        rootData: {
          data_link: "next",
          media_action: "progress",
        },
      },
      {
        eventName: "keypress",
        on: "keydown",
        onCondition: ($el, $scope, event) =>
          [
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "End",
            "Home",
            // "Escape",
          ].includes(event.key),
        data: {
          value: ($el, $scope, event) => event.key,
        },
        rootData: {
          data_link: "keypress",
          media_action: "progress",
        },
      },
    ],
  },
];
