import "../src/nationalarchives/all.scss";

document.documentElement.classList.add("tna-template");
document.documentElement.classList.add("tna-template--system-theme");
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

export const parameters = {
  actions: {
    disable: true,
  },
};
