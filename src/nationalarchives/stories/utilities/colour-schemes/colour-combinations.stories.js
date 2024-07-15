import Button from "../../../components/button/template.njk";
import Checkboxes from "../../../components/checkboxes/template.njk";
import ErrorSummary from "../../../components/error-summary/template.njk";
import Radios from "../../../components/radios/template.njk";
import Select from "../../../components/select/template.njk";
import TextInput from "../../../components/text-input/template.njk";

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
];

const blocks = [
  "",
  "tna-background-tint",
  "tna-background-contrast",
  "tna-background-accent",
  "tna-background-accent-light",
];

const Template = ({ theme }) => {
  return `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block">
      Blocks
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block">
      ${block.replace(/^tna-background-/, "") || "Base"}
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
    <div class="tna-colour-contrast-demo__example">
      <p>Accent: <strong>${
        accent.replace(/tna-accent-/g, "") || "[none]"
      }</strong></p>
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme} ${accent}">
      <div class="tna-template__body">
        <div class="tna-colour-contrast-demo__example-content ${block}">
          <div class="accent-border-example">
            <h1 class="tna-heading-s">Heading</h1>
            <p>Text / <span class="dark-text">Dark</span> / <span class="light-text">Light</span> / <i class="fa-solid fa-heart" aria-hidden="true"></i> <i class="fa-solid fa-heart light-icon" aria-hidden="true"></i></p>
            <p><a href="#">Link</a> / <a href="#" class="tna-colour-contrast-demo__link--visited">Link (visited)</a></p>
            <ul class="tna-ul">
              <li>Alpha</li>
            </ul>
          </div>
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
              <a class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
            <dt>Category</dt>
            <dd>
              <a class="tna-dl-chips__item">
                Research
              </a>
            </dd>
            <dt>Comments</dt>
            <dd>
              <span class="tna-dl-chips__item">
                3 comments
              </span>
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
              <a class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
            <dt>Category</dt>
            <dd>
              <a class="tna-dl-chips__item">
                Research
              </a>
            </dd>
            <dt>Comments</dt>
            <dd>
              <span class="tna-dl-chips__item">
                3 comments
              </span>
            </dd>
          </dl>
          <div class="tna-button-group">
            ${Button({
              params: {
                text: "Button",
                small: true,
              },
            })}
            ${Button({
              params: {
                text: "Button",
                small: true,
                accent: true,
              },
            })}
            ${Button({
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
</div>`;
};

const FormsTemplate = ({ theme }) => {
  const themeSlug = theme.replace(" ", "-").toLowerCase();

  const formBlocks = blocks.filter(
    (block) =>
      block !== "tna-background-contrast" &&
      block !== "tna-background-accent" &&
      block !== "tna-background-accent-light",
  );
  console.log(formBlocks);

  return `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block">
      Blocks
    </div>
    ${formBlocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block">
      ${block.replace(/^tna-background-/, "") || "Base"}
    </div>`,
      "",
    )}
  </div>
  <div class="tna-colour-contrast-demo__examples">
    <div class="tna-colour-contrast-demo__theme-accent">
      <div class="tna-colour-contrast-demo__example">
        <p>Accent: <strong>Any</strong></p>
      </div>
      ${formBlocks.reduce(
        (
          blockOutput,
          block,
        ) => `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme}">
        <div class="tna-template__body">
          <div class="tna-colour-contrast-demo__example-content ${block}">
            ${ErrorSummary({
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
                classes: "tna-!--margin-top-s",
              },
            })}
            ${TextInput({
              params: {
                headingLevel: 3,
                headingSize: "s",
                label: "Input",
                id: `name-${themeSlug}-${block}`,
                name: `name-${themeSlug}-${block}`,
                value: `Lorem ipsum`,
              },
            })}
            ${TextInput({
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
            ${Checkboxes({
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
            ${Radios({
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
            ${Select({
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
</div>`;
};

export const Light = Template.bind({});
Light.args = {
  theme: "",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "tna-template--dark-theme",
};

export const HighContrast = Template.bind({});
HighContrast.args = {
  theme: "tna-template--high-contrast-theme",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.args = {
  theme: "tna-template--dark-theme tna-template--high-contrast-theme",
};

export const LightForms = FormsTemplate.bind({});
LightForms.args = {
  theme: "",
};

export const DarkForms = FormsTemplate.bind({});
DarkForms.args = {
  theme: "tna-template--dark-theme",
};

export const HighContrastForms = FormsTemplate.bind({});
HighContrastForms.args = {
  theme: "tna-template--high-contrast-theme",
};

export const DarkHighContrastForms = FormsTemplate.bind({});
DarkHighContrastForms.args = {
  theme: "tna-template--dark-theme tna-template--high-contrast-theme",
};
