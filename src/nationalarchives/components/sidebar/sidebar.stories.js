import nunjucks from "nunjucks";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Sidebar",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      items: { control: "object" },
      type: { control: "radio", options: ["contents", "sections", "pages"] },
      sticky: { control: "boolean" },
      disableSectionHighlightOnScroll: { control: "boolean" },
      ariaLabel: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => nunjucks.renderString(Template, { params }),
};

export const Contents = {
  args: {
    title: "Contents",
    headingLevel: 2,
    items: [
      {
        text: "Accessibility statement",
        href: "#",
      },
      {
        text: "Feedback and contact information",
        href: "#",
      },
      {
        text: "Enforcement procedure",
        href: "#",
      },
      {
        text: "Compliance status",
        href: "#",
      },
      {
        text: "Non-accessible content",
        href: "#",
        children: [
          {
            text: "Non-compliance with the accessibility regulations",
            href: "#",
          },
          {
            text: "Disproportionate burden",
            href: "#",
            children: [
              {
                text: "Disproportionate burden explained",
                href: "#",
              },
            ],
          },
          {
            text: "Content that’s not within the scope of the accessibility regulations",
            href: "#",
          },
        ],
      },
      {
        text: "Other identified and tracked accessibility concerns",
        href: "#",
      },
      {
        text: "Testing our products for accessibility",
        href: "#",
      },
      {
        text: "How the National Archives Design System team makes their websites accessible",
        href: "#",
      },
      {
        text: "Preparation of this accessibility statement",
        href: "#",
      },
    ],
    type: "contents",
    classes: "tna-sidebar--demo",
  },
};

export const Sections = {
  args: {
    title: "On this page",
    headingLevel: 2,
    items: [
      {
        text: "A band of guerrillas",
        href: "#",
        current: true,
      },
      {
        text: "War begins",
        href: "#",
      },
      {
        text: "Forming the ERC",
        href: "#",
      },
      {
        text: "The fall of Hong Kong",
        href: "#",
      },
      {
        text: "The ERC's guerrilla activities",
        href: "#",
      },
      {
        text: "Chan Chak’s escape",
        href: "#",
      },
      {
        text: "Francis Lee and Lieutenant Colonel Ride",
        href: "#",
      },
      {
        text: "Raymond Wong's recommendation",
        href: "#",
      },
      {
        text: "Co-operation between the ERC and BAAG",
        href: "#",
      },
      {
        text: "The ERC's legacy",
        href: "#",
      },
      {
        text: "Exhibition",
        href: "#",
      },
    ],
    type: "sections",
    classes: "tna-sidebar--demo",
  },
};

export const Pages = {
  args: {
    title: "Components",
    headingLevel: 2,
    items: [
      {
        text: "Accordion",
        href: "#",
      },
      {
        text: "Breadcrumbs",
        href: "#",
      },
      {
        text: "Button",
        href: "#",
        current: true,
        children: [
          {
            text: "Status",
            href: "#",
          },
          {
            text: "Icons",
            href: "#",
          },
          {
            text: "Button groups",
            href: "#",
          },
        ],
      },
      {
        text: "Card",
        href: "#",
      },
      {
        text: "Checkboxes",
        href: "#",
      },
      {
        text: "Compound filters",
        href: "#",
      },
      {
        text: "Cookie banner",
        href: "#",
      },
      {
        text: "Date input",
        href: "#",
      },
      {
        text: "Date search",
        href: "#",
      },
      {
        text: "Details",
        href: "#",
      },
    ],
    type: "pages",
    classes: "tna-sidebar--demo",
  },
};

const HighlightSectionsTemplate = (params) =>
  `<div class="tna-container tna-!--padding-top-m tna-!--padding-bottom-xl">
    <div class="tna-column tna-column--full tna-!--padding-bottom-m">
      <h1 class="tna-heading-xl">Highlighting sections on scroll</h1>
    </div>
    <div class="tna-column tna-column--width-1-3">
    ${nunjucks.renderString(Template, { params })}
    </div>
    <div class="tna-column tna-column--width-2-3 tna-!--padding-bottom-xl">
      ${params.items?.map((item) => `<h2 class="tna-heading-l tna-!--padding-top-s" id="${item.href.substring(1)}">${item.text}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis vulputate nulla, nec aliquet velit. Aliquam tristique lorem tortor, et volutpat diam fringilla vel. Etiam aliquet pulvinar justo, a aliquet sem rhoncus non. Donec non felis elementum, accumsan eros ut, feugiat elit. Integer suscipit, sapien elementum vulputate pretium, risus nunc imperdiet purus, ut sagittis tellus velit vel magna. Etiam mauris massa, fringilla eu tincidunt sit amet, commodo bibendum tortor. Curabitur aliquam scelerisque ex, id fringilla metus ultricies cursus. Curabitur eget malesuada dui. Etiam vel iaculis nibh, tincidunt ullamcorper lectus. Integer sed efficitur erat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis vulputate nulla, nec aliquet velit. Aliquam tristique lorem tortor, et volutpat diam fringilla vel. Etiam aliquet pulvinar justo, a aliquet sem rhoncus non. Donec non felis elementum, accumsan eros ut, feugiat elit. Integer suscipit, sapien elementum vulputate pretium, risus nunc imperdiet purus, ut sagittis tellus velit vel magna. Etiam mauris massa, fringilla eu tincidunt sit amet, commodo bibendum tortor. Curabitur aliquam scelerisque ex, id fringilla metus ultricies cursus. Curabitur eget malesuada dui. Etiam vel iaculis nibh, tincidunt ullamcorper lectus. Integer sed efficitur erat.</p>`).join("")}
    </div>
  </div>`;
export const HighlightSections = HighlightSectionsTemplate.bind({});
HighlightSections.parameters = {
  chromatic: { disableSnapshot: true },
};
HighlightSections.args = {
  title: "Sections",
  headingLevel: 2,
  items: [
    {
      text: "Alpha",
      href: "#alpha",
    },
    {
      text: "Beta",
      href: "#beta",
    },
    {
      text: "Gamma",
      href: "#gamma",
    },
    {
      text: "Delta",
      href: "#delta",
    },
    {
      text: "Epsilon",
      href: "#epsilon",
    },
    {
      text: "Zeta",
      href: "#zeta",
    },
  ],
  type: "sections",
  sticky: true,
  classes: "tna-!--padding-top-s",
  attributes: {
    "data-scroll-top-threshold": "16",
    "data-disable-highlight-size": "",
  },
};
