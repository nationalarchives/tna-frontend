import { expect, within } from "storybook/test";

import {
  renderInlineString,
  renderString,
} from "../../../../.storybook/nunjucks.js";
import { customViewports } from "../../../../.storybook/viewports";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

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
  render: (params) => renderString(Template, { params }, { padded: true }),
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
  `<div class="tna-template tna-template--blue-accent tna-template--light-theme">
  <div class="tna-template__body">
    <div class="tna-container tna-!--padding-block-start-m tna-!--padding-block-end-xl">
      <div class="tna-column tna-column--full tna-!--padding-block-end-m">
        <h1 class="tna-heading-xl">Highlighting sections on scroll</h1>
      </div>
      <div class="tna-column tna-column--width-1-3 tna-column--full-tiny tna-!--padding-block-end-m">
      ${renderInlineString(Template, { params })}
      </div>
      <div class="tna-column tna-column--width-2-3 tna-column--full-tiny tna-!--padding-block-end-xl">
        ${params.items?.map((item) => `<h2 class="tna-heading-l tna-!--padding-block-start-s" id="${item.href.substring(1)}">${item.text}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis vulputate nulla, nec aliquet velit. Aliquam tristique lorem tortor, et volutpat diam fringilla vel. Etiam aliquet pulvinar justo, a aliquet sem rhoncus non. Donec non felis elementum, accumsan eros ut, feugiat elit. Integer suscipit, sapien elementum vulputate pretium, risus nunc imperdiet purus, ut sagittis tellus velit vel magna. Etiam mauris massa, fringilla eu tincidunt sit amet, commodo bibendum tortor. Curabitur aliquam scelerisque ex, id fringilla metus ultricies cursus. Curabitur eget malesuada dui. Etiam vel iaculis nibh, tincidunt ullamcorper lectus. Integer sed efficitur erat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis vulputate nulla, nec aliquet velit. Aliquam tristique lorem tortor, et volutpat diam fringilla vel. Etiam aliquet pulvinar justo, a aliquet sem rhoncus non. Donec non felis elementum, accumsan eros ut, feugiat elit. Integer suscipit, sapien elementum vulputate pretium, risus nunc imperdiet purus, ut sagittis tellus velit vel magna. Etiam mauris massa, fringilla eu tincidunt sit amet, commodo bibendum tortor. Curabitur aliquam scelerisque ex, id fringilla metus ultricies cursus. Curabitur eget malesuada dui. Etiam vel iaculis nibh, tincidunt ullamcorper lectus. Integer sed efficitur erat.</p>`).join("")}
      </div>
    </div>
  </div>
</div>`;
export const HighlightSectionsDesktop = HighlightSectionsTemplate.bind({});
HighlightSectionsDesktop.parameters = {
  chromatic: { disableSnapshot: true },
};
HighlightSectionsDesktop.args = {
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
  classes: "tna-!--padding-block-start-s",
  attributes: {
    "data-scroll-top-threshold": "16",
    "data-disable-highlight-size": "",
  },
};
HighlightSectionsDesktop.play = async ({ canvasElement }) => {
  const isInViewport = ($element) => {
    const rect = $element.getBoundingClientRect();
    const view = $element.ownerDocument.defaultView;

    return (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < view.innerHeight &&
      rect.left < view.innerWidth
    );
  };

  const canvas = within(canvasElement),
    firstHeadingLink = await canvas.getByRole("link", { name: "Alpha" }),
    fourthHeadingLink = await canvas.getByRole("link", { name: "Delta" });

  await window.scrollTo(0, 0);

  await expect(firstHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );
  await expect(fourthHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );

  const fourthHeading = await canvas.getByRole("heading", { name: "Delta" });
  await expect(isInViewport(fourthHeading)).toBe(false);
  await fourthHeading.scrollIntoView();
  await expect(isInViewport(fourthHeading)).toBe(true);
  await expect(firstHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );
  await expect(fourthHeadingLink.parentElement.classList).toContain(
    "tna-sidebar__item--current",
  );

  // await firstHeadingLink.addEventListener(
  //   "click",
  //   (event) => event.preventDefault(),
  // );
  // await userEvent.click(firstHeadingLink);
  // await firstHeadingLink.dispatchEvent(
  //   new MouseEvent("click", { bubbles: true, cancelable: true }),
  // );
  // await expect(firstHeadingLink.parentElement.classList).toContain(
  //   "tna-sidebar__item--current",
  // );
  // await expect(fourthHeadingLink.parentElement.classList).not.toContain(
  //   "tna-sidebar__item--current",
  // );

  await window.scrollTo(0, 0);
};

export const HighlightSectionsTiny = HighlightSectionsTemplate.bind({});
HighlightSectionsTiny.parameters = {
  ...HighlightSectionsDesktop.parameters,
  chromatic: {
    ...HighlightSectionsDesktop.parameters.chromatic,
    viewports: [customViewports.tiny.styles.width.replace(/px$/u, "")],
  },
};
HighlightSectionsTiny.args = { ...HighlightSectionsDesktop.args };
HighlightSectionsTiny.globals = {
  ...HighlightSectionsDesktop.globals,
  viewport: { value: "tiny" },
};
HighlightSectionsTiny.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement),
    firstHeadingLink = await canvas.getByRole("link", { name: "Alpha" }),
    fourthHeadingLink = await canvas.getByRole("link", { name: "Delta" });

  await window.scrollTo(0, 0);

  const fourthHeading = await canvas.getByRole("heading", { name: "Delta" });
  await fourthHeading.scrollIntoView();
  await expect(firstHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );
  await expect(fourthHeadingLink.parentElement.classList).toContain(
    "tna-sidebar__item--current",
  );

  await window.scrollTo(0, 0);
};

export const HighlightSectionsTinyHidden = HighlightSectionsTemplate.bind({});
HighlightSectionsTinyHidden.parameters = {
  ...HighlightSectionsDesktop.parameters,
  chromatic: {
    ...HighlightSectionsDesktop.parameters.chromatic,
    viewports: [customViewports.tiny.styles.width.replace(/px$/u, "")],
  },
};
HighlightSectionsTinyHidden.args = {
  ...HighlightSectionsDesktop.args,
  attributes: {
    ...HighlightSectionsDesktop.args.attributes,
    "data-disable-highlight-size": "tiny",
  },
};
HighlightSectionsTinyHidden.globals = {
  ...HighlightSectionsDesktop.globals,
  viewport: { value: "tiny" },
};
HighlightSectionsTinyHidden.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement),
    firstHeadingLink = await canvas.getByRole("link", { name: "Alpha" }),
    fourthHeadingLink = await canvas.getByRole("link", { name: "Delta" });

  await window.scrollTo(0, 0);

  const fourthHeading = await canvas.getByRole("heading", { name: "Delta" });
  await fourthHeading.scrollIntoView();
  await expect(firstHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );
  await expect(fourthHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );

  await window.scrollTo(0, 0);
};

export const HighlightSectionsInvalid = HighlightSectionsTemplate.bind({});
HighlightSectionsInvalid.parameters = {
  ...HighlightSectionsDesktop.parameters,
};
HighlightSectionsInvalid.args = {
  ...HighlightSectionsDesktop.args,
  attributes: {
    ...HighlightSectionsDesktop.args.attributes,
    "data-disable-highlight-size": "foobar",
  },
};
HighlightSectionsInvalid.globals = { ...HighlightSectionsDesktop.globals };
HighlightSectionsInvalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement),
    firstHeadingLink = await canvas.getByRole("link", { name: "Alpha" }),
    fourthHeadingLink = await canvas.getByRole("link", { name: "Delta" });

  await window.scrollTo(0, 0);

  const fourthHeading = await canvas.getByRole("heading", { name: "Delta" });
  await fourthHeading.scrollIntoView();
  await expect(firstHeadingLink.parentElement.classList).not.toContain(
    "tna-sidebar__item--current",
  );
  await expect(fourthHeadingLink.parentElement.classList).toContain(
    "tna-sidebar__item--current",
  );

  await window.scrollTo(0, 0);
};
