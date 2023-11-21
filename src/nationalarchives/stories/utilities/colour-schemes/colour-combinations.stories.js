import Button from "../../../components/button/template.njk";

export default {
  title: "Utilities/Colour combinations",
};

const Template = () => {
  const themes = [
    "tna-template--light-theme",
    "tna-template--dark-theme",
    "tna-template--light-theme tna-template--high-contrast-theme",
    "tna-template--dark-theme tna-template--high-contrast-theme",
  ];

  const accents = [
    "",
    "tna-template--black-accent",
    "tna-template--yellow-accent",
    "tna-template--pink-accent",
    "tna-template--orange-accent",
    "tna-template--green-accent",
    "tna-template--blue-accent",
  ];

  const blocks = [
    "",
    "tna-background-tint",
    "tna-background-contrast",
    "tna-background-accent",
    "tna-background-accent-light",
  ];

  return `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block">
      Blocks
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block">
      ${block || "Base"}
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
      ${theme.replace(/tna-template--/g, "").replace(/-theme/g, "")} / ${accent
        .replace(/tna-template--/g, "")
        .replace(/-accent/g, "")}
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme} ${accent}">
      <div class="tna-template__body">
        <div class="tna-colour-contrast-demo__example-content ${block}">
          <p>Text</p>
          <p><a href="#">Link</a></p>
          <p><a href="#" class="tna-colour-contrast-demo__link--visited">Link (visited)</a></p>
          <span class="tna-chip">Chip</span>
          ${Button({
            params: {
              text: "Button",
            },
          })}
          ${Button({
            params: {
              text: "Button",
              accent: true,
            },
          })}
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

export const All = Template.bind({});
All.args = {};
