import Prism from "prismjs";

export default {
  title: "Utilities/Code",
};

const InlineCodeTemplate = ({ content }) =>
  `<p>Always place the main body of content in the <code>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code> element.</p>`;
export const InlineCode = InlineCodeTemplate.bind({});
InlineCode.parameters = {
  chromatic: { disableSnapshot: true },
};
InlineCode.args = { content: "<main>" };

const CodeBlockTemplate = ({ language, filename, content }) =>
  `<pre class="tna-code-block" title="${filename}"><code class="language-${language}">${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
export const CodeBlock = CodeBlockTemplate.bind({});
CodeBlock.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlock.args = {
  language: "javascript",
  filename: "example.js",
  content: `import { initAll } from "@nationalarchives/frontend/nationalarchives/all.mjs";

initAll();`,
};
CodeBlock.play = async ({ canvasElement }) => {
  canvasElement.querySelectorAll("pre code").forEach((block) => {
    Prism.highlightElement(block);
  });
};
