import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { languages } from "prismjs";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Code block",
  argTypes: Object.fromEntries(
    Object.entries({
      filename: { control: "text" },
      language: { control: "select", options: Object.keys(languages) },
      code: { control: "text" },
      copy: { control: "boolean" },
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
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    code: "Plaintext code block",
  },
};

export const WithFilename = {
  args: {
    filename: "index.html",
    language: "html",
    code: `<!-- HTML for the back button component -->
<a href="#" class="tna-back-link">
  <span class="tna-back-link__inner">Back to previous page</span>
</a>`,
  },
};

export const WithCopyButton = {
  args: {
    language: "javascript",
    code: `const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );

export default uuidv4;`,
    copy: true,
  },
};
