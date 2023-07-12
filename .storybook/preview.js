import "../src/nationalarchives/all.scss";

document.documentElement.classList.add("tna-template");
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
// document.documentElement.classList.remove("js-disabled");
document.body.classList.add("tna-template__body");

export const parameters = {
  actions: {
    disable: true,
  },
};
