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
HeadingLink.args = {
  text: "Reaerching with The National Archives",
  href: "#",
};

const SceneSetterTemplate = ({ text }) =>
  `<p class="tna-scene-setter">
    ${text}
  </p>`;
export const SceneSetter = SceneSetterTemplate.bind({});
SceneSetter.args = {
  text: `We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.`,
};

const SceneSetterSmallTemplate = ({ text }) =>
  `<p class="tna-scene-setter tna-scene-setter--small">
    ${text}
  </p>`;
export const SceneSetterSmall = SceneSetterSmallTemplate.bind({});
SceneSetterSmall.args = {
  text: `We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.`,
};

const TextDetailsTemplate = () =>
  `<p>
    Typed slip with photographs - 'The <span class="tna-detail" title="Italian (miscellaneous)" data-type="misc">Italian</span> Steamer <span class="tna-detail" title="Aida Lauro (person)" data-type="per">Aida Lauro</span> which ran on the rocks near <span class="tna-detail" title="Cape Cornwall (location)" data-type="loc">Cape Cornwall</span> a few days ago is now a total wreck. After a severe buffeting by heavy seas the ship has broken in two. The photograph shows the <span class="tna-detail" title="Aida Lauro (person)" data-type="per">Aida Lauro</span> broken in two by a severe buffeting from the seas near <a href="#" class="tna-detail" title="Cape Cornwall (location)" data-type="loc">Cape Cornwall</a>.
  </p>`;
export const TextDetails = TextDetailsTemplate.bind({});

const BlockquoteTemplate = ({
  html,
  author,
}) => `<blockquote class="tna-blockquote">
  <div class="tna-blockquote__quote">
    ${html}
  </div>
  <p class="tna-blockquote__author">${author}</p>
</blockquote>`;
export const Blockquote = BlockquoteTemplate.bind({});
Blockquote.args = {
  html: "<p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>",
  author: "Douglas Adams, Mostly Harmless",
};
