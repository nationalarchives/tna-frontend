import nunjucks from "nunjucks";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export const renderString = (Template, params, options = {}) => {
  const html = renderInlineString(Template, params);
  return wrapHtml(html, options);
};

export const wrapHtml = (html, options = {}) => {
  const {
    containerWrapper = false,
    theme = "light",
    accent = "blue",
    padded = false,
    templateClasses = "",
  } = options;
  return `<div class="tna-template${theme ? ` tna-template--${theme}-theme` : ""}${accent ? ` tna-template--${accent}-accent` : ""}${padded ? ` tna-template--padded` : ""}${templateClasses ? ` ${templateClasses}` : ""}">
  <div class="tna-template__body">
    ${containerWrapper ? `<div class="tna-container"><div class="tna-column tna-column--full">` : ""}
      ${html}
    ${containerWrapper ? `</div></div>` : ""}
  </div>
</div>`;
};

export const renderInlineString = (Template, params) => {
  return nunjucks.renderString(Template, params);
};
