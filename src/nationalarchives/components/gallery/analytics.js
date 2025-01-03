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
      media_title: ($el, $scope) =>
        $scope.querySelector(".tna-gallery__header-inner").innerText,
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
          data_position: valueGetters.index,
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-prev",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope.querySelector(
              ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
            ).innerText,
        },
        rootData: {
          data_link: "previous",
          media_action: "progress",
          data_position: ($el, $scope) =>
            (Array.from(
              $scope.querySelectorAll(".tna-gallery__navigation-item"),
            ).findIndex(
              ($itemButton) =>
                $itemButton.getAttribute("aria-current") === "true",
            ) || -1) + 1,
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-next",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope.querySelector(
              ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
            ).innerText,
        },
        rootData: {
          data_link: "next",
          media_action: "progress",
          data_position: ($el, $scope) =>
            Array.from(
              $scope.querySelectorAll(".tna-gallery__navigation-item"),
            ).findIndex(
              ($itemButton) =>
                $itemButton.getAttribute("aria-current") === "true",
            ) + 1,
        },
      },
      {
        eventName: "keypress",
        on: "keydown",
        data: {
          value: ($el, $scope, event) => event.key,
        },
      },
      {
        eventName: "enter-fullscreen",
        targetElement: '.tna-gallery__options button[value="enter-fullscreen"]',
        on: "click",
        rootData: {
          data_link_type: "full_screen_button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "exit-fullscreen",
        targetElement: '.tna-gallery__options button[value="exit-fullscreen"]',
        on: "click",
        rootData: {
          data_link_type: "full_screen_button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "index",
        targetElement: '.tna-gallery__options button[value="show-index"]',
        on: "click",
      },
    ],
  },
];
