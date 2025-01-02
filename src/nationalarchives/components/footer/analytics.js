import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-footer",
    areaName: "footer",
    rootEventName: "global_navigation",
    rootData: {
      data_component_name: "footer",
    },
    events: [
      {
        eventName: "link.click",
        targetElement: ".tna-footer__navigation-block-item-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "link",
          data_section: valueGetters.closestHeading,
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "social_link.click",
        targetElement: ".tna-footer__social-item-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "icon",
          data_section: "Social media",
          data_link: ($el) => $el.dataset.name,
        },
      },
      {
        eventName: "legal_link.click",
        targetElement: ".tna-footer__legal-item-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "link",
          data_section: "Legal information",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "mailing_list.click",
        targetElement: ".tna-footer__mailing-list a.tna-button",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "button",
          data_section: "Mailing list",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "ogl.click",
        targetElement: ".tna-footer__licence p a.tna-footer__link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "link",
          data_section: "OGL",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "govuk.click",
        targetElement: ".tna-footer__govuk-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_link_type: "Logo",
          data_section: "GOV.UK",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "theme.change",
        targetElement: ".tna-footer__theme-selector-button",
        on: "click",
        data: {
          value: valueGetters.value,
        },
      },
    ],
  },
];
