import PlainTemplate from "./plain.njk?raw";
import ListTemplate from "./list.njk?raw";
import IndexGridTemplate from "./index-grid.njk?raw";
import ErrorPageNotFoundTemplate from "./error-page-not-found.njk?raw";
import nunjucks from "nunjucks";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Templates/Prototype kit",
};

export const Plain = (params) => {
  return nunjucks.renderString(PlainTemplate, { ...params });
};

export const List = (params) => {
  return nunjucks.renderString(ListTemplate, { ...params });
};

export const IndexGrid = (params) => {
  return nunjucks.renderString(IndexGridTemplate, { ...params });
};

export const ErrorPageNotFound = (params) => {
  return nunjucks.renderString(ErrorPageNotFoundTemplate, { ...params });
};
