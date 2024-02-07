export default [
  {
    scope: ".tna-picture",
    areaName: "picture",
    events: [
      {
        eventName: "toggle_transcript",
        targetElement: ".tna-picture__toggle-transcript",
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
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) => {
            const includesAny = (arr, values) =>
              values.some((v) => arr.includes(v));
            let heading = "";
            let $search = $scope;
            do {
              while ($search.previousElementSibling) {
                $search = $search.previousElementSibling;
                if (
                  ["h1", "h2", "h3", "h4", "h5", "h6"].includes(
                    $search.tagName,
                  ) ||
                  ($search.classList.length &&
                    includesAny(Array.from($search.classList), [
                      "tna-heading-xl",
                      "tna-heading-l",
                      "tna-heading-m",
                      "tna-heading-s",
                    ]))
                ) {
                  heading = $search.innerText;
                  break;
                }
              }
              $search = $search.parentElement;
            } while ($search.parentElement && !heading);
            const image = $scope.querySelector(".tna-picture__image");
            const imageSrc = image.getAttribute("src");
            const imageAlt = image.getAttribute("alt");
            const value = `${imageAlt} (${imageSrc})`;
            return heading ? `${heading} > ${value}` : value;
          },
        },
      },
    ],
  },
];
