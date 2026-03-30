const argTypes = {
  language: { control: "text" },
  filename: { control: "text" },
  content: { control: "text" },
  allowCopy: { control: "boolean" },
};

export default {
  title: "Utilities/Typography/Code",
  argTypes,
};

const InlineCodeTemplate = ({ content }) =>
  `<p>Always place the main body of content in the <code>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code> element.</p>`;
export const InlineCode = InlineCodeTemplate.bind({});
InlineCode.parameters = {
  chromatic: { disableSnapshot: true },
};
InlineCode.args = { content: "<main>" };

const CodeBlockTemplate = ({ language, filename, content, allowCopy }) =>
  `<div class="tna-code-block${allowCopy ? " tna-code-block--copy" : ""}" ${filename ? `title="${filename}"` : ""}>
  <pre class="tna-code-block__pre"><code class="language-${language}">${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
</div>`;
export const CodeBlock = CodeBlockTemplate.bind({});
CodeBlock.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlock.args = {
  language: "html",
  content: `<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
};

export const CodeBlockWithFilename = CodeBlockTemplate.bind({});
CodeBlockWithFilename.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlockWithFilename.args = {
  language: "html",
  filename: "example.html",
  content: `<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
};

export const CodeBlockWithCopy = CodeBlockTemplate.bind({});
CodeBlockWithCopy.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlockWithCopy.args = {
  language: "html",
  content: `<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
  allowCopy: true,
};
