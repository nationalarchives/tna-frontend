const argTypes = {
  text: { control: "text" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const ParagraphTemplate = ({ paragraphs }) =>
  paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
export const Paragraph = ParagraphTemplate.bind({});
Paragraph.parameters = {
  chromatic: { disableSnapshot: true },
};
Paragraph.args = {
  paragraphs: [
    "This is some body text.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh. Donec ac tellus in dui rutrum maximus. Aliquam vel euismod eros. Integer ut magna velit. Fusce sed dui sit amet metus eleifend dictum quis vitae mi. Aenean sagittis euismod purus, in accumsan metus venenatis nec. Nullam nec velit felis. Sed nec felis eu nisl varius dictum eu quis nisl. Donec dapibus est arcu, vel pellentesque risus pellentesque eget.",
    "Nam a posuere lectus. Vivamus facilisis est pretium augue aliquet iaculis. Phasellus ligula orci, commodo eget lectus et, tincidunt scelerisque erat. Aliquam in est vel purus ultricies vulputate non sed ligula. Pellentesque ut felis ullamcorper, eleifend erat dapibus, feugiat metus. Phasellus vitae dolor commodo, posuere nisl sed, luctus mauris. Etiam malesuada tincidunt enim, ac fermentum est pulvinar id. Maecenas id accumsan libero. Curabitur at velit nisi. Nullam gravida mauris quam, tempor pharetra risus venenatis vel. Proin quis malesuada lacus. Nulla condimentum facilisis turpis, et elementum leo. Nulla gravida quam mauris, id scelerisque est rhoncus ac.",
  ],
};

const LargeParagraphTemplate = ({ paragraphs }) =>
  paragraphs
    .map((paragraph) => `<p class="tna-large-paragraph">${paragraph}</p>`)
    .join("");
export const LargeParagraph = LargeParagraphTemplate.bind({});
LargeParagraph.parameters = {
  chromatic: { disableSnapshot: true },
};
LargeParagraph.args = {
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh. Donec ac tellus in dui rutrum maximus. Aliquam vel euismod eros. Integer ut magna velit. Fusce sed dui sit amet metus eleifend dictum quis vitae mi. Aenean sagittis euismod purus, in accumsan metus venenatis nec. Nullam nec velit felis. Sed nec felis eu nisl varius dictum eu quis nisl. Donec dapibus est arcu, vel pellentesque risus pellentesque eget.",
  ],
};

const HeadingLinkTemplate = ({ text, href }) =>
  `<h2 class="tna-heading-s">
    <a href="${href}">${text}</a>
  </h2>`;
export const HeadingLink = HeadingLinkTemplate.bind({});
HeadingLink.parameters = {
  chromatic: { disableSnapshot: true },
};
HeadingLink.args = {
  text: "Researching with The National Archives",
  href: "#",
};

const SceneSetterTemplate = ({ text }) =>
  `<p class="tna-scene-setter">
    ${text}
  </p>`;
export const SceneSetter = SceneSetterTemplate.bind({});
SceneSetter.parameters = {
  chromatic: { disableSnapshot: true },
};
SceneSetter.args = {
  text: `We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.`,
};

const SceneSetterSmallTemplate = ({ text }) =>
  `<p class="tna-scene-setter tna-scene-setter--small">
    ${text}
  </p>`;
export const SceneSetterSmall = SceneSetterSmallTemplate.bind({});
SceneSetterSmall.parameters = {
  chromatic: { disableSnapshot: true },
};
SceneSetterSmall.args = {
  text: `We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.`,
};

const BlockquoteTemplate = ({
  html,
  author,
}) => `<blockquote class="tna-blockquote">
  <div class="tna-blockquote__quote">
    ${html}
  </div>
  <p class="tna-blockquote__citation">${author}</p>
</blockquote>`;
export const Blockquote = BlockquoteTemplate.bind({});
Blockquote.parameters = {
  chromatic: { disableSnapshot: true },
};
Blockquote.args = {
  html: "<p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>",
  author: "Douglas Adams, Mostly Harmless",
};
