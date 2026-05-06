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
  title: "Utilities/Lists/Ordered",
  argTypes,
};

const OrderedListTemplate = ({ items, style, spaced, classes = "" }) =>
  `<ol class="tna-ol${style ? ` tna-ol--${style}` : ""}${spaced ? " tna-ol--spaced" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}</li>`,
    "",
  )}</ol>`;

export const OrderedList = OrderedListTemplate.bind({});
OrderedList.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedList.args = {
  items: ["Alpha", "Beta", "Gamma"],
};

export const OrderedListPlain = OrderedListTemplate.bind({});
OrderedListPlain.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListPlain.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "plain",
};

export const OrderedListDashed = OrderedListTemplate.bind({});
OrderedListDashed.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListDashed.args = {
  items: ["Alpha", "Beta", "Gamma"],
  style: "dashed",
};

export const OrderedListSpaced = OrderedListTemplate.bind({});
OrderedListSpaced.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListSpaced.args = {
  items: ["Alpha", "Beta", "Gamma"],
  spaced: true,
};

const OrderedListNestedTemplate = ({ items, style, spaced, classes = "" }) =>
  `<ol class="tna-ol${style ? ` tna-ol--${style}` : ""}${spaced ? " tna-ol--spaced" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}<li>${item}
      <ol>${items.reduce(
        (list, item) => `${list}
        <li>${item}
          <ol>${items.reduce(
            (list, item) => `${list}
            <li>${item}
              <ol>${items.reduce(
                (list, item) => `${list}
                <li>${item}</li>`,
                "",
              )}</ol>
            </li>`,
            "",
          )}</ol>
        </li>`,
        "",
      )}</ol>
    </li>`,
    "",
  )}</ol>`;
export const OrderedListNested = OrderedListNestedTemplate.bind({});
OrderedListNested.parameters = {
  chromatic: { disableSnapshot: true },
};
OrderedListNested.args = {
  items: ["Alpha", "Beta"],
};

const OrderedListNestedClasslessChildrenTemplate = ({
  style,
  spaced,
  classes = "",
}) => `<ol class="tna-ol${style ? ` tna-ol--${style}` : ""}${spaced ? " tna-ol--spaced" : ""} ${classes}">
  <li>&lt;html&gt;
    <ol>
      <li>&lt;head&gt;
        <ol>
          <li>pageTitle</li>
          <li>headIcons</li>
          <li>head</li>
          <li>stylesheets</li>
        </ol>
      </li>
      <li>&lt;body&gt;
        <ol>
          <li>bodyStart
            <ol>
              <li>cookies</li>
              <li>skipLink</li>
            </ol>
          </li>
          <li>header</li>
          <li>main
            <ol>
              <li>beforeContent</li>
              <li>&lt;main&gt;
                <ol>
                  <li>content</li>
                </ol>
              </li>
              <li>afterContent</li>
            </ol>
          </li>
          <li>footer</li>
          <li>bodyEnd</li>
        </ol>
      </li>
    </ol>
  </li>
</ol>`;
export const OrderedListNestedClasslessChildren =
  OrderedListNestedClasslessChildrenTemplate.bind({});
OrderedListNestedClasslessChildren.parameters = {
  chromatic: { disableSnapshot: true },
};
