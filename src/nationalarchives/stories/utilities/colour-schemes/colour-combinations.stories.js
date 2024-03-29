import Button from "../../../components/button/template.njk";
import Checkboxes from "../../../components/checkboxes/template.njk";
import Radios from "../../../components/radios/template.njk";
import Select from "../../../components/select/template.njk";
import TextInput from "../../../components/text-input/template.njk";

const argTypes = {};

export default {
  title: "Utilities/Colours/Combinations",
  argTypes,
};

const Template = () => {
  const themes = [
    "tna-template--light-theme",
    "tna-template--light-theme tna-template--high-contrast-theme",
    "tna-template--dark-theme",
    "tna-template--dark-theme tna-template--high-contrast-theme",
  ];

  const accents = [
    "",
    // "tna-template--black-accent",
    "tna-template--yellow-accent",
    "tna-template--pink-accent",
    "tna-template--orange-accent",
    "tna-template--green-accent",
    "tna-template--blue-accent",
  ];

  const blocks = [
    "",
    "tna-background-accent-light",
    "tna-background-tint",
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
  ${themes.reduce(
    (themeOutput, theme) =>
      `${themeOutput}${accents.reduce(
        (
          accentOutput,
          accent,
        ) => `${accentOutput}<div class="tna-colour-contrast-demo__theme-accent">
    <div class="tna-colour-contrast-demo__example">
      <p>Theme: <strong>${theme
        .replace(/tna-template--/g, "")
        .replace(/-theme/g, "")}</strong></p>
      <p>Accent: <strong>${
        accent.replace(/tna-template--/g, "").replace(/-accent/g, "") ||
        "[none]"
      }</strong></p>
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme} ${accent}">
      <div class="tna-template__body">
        <div class="tna-colour-contrast-demo__example-content ${block}">
          <h6 class="tna-heading-s">Heading</h6>
          <p>Text / <span class="dark-text">Dark</span> / <span class="light-text">Light</span> / <i class="fa-solid fa-heart" aria-hidden="true"></i> <i class="fa-solid fa-heart light-icon" aria-hidden="true"></i></p>
          <p><a href="#">Link</a> / <a href="#" class="tna-colour-contrast-demo__link--visited">Link (visited)</a></p>
          <ul class="tna-chip-list">
            <li class="tna-chip-list__item">
              <span class="tna-chip">Chip</span>
            </li>
            <li class="tna-chip-list__item">
              <span class="tna-chip"><i class="fa-solid fa-heart" aria-hidden="true"></i>Chip</span>
            </li>
            <li class="tna-chip-list__item">
              <span class="tna-chip tna-chip--plain"><i class="fa-solid fa-heart" aria-hidden="true"></i>Chip</span>
            </li>
          </ul>
          ${TextInput({
            params: {
              label: "Input",
              id: `name-${theme}-${block}-${accent}`,
              name: `name-${theme}-${block}-${accent}`,
              value: `Lorem ipsum`,
            },
          })}
          ${Checkboxes({
            params: {
              id: `categories-${theme}-${block}-${accent}`,
              name: `categories-${theme}-${block}-${accent}`,
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
              id: `type-${theme}-${block}-${accent}`,
              name: `type-${theme}-${block}-${accent}`,
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
              id: `sort-${theme}-${block}-${accent}`,
              name: `sort-${theme}-${block}-${accent}`,
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
      )}`,
    "",
  )}
  </div>
</div>`;
};

export const Combinations = Template.bind({});
Combinations.parameters = {
  a11y: {
    disable: true,
  },
};
Combinations.args = {};
