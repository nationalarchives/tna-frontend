import { renderString } from "../../../.storybook/nunjucks.js";

import ErrorPageNotFoundTemplate from "./prototype-kit/error-page-not-found.njk?raw";
import ListTemplate from "./prototype-kit/list.njk?raw";
import PlainWithSidebarTemplate from "./prototype-kit/plain-with-sidebar.njk?raw";
import PlainTemplate from "./prototype-kit/plain.njk?raw";

export default {
  title: "Templates/Prototype Kit",
};

export const Plain = (params) => renderString(PlainTemplate, params);

export const PlainWithSidebar = (params) =>
  renderString(PlainWithSidebarTemplate, params);

export const List = (params) => renderString(ListTemplate, params);

export const ErrorPageNotFound = (params) =>
  renderString(ErrorPageNotFoundTemplate, params);
