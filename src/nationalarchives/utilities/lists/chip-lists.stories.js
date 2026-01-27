const argTypes = {
  items: { control: "object" },
  classes: { control: "text" },
};

export default {
  title: "Utilities/Lists/Chips",
  argTypes,
};

const ChipListTemplate = ({ items, plain, classes = "" }) =>
  `<dl class="tna-dl-chips${plain ? " tna-dl-chips--plain" : ""} ${classes}">${items.reduce(
    (list, item) => `${list}
    <dt>${item.title}</dt>
    <dd>
      <${item.href ? "a" : "span"} class="tna-dl-chips__item">
        ${item.icon ? `<i class="fa-solid fa-${item.icon}" aria-hidden="true"></i>` : ""}
        ${item.text}
      </${item.href ? "a" : "span"}>
    </dd>`,
    "",
  )}</dl>`;
export const ChipList = ChipListTemplate.bind({});
ChipList.parameters = {
  chromatic: { disableSnapshot: true },
};
ChipList.args = {
  items: [
    { title: "Published", text: "Saturday 28 June 2014", icon: "calendar" },
    { title: "Author", text: "James Cronan", icon: "user", href: "#" },
    { title: "Category", text: "Records and research", href: "#" },
    { title: "Comments", text: "3 comments" },
  ],
};
export const PlainChipList = ChipListTemplate.bind({});
PlainChipList.parameters = {
  chromatic: { disableSnapshot: true },
};
PlainChipList.args = {
  items: [
    { title: "Published", text: "Saturday 28 June 2014", icon: "calendar" },
    { title: "Author", text: "James Cronan", icon: "user", href: "#" },
    { title: "Category", text: "Records and research", href: "#" },
    { title: "Comments", text: "3 comments" },
  ],
  plain: true,
};
