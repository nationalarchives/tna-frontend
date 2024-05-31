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

const Template = ({ theme }) => {
  const themeSlug = theme.replace(" ", "-").toLowerCase();

  const accents = [
    "",
    "tna-accent-black",
    "tna-accent-yellow",
    "tna-accent-pink",
    "tna-accent-orange",
    "tna-accent-green",
    "tna-accent-blue",
  ];

  const blocks = [
    "",
    "tna-background-tint",
    "tna-background-accent-light",
    "tna-background-accent",
    "tna-background-contrast",
  ];

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
          <h1 class="tna-heading-s">Heading</h1>
          <p>Text / <span class="dark-text">Dark</span> / <span class="light-text">Light</span> / <i class="fa-solid fa-heart" aria-hidden="true"></i> <i class="fa-solid fa-heart light-icon" aria-hidden="true"></i></p>
          <p><a href="#">Link</a> / <a href="#" class="tna-colour-contrast-demo__link--visited">Link (visited)</a></p>
          <ul class="tna-ul">
            <li>Alpha</li>
          </ul>
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
          ${ErrorSummary({
            params: {
              title: "Error",
              headingLevel: 2,
              items: [
                {
                  text: "Error",
                  href: `name-${themeSlug}-${block}-${accent}-2`,
                },
              ],
              disableAutoFocus: true,
              classes: "tna-!--margin-top-s",
            },
          })}
          ${TextInput({
            params: {
              label: "Input",
              id: `name-${themeSlug}-${block}-${accent}`,
              name: `name-${themeSlug}-${block}-${accent}`,
              value: `Lorem ipsum`,
            },
          })}
          ${TextInput({
            params: {
              label: "Input",
              id: `name-${themeSlug}-${block}-${accent}-2`,
              name: `name-${themeSlug}-${block}-${accent}-2`,
              value: `Lorem ipsum`,
              error: {
                text: "Error",
              },
            },
          })}
          ${Checkboxes({
            params: {
              id: `categories-${themeSlug}-${block}-${accent}`,
              name: `categories-${themeSlug}-${block}-${accent}`,
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
              id: `type-${themeSlug}-${block}-${accent}`,
              name: `type-${themeSlug}-${block}-${accent}`,
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
              id: `sort-${themeSlug}-${block}-${accent}`,
              name: `sort-${themeSlug}-${block}-${accent}`,
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

export const Light = Template.bind({});
Light.parameters = {
  a11y: {
    // disable: true,
  },
};
Light.args = {
  theme: "",
};

export const Dark = Template.bind({});
Dark.parameters = {
  a11y: {
    // disable: true,
  },
};
Dark.args = {
  theme: "tna-template--dark-theme",
};

export const HighContrast = Template.bind({});
HighContrast.parameters = {
  a11y: {
    // disable: true,
  },
};
HighContrast.args = {
  theme: "tna-template--high-contrast-theme",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.parameters = {
  a11y: {
    // disable: true,
  },
};
DarkHighContrast.args = {
  theme: "tna-template--dark-theme tna-template--high-contrast-theme",
};
