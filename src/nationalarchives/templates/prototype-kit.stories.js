import nunjucks from "nunjucks";

import ErrorPageNotFoundTemplate from "./prototype-kit/error-page-not-found.njk?raw";
import IndexGridTemplate from "./prototype-kit/index-grid.njk?raw";
import ListTemplate from "./prototype-kit/list.njk?raw";
import PlainTemplate from "./prototype-kit/plain.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Templates/Prototype Kit",
};

export const Plain = (params) =>
  nunjucks.renderString(PlainTemplate, { ...params });

export const List = (params) =>
  nunjucks.renderString(ListTemplate, { ...params });

export const IndexGrid = (params) =>
  nunjucks.renderString(IndexGridTemplate, { ...params });

export const ErrorPageNotFound = (params) =>
  nunjucks.renderString(ErrorPageNotFoundTemplate, { ...params });
