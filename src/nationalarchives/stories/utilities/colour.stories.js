export default {
  title: "Utilities/Colour themes",
};

const themes = [
  { name: "System", classes: "tna-template--system-theme" },
  { name: "Light", classes: "tna-template--light-theme" },
  {
    name: "Light (high contrast)",
    classes: "tna-template--light-theme tna-template--high-contrast-theme",
  },
  { name: "Dark", classes: "tna-template--dark-theme" },
  {
    name: "Dark (high contrast)",
    classes: "tna-template--dark-theme tna-template--high-contrast-theme",
  },
];

const Template = ({ text }) =>
  themes.reduce(
    (html, theme) => `${html}<div class="tna-template ${theme.classes}">
  <div class="tna-template__body tna-template__body--padded">
    <hgroup class="tna-hgroup tna-hgroup--l">
      <p class="tna-hgroup__supertitle">TNA colour theme</p>
      <h3 class="tna-hgroup__title">${theme.name}</h3>
    </hgroup>
    <hr>
    <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
    <ul class="tna-ul">
      <li>Alpha</li>
      <li>Beta</li>
      <li>Gamma</li>
    </ul>
    <a href="#" class="tna-button">Primary button</a>
    <a href="#" class="tna-button tna-button--secondary">Secondary button</a>
  </div>
</div>
<br>`,
    "",
  );
export const Test = Template.bind({});
