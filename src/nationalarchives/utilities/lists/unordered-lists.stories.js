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
      <ul>${items.reduce(
        (list, item) => `${list}
        <li>${item}
          <ul>${items.reduce(
            (list, item) => `${list}
            <li>${item}
              <ul>${items.reduce(
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

const UnorderedListNestedClasslessChildrenTemplate = ({
  style,
  spaced,
  classes = "",
}) => `<ul class="tna-ul${style ? ` tna-ul--${style}` : ""}${spaced ? " tna-ul--spaced" : ""} ${classes}">
  <li>&lt;html&gt;
    <ul>
      <li>&lt;head&gt;
        <ul>
          <li>pageTitle</li>
          <li>headIcons</li>
          <li>head</li>
          <li>stylesheets</li>
        </ul>
      </li>
      <li>&lt;body&gt;
        <ul>
          <li>bodyStart
            <ul>
              <li>cookies</li>
              <li>skipLink</li>
            </ul>
          </li>
          <li>header</li>
          <li>main
            <ul>
              <li>beforeContent</li>
              <li>&lt;main&gt;
                <ul>
                  <li>content</li>
                </ul>
              </li>
              <li>afterContent</li>
            </ul>
          </li>
          <li>footer</li>
          <li>bodyEnd</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`;
export const UnorderedListNestedClasslessChildren =
  UnorderedListNestedClasslessChildrenTemplate.bind({});
UnorderedListNestedClasslessChildren.parameters = {
  chromatic: { disableSnapshot: true },
};
