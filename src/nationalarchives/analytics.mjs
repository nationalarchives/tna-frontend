import Cookies from "./lib/cookies.mjs";

const valueGetters = {
  text: (el) => el.innerText,
  html: (el) => el.innerHTML,
};

const config = {
  breadcrumbs: [
    {
      onEvent: "click",
      targetElement:
        ".tna-breadcrumbs__item:not(.tna-breadcrumbs__item--expandable) .tna-breadcrumbs__link",
      data: { event: "click", value: valueGetters.text },
    },
    {
      onEvent: "click",
      targetElement:
        ".tna-breadcrumbs__item--expandable button.tna-breadcrumbs__link",
      data: { event: "expand", value: valueGetters.html },
    },
  ],
};

class GoogleAnalytics4 {
  /** @protected */
  cookies = new Cookies();

  constructor(id) {
    console.log(`BOOM! ${id}`);
    console.log(this.cookies);
    console.log(config);

    Object.keys(config).forEach((component) => {
      config[component].forEach((componentTracking) => {
        Array.from(
          document.querySelectorAll(componentTracking.targetElement),
        ).forEach((element) => {
          const el = element;
          let data = componentTracking.data;
          el.addEventListener(componentTracking.onEvent, (event) => {
            event.preventDefault();
            console.log(data.value);
            console.log(data.value.call(this, el));
            data = {
              ...data,
              value: data.value.call(this, el),
            };
            console.log(data);
          });
        });
      });
    });
  }

  _addTrackingCode() {}
  _removeTrackingCode() {}
}

export { GoogleAnalytics4 };
