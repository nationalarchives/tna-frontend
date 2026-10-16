import { expect, fireEvent, within } from "storybook/test";

import { Accordion } from "../src/nationalarchives/components/accordion/accordion.mjs";
import { Breadcrumbs } from "../src/nationalarchives/components/breadcrumbs/breadcrumbs.mjs";
import { CodeBlock } from "../src/nationalarchives/components/code-block/code-block.mjs";
import { CookieBanner } from "../src/nationalarchives/components/cookie-banner/cookie-banner.mjs";
import { DateInputProgressive } from "../src/nationalarchives/components/date-input/date-input.mjs";
import { ErrorSummary } from "../src/nationalarchives/components/error-summary/error-summary.mjs";
import { FileInputDroppable } from "../src/nationalarchives/components/file-input/file-input.mjs";
import { Footer } from "../src/nationalarchives/components/footer/footer.mjs";
import { Gallery } from "../src/nationalarchives/components/gallery/gallery.mjs";
import { GlobalHeader } from "../src/nationalarchives/components/global-header/global-header.mjs";
import { Header } from "../src/nationalarchives/components/header/header.mjs";
import { Picture } from "../src/nationalarchives/components/picture/picture.mjs";
import { Sidebar } from "../src/nationalarchives/components/sidebar/sidebar.mjs";
import { SkipLink } from "../src/nationalarchives/components/skip-link/skip-link.mjs";
import { Tabs } from "../src/nationalarchives/components/tabs/tabs.mjs";
import { TextInputPassword } from "../src/nationalarchives/components/text-input/text-input.mjs";
import { TextAreaItemisedRows } from "../src/nationalarchives/components/textarea/textarea.mjs";

export default {
  title: "Tests/Blank components",
  render: () => `
      <div data-module="tna-accordion"></div>
      <div data-module="tna-accordion">
        <div class="tna-accordion__item"></div>
      </div>
      <div data-module="tna-accordion">
        <button class="tna-accordion__toggle-all"></button>
        <div class="tna-accordion__item"></div>
      </div>

      <div data-module="tna-breadcrumbs"></div>
      <div data-module="tna-code-block"></div>
      <div data-module="tna-cookie-banner"></div>
      <div data-module="tna-date-input-progressive"></div>
      <div data-module="tna-error-summary"></div>
      <div data-module="tna-file-input"></div>
      <div data-module="tna-footer"></div>
      <div data-module="tna-gallery"></div>
      <div data-module="tna-global-header"></div>
      <div data-module="tna-header"></div>
      <div data-module="tna-picture"></div>
      <div data-module="tna-skip-link"></div>
      <div data-module="tna-tabs"></div>
      <div data-module="tna-text-input"></div>
      <div data-module="tna-textarea-itemised-rows"></div>
      <div class="tna-table-wrapper"></div>
    `,
};

export const Standard = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Initialised = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async () => {
    new Accordion();
    new Breadcrumbs();
    new CodeBlock();
    new CookieBanner();
    new DateInputProgressive();
    new ErrorSummary();
    new FileInputDroppable();
    new Footer();
    new Gallery();
    new GlobalHeader();
    new Header();
    new Picture();
    new Sidebar();
    new Sidebar(null, { disableHighlightSize: "foobar" });
    new SkipLink();
    new Tabs();
    new TextInputPassword();
    new TextAreaItemisedRows();
    new TextAreaItemisedRows(null, { enhancedHint: "" });
  },
};
