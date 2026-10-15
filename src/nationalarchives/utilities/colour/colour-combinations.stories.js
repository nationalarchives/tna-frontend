import {
  renderInlineString,
  wrapHtml,
} from "../../../../.storybook/nunjucks.js";
import Button from "../../components/button/template.njk?raw";
import Checkboxes from "../../components/checkboxes/template.njk?raw";
import ErrorSummary from "../../components/error-summary/template.njk?raw";
import Radios from "../../components/radios/template.njk?raw";
import Select from "../../components/select/template.njk?raw";
import TextInput from "../../components/text-input/template.njk?raw";

const argTypes = {};

export default {
  title: "Utilities/Colours/Combinations",
  argTypes,
};

const accents = [
    "",
    "tna-accent-pink",
    "tna-accent-orange",
    "tna-accent-yellow",
    "tna-accent-green",
    "tna-accent-blue",
    "tna-accent-black",
  ],
  blocks = [
    "",
    "tna-block-tint",
    "tna-block-accent-light",
    "tna-block-accent",
    "tna-block-contrast",
  ],
  Template = ({ theme }) =>
    wrapHtml(
      `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block tna-template ${theme}">
      Blocks
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block tna-template ${theme}">
      ${block.replace(/^tna-block-/u, "") || "base"}
    </div>`,
      "",
    )}
  </div>
  <div class="tna-colour-contrast-demo__examples">
  ${accents.reduce(
    (
      accentOutput,
      accent,
    ) => `${accentOutput}<div class="tna-colour-contrast-demo__theme-accent">
    <div class="tna-colour-contrast-demo__example tna-template ${theme}">
      <p>Accent: <strong>${
        accent.replace(/tna-accent-/gu, "") || "[none]"
      }</strong></p>
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme} ${accent}">
      <div class="tna-template__body">
        <div class="tna-colour-contrast-demo__example-content ${block}">
          <div class="accent-border-example">
            <h2 class="tna-heading-s">Heading</h2>
            <p>Text / <span class="dark-text">Dark</span> / <span class="light-text">Light</span> / <a href="#">Link</a> / <a href="#" class="tna-colour-contrast-demo__link--visited">Link (visited)</a> / <i class="fa-solid fa-heart" aria-hidden="true"></i> <i class="fa-solid fa-heart light-icon" aria-hidden="true"></i></p>
            <ul class="tna-ul">
              <li>Alpha</li>
            </ul>
            <ol class="tna-ol tna-!--no-margin-block-start">
              <li>Alpha</li>
            </ol>
          </div>
          <hr class="tna-!--margin-block-start-s">
          <hr class="tna-hr-dark tna-!--margin-block-start-xs">
          <dl class="tna-dl-chips">
            <dt>Published</dt>
            <dd>
              <span class="tna-dl-chips__item">
                <i class="fa-solid fa-calendar"></i>
                2014
              </span>
            </dd>
            <dt>Author</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
          </dl>
          <dl class="tna-dl-chips tna-dl-chips--plain">
            <dt>Published</dt>
            <dd>
              <span class="tna-dl-chips__item">
                <i class="fa-solid fa-calendar"></i>
                2014
              </span>
            </dd>
            <dt>Author</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
          </dl>
          <div class="tna-button-group">
            ${renderInlineString(Button, {
              params: {
                text: "Button",
                small: true,
              },
            })}
            ${renderInlineString(Button, {
              params: {
                text: "Button",
                small: true,
                accent: true,
              },
            })}
            ${renderInlineString(Button, {
              params: {
                text: "Button",
                small: true,
                plain: true,
              },
            })}
          </div>
        </div>
      </div>
    </div>`,
      "",
    )}
  </div>`,
    "",
  )}
  </div>
</div>`,
      { accent: "" },
    ),
  FormsTemplate = ({ theme }) => {
    const themeSlug = theme.replace(" ", "-").toLowerCase(),
      formBlocks = blocks.filter(
        (block) =>
          block !== "tna-block-contrast" &&
          block !== "tna-block-accent" &&
          block !== "tna-block-accent-light",
      );

    return wrapHtml(
      `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block tna-template ${theme}">
      Blocks
    </div>
    ${formBlocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block tna-template ${theme}">
      ${block.replace(/^tna-block-/u, "") || "Base"}
    </div>`,
      "",
    )}
  </div>
  <div class="tna-colour-contrast-demo__examples">
    <div class="tna-colour-contrast-demo__theme-accent">
      <div class="tna-colour-contrast-demo__example tna-template ${theme}">
        <p>Accent: <strong>Any</strong></p>
      </div>
      ${formBlocks.reduce(
        (
          blockOutput,
          block,
        ) => `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme}">
        <div class="tna-template__body">
          <div class="tna-colour-contrast-demo__example-content ${block}">
            ${renderInlineString(ErrorSummary, {
              params: {
                title: "Error",
                headingLevel: 2,
                headingSize: "s",
                items: [
                  {
                    text: "Error",
                    href: `name-${themeSlug}-${block}-2`,
                  },
                ],
                disableAutoFocus: true,
                classes: "tna-!--margin-block-start-s",
              },
            })}
            ${renderInlineString(TextInput, {
              params: {
                headingLevel: 3,
                headingSize: "s",
                label: "Input",
                id: `name-${themeSlug}-${block}`,
                name: `name-${themeSlug}-${block}`,
                value: `Lorem ipsum`,
              },
            })}
            ${renderInlineString(TextInput, {
              params: {
                label: "Input",
                headingLevel: 3,
                headingSize: "s",
                id: `name-${themeSlug}-${block}-2`,
                name: `name-${themeSlug}-${block}-2`,
                value: `Lorem ipsum`,
                error: {
                  text: "Error",
                },
              },
            })}
            ${renderInlineString(Checkboxes, {
              params: {
                id: `categories-${themeSlug}-${block}`,
                name: `categories-${themeSlug}-${block}`,
                items: [
                  {
                    text: "Alpha",
                    value: "alpha",
                  },
                  {
                    text: "Beta",
                    value: "beta",
                    checked: true,
                  },
                ],
                small: true,
                inline: true,
              },
            })}
            ${renderInlineString(Radios, {
              params: {
                id: `type-${themeSlug}-${block}`,
                name: `type-${themeSlug}-${block}`,
                items: [
                  {
                    text: "Alpha",
                    value: "alpha",
                  },
                  {
                    text: "Beta",
                    value: "beta",
                  },
                ],
                selected: "beta",
                small: true,
                inline: true,
              },
            })}
            ${renderInlineString(Select, {
              params: {
                label: "Select",
                id: `sort-${themeSlug}-${block}`,
                name: `sort-${themeSlug}-${block}`,
                items: [
                  {
                    text: "Relevance",
                    value: "relevance",
                  },
                  {
                    text: "Date",
                    value: "date",
                  },
                  {
                    text: "Title",
                    value: "title",
                  },
                ],
              },
            })}
          </div>
        </div>
      </div>`,
        "",
      )}
    </div>
  </div>
</div>`,
      { accent: "" },
    );
  };

export const System = Template.bind({});
System.args = {
  theme: "",
};
System.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Light = Template.bind({});
Light.args = {
  theme: "tna-template--light-theme",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "tna-template--dark-theme",
};

export const LightHighContrast = Template.bind({});
LightHighContrast.args = {
  theme: "tna-template--light-theme tna-template--high-contrast-theme",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.args = {
  theme: "tna-template--dark-theme tna-template--high-contrast-theme",
};

export const LightForms = FormsTemplate.bind({});
LightForms.args = {
  theme: "tna-template--light-theme",
};

export const DarkForms = FormsTemplate.bind({});
DarkForms.args = {
  theme: "tna-template--dark-theme",
};

export const LightHighContrastForms = FormsTemplate.bind({});
LightHighContrastForms.args = {
  theme: "tna-template--light-theme tna-template--high-contrast-theme",
};

export const DarkHighContrastForms = FormsTemplate.bind({});
DarkHighContrastForms.args = {
  theme: "tna-template--dark-theme tna-template--high-contrast-theme",
};
