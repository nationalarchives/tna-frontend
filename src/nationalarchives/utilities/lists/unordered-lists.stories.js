const argTypes = {
  items: { control: "object" },
  style: {
    control: "inline-radio",
    options: ["none", "plain", "dashed"],
  },
  spaced: {
    control: "boolean",
  },
  classes: { control: "text" },
};

export default {
  title: "Utilities/Lists/Unordered",
  argTypes,
};

const UnorderedListTemplate = ({ items, style, spaced, classes = "" }) =>
  `<ul class="tna-ul${style ? ` tna-ul--${style}` : ""}${spaced ? " tna-ul--spaced" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    "",
  )}</ul>`;

export const UnorderedList = UnorderedListTemplate.bind({});
UnorderedList.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};

export const UnorderedListPlain = UnorderedListTemplate.bind({});
UnorderedListPlain.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "plain",
};

export const UnorderedListDashed = UnorderedListTemplate.bind({});
UnorderedListDashed.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListDashed.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "dashed",
};

export const UnorderedListSpaced = UnorderedListTemplate.bind({});
UnorderedListSpaced.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListSpaced.args = {
  items: ["Alpha", "Beta", "Gamma"],
  spaced: true,
};

const UnorderedListNestedTemplate = ({ items, style, spaced, classes = "" }) =>
  `<ul class="tna-ul${style ? ` tna-ul--${style}` : ""}${spaced ? " tna-ul--spaced" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}
      <ul class="tna-ul">${items.reduce(
        (list, item) => `${list}
        <li>${item}
          <ul class="tna-ul">${items.reduce(
            (list, item) => `${list}
            <li>${item}
              <ul class="tna-ul">${items.reduce(
                (list, item) => `${list}
                <li>${item}</li>`,
                "",
              )}</ul>
            </li>`,
            "",
          )}</ul>
        </li>`,
        "",
      )}</ul>
    </li>`,
    "",
  )}</ul>`;
export const UnorderedListNested = UnorderedListNestedTemplate.bind({});
UnorderedListNested.parameters = {
  chromatic: { disableSnapshot: true },
};
UnorderedListNested.args = {
  items: ["Alpha", "Beta"],
};
