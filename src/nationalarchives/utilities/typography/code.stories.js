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
  content: `<!-- HTML for the back button component -->
<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
};

export const CodeBlockWithFilename = CodeBlockTemplate.bind({});
CodeBlockWithFilename.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlockWithFilename.args = {
  language: "javascript",
  filename: "example.js",
  content: `// Regex "y" and "u" flags
var a = /[a-zA-Z]+/gimyu;

// for..of loops
for(let x of y) { }

// Modules: import
import { foo as bar } from "file.js"

// Template strings
\`Only on \${y} one line\`
\`This template string \${x} is on

multiple lines.\`
\`40 + 2 = \${ 40 + 2 }\`
\`The squares of the first 3 natural integers are \${[for (x of [1,2,3]) x*x].join(', ')}\`

var foo = /([^/])\\/(\\?.|\\[.+?])+?\\/[gim]{0,3}/g;`,
};

export const CodeBlockWithCopy = CodeBlockTemplate.bind({});
CodeBlockWithCopy.parameters = {
  chromatic: { disableSnapshot: true },
};
CodeBlockWithCopy.args = {
  language: "css",
  content: `:root {
	--foo: 12px;
}
a {
	font-size: var(--foo);
	padding: calc(var(--foo) + .5em);
}

span {
	background: rgba(0, 128, 255, .4);
	color: red;
	color: green;
	color: blue;
	border: 1px solid #FFF;
}`,
  allowCopy: true,
};
