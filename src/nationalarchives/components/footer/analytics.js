import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-footer",
    areaName: "footer",
    rootEventName: "global_navigation",
    events: [
      {
        eventName: "link.click",
        targetElement: ".tna-footer__navigation-block-item-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_component_name: "Footer",
          data_link_type: "Link",
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
          data_component_name: "Footer",
          data_link_type: "Icon",
          data_section: "Social media",
          data_link: ($el) => $el.getAttribute("data-name"),
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
          data_component_name: "Footer",
          data_link_type: "Link",
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
          data_component_name: "Footer",
          data_link_type: "Button",
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
          data_component_name: "Footer",
          data_link_type: "Link",
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
          data_component_name: "Footer",
          data_link_type: "Logo",
          data_section: "GOV.UK",
          data_link: valueGetters.text,
        },
      },
    ],
  },
];
