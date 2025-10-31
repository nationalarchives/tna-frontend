import Accordion from "../../components/accordion/template.njk?raw";
import Breadcrumbs from "../../components/breadcrumbs/template.njk?raw";
import Button from "../../components/button/template.njk?raw";
import Card from "../../components/card/template.njk?raw";
import Checkboxes from "../../components/checkboxes/template.njk?raw";
import ErrorSummary from "../../components/error-summary/template.njk?raw";
import Footer from "../../components/footer/template.njk?raw";
import Gallery from "../../components/gallery/template.njk?raw";
import GlobalHeader from "../../components/global-header/template.njk?raw";
import Hero from "../../components/hero/template.njk?raw";
import IndexGrid from "../../components/index-grid/template.njk?raw";
import Pagination from "../../components/pagination/template.njk?raw";
import PhaseBanner from "../../components/phase-banner/template.njk?raw";
import Picture from "../../components/picture/template.njk?raw";
import Radios from "../../components/radios/template.njk?raw";
import SearchField from "../../components/search-field/template.njk?raw";
import Select from "../../components/select/template.njk?raw";
import SkipLink from "../../components/skip-link/template.njk?raw";
import Tabs from "../../components/tabs/template.njk?raw";
import TextInput from "../../components/text-input/template.njk?raw";
import Textarea from "../../components/textarea/template.njk?raw";
import Warning from "../../components/warning/template.njk?raw";
import nunjucks from "nunjucks";

nunjucks.configure("src");

const argTypes = {
  theme: {
    control: "radio",
    options: ["system", "light", "dark"],
  },
  accent: {
    control: "radio",
    options: ["none", "yellow", "pink", "orange", "green", "blue"],
  },
};

export default {
  title: "Utilities/Colours/Themes",
  argTypes,
};

const Template = ({ theme, accent }) => {
  document.documentElement.classList.remove(
    "tna-template",
    "tna-template--yellow-accent",
  );

  const cardDefaultOptions = {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "s",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Card body</p>",
    actions: [
      {
        text: "Card action",
        href: "#",
        title: "Go and do the action",
      },
    ],
  };

  return `<div class="tna-template ${
    theme === "system"
      ? "tna-template--system-theme"
      : theme === "dark"
        ? "tna-template--dark-theme"
        : theme === "high-contrast"
          ? "tna-template--high-contrast-theme"
          : theme === "dark high-contrast"
            ? "tna-template--dark-theme tna-template--high-contrast-theme"
            : ""
  } ${
    accent === "yellow"
      ? "tna-template--yellow-accent"
      : accent === "pink"
        ? "tna-template--pink-accent"
        : accent === "orange"
          ? "tna-template--orange-accent"
          : accent === "green"
            ? "tna-template--green-accent"
            : accent === "blue"
              ? "tna-template--blue-accent"
              : ""
  }">
  <div class="tna-template__body tna-template__body--padded">
    ${nunjucks.renderString(SkipLink, {
      params: {
        href: "main-content",
      },
    })}
    ${nunjucks.renderString(PhaseBanner, {
      params: {
        phase: "beta",
        message:
          'This is a new service - <a href="#">give us your feedback</a> to help improve it.',
        classes: "tna-background-accent",
      },
    })}
    ${nunjucks.renderString(GlobalHeader, {
      params: {
        logo: {
          href: "#/",
        },
        topNavigation: [
          {
            text: "Search",
            href: "https://www.nationalarchives.gov.uk/search/",
            icon: "search",
          },
          {
            text: "Shop",
            href: "#/shop",
            icon: "bag-shopping",
          },
          {
            text: "Sign in",
            href: "#/sign-in",
            icon: "user",
          },
        ],
        navigation: [
          {
            text: "Visit",
            href: "#/visit",
          },
          {
            text: "What’s on",
            href: "#/whats-on",
          },
          {
            text: "Explore the collection",
            href: "#/explore-the-collection",
          },
          {
            text: "Help using the archive",
            href: "#/using-the-archives",
          },
          {
            text: "Education",
            href: "#/education",
          },
          {
            text: "Professional guidance and services",
            href: "#/professional-guidance-and-services",
          },
        ],
      },
    })}
    <div class="tna-container">
      ${nunjucks.renderString(Breadcrumbs, {
        params: {
          items: [
            {
              text: "Alpha",
              href: "#/alpha",
            },
            {
              text: "Beta",
              href: "#/beta",
            },
            {
              text: "Gamma",
              href: "#/gamma",
            },
            {
              text: "Delta",
              href: "#/delta",
            },
            {
              text: "Epsilon",
              href: "#/epsilon",
            },
          ],
          classes: "tna-column tna-column--full tna-!--padding-vertical-s",
        },
      })}
    </div>
    <main class="tna-main" id="main-content">
      ${nunjucks.renderString(Hero, {
        params: {
          title: "Title",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          imageSrc:
            "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
          imageAlt: "The National Archives office",
          imageWidth: 600,
          imageHeight: 400,
          imageCaption: "An interesting photo by a famous photographer ©2023",
        },
      })}
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--width-2-3 tna-column--full-small tna-column--full-tiny">
          <hgroup class="tna-hgroup-l">
            <p class="tna-hgroup__supertitle">TNA colour theme</p>
            <h2 class="tna-hgroup__title">Heading</h2>
          </hgroup>
          <p>This is some body text <a href="#">link</a>.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <p>Donec ac tellus in dui rutrum maximus. Aliquam vel euismod eros. Integer ut magna velit. Fusce sed dui sit amet metus eleifend dictum quis vitae mi. Aenean sagittis euismod purus, in accumsan metus venenatis nec. Nullam nec velit felis. Sed nec felis eu nisl varius dictum eu quis nisl.</p>
          <p>Donec dapibus est arcu, vel pellentesque risus pellentesque eget.</p>
          <ul class="tna-ul">
            <li>Alpha</li>
            <li>Beta</li>
            <li>Gamma</li>
          </ul>
          <div class="tna-button-group">
            ${nunjucks.renderString(Button, {
              params: {
                text: "Primary button",
                href: "#",
              },
            })}
            ${nunjucks.renderString(Button, {
              params: {
                text: "Accent button",
                href: "#",
                accent: true,
              },
            })}
            ${nunjucks.renderString(Button, {
              params: {
                text: "Explore the collection",
                href: "#",
                icon: "map-location-dot",
              },
            })}
            ${nunjucks.renderString(Button, {
              params: {
                text: "Plain button",
                plain: true,
              },
            })}
          </div>
        </div>
        <div class="tna-column tna-column--no-padding tna-column--width-1-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
          <div class="tna-container tna-container--nested">
            <div class="tna-column tna-column--full tna-column--width-1-2-medium tna-column--width-1-2-small tna-!--margin-vertical-m tna-!--no-margin-top-large">
              <div class="tna-aside tna-background-contrast">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
                <div class="tna-button-group">
                  ${nunjucks.renderString(Button, {
                    params: {
                      text: "Accent button",
                      href: "#",
                      accent: true,
                    },
                  })}
                </div>
              </div>
            </div>
            <div class="tna-column tna-column--full tna-column--width-1-2-medium tna-column--width-1-2-small tna-!--margin-vertical-m tna-!--no-margin-top-large tna-!--no-margin-bottom-large">
              <div class="tna-aside tna-background-accent">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
                <div class="tna-button-group">
                  ${nunjucks.renderString(Button, {
                    params: {
                      text: "Primary button",
                      href: "#",
                    },
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          <h1 class="tna-heading-xl">
            This is a heading (XL)
          </h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h2 class="tna-heading-l">
            This is a heading (L)
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h3 class="tna-heading-m">
            This is a heading (M)
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h4 class="tna-heading-s">
            This is a heading (S)
          </h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup-xl">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (XL)</h2>
          </hgroup>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup-l">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (L)</h2>
          </hgroup>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup-m">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (M)</h2>
          </hgroup>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup-s">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (S)</h2>
          </hgroup>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <p class="tna-large-paragraph">Large paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <p class="tna-scene-setter">
            We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.
          </p>
          <blockquote class="tna-blockquote">
            <div class="tna-blockquote__quote">
              <p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>
            </div>
            <p class="tna-blockquote__citation">Douglas Adams, Mostly Harmless</p>
          </blockquote>
          <h2 class="tna-heading-m">
            <a href="#">Researching with The National Archives</a>
          </h2>
          <p>Lorem ipsum <a href="#">link</a></p>
          <hgroup class="tna-hgroup-m">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">
              <a href="#">Researching with The National Archives</a>
            </h2>
          </hgroup>
          <p>Lorem ipsum <a href="#">link</a></p>
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl">
            <dt>Alpha</dt>
            <dd>Lorem ipsum</dd>
            <dt>Beta</dt>
            <dd>Lorem ipsum</dd>
            <dt>Gamma</dt>
            <dd>Lorem ipsum</dd>
          </dl>
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl tna-dl--plain">
            <dt>Alpha</dt>
            <dd>Lorem ipsum</dd>
            <dt>Beta</dt>
            <dd>Lorem ipsum</dd>
            <dt>Gamma</dt>
            <dd>Lorem ipsum</dd>
          </dl>
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl tna-dl--stacked">
            <dt>Alpha</dt>
            <dd>Lorem ipsum</dd>
            <dt>Beta</dt>
            <dd>Lorem ipsum</dd>
            <dt>Gamma</dt>
            <dd>Lorem ipsum</dd>
          </dl>
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl tna-dl--stacked tna-dl--plain">
            <dt>Alpha</dt>
            <dd>Lorem ipsum</dd>
            <dt>Beta</dt>
            <dd>Lorem ipsum</dd>
            <dt>Gamma</dt>
            <dd>Lorem ipsum</dd>
          </dl>
        </div>
        <div class="tna-column tna-column--width-2-3 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl tna-dl--icon-padding ">
            <dt>
              <i class="fa-solid fa-landmark" aria-hidden="true"></i>
              Held by
            </dt>
            <dd>The National Archives, Kew</dd>
            <dt>
              <i class="fa-solid fa-calendar" aria-hidden="true"></i>
              Date
            </dt>
            <dd>1972–1979</dd>
            <dt>
              <i class="fa-solid fa-database" aria-hidden="true"></i>
              Reference
            </dt>
            <dd>LC 4</dd>
          </dl>
        </div>
        <div class="tna-column tna-column--full tna-!--margin-top-m">
          <h2 class="tna-heading-l">
            Categories
          </h2>
          <dl class="tna-dl-chips">
            <dt>Published</dt>
            <dd>
              <span class="tna-dl-chips__item">
                <i class="fa-solid fa-calendar"></i>
                2014
              </span>
            </dd>
            <dt>Author</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
            <dt>Category</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                Research
              </a>
            </dd>
            <dt>Comments</dt>
            <dd>
              <span class="tna-dl-chips__item">
                3 comments
              </span>
            </dd>
          </dl>
          <dl class="tna-dl-chips tna-dl-chips--plain">
            <dt>Published</dt>
            <dd>
              <span class="tna-dl-chips__item">
                <i class="fa-solid fa-calendar"></i>
                2014
              </span>
            </dd>
            <dt>Author</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                <i class="fa-solid fa-user"></i>
                James
              </a>
            </dd>
            <dt>Category</dt>
            <dd>
              <a href="#" class="tna-dl-chips__item">
                Research
              </a>
            </dd>
            <dt>Comments</dt>
            <dd>
              <span class="tna-dl-chips__item">
                3 comments
              </span>
            </dd>
          </dl>
          ${nunjucks.renderString(Warning, {
            params: {
              body: "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
            },
          })}
          <h2 class="tna-heading-l">
            Accordion
          </h2>
          ${nunjucks.renderString(Accordion, {
            params: {
              items: [
                {
                  title: "Alpha",
                  text: "Content",
                },
                {
                  title: "Beta",
                  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim. Donec bibendum est leo, sed dapibus mauris facilisis vitae.</p><p>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit mi vel rhoncus aliquam.</p><p>Pellentesque ultrices bibendum nibh, sit amet ornare turpis efficitur id. Aenean ullamcorper neque eget justo sagittis, rutrum ultrices urna varius. Mauris sodales a lorem at sodales.</p>",
                },
                {
                  title: "Gamma",
                  body: `<ul class="tna-ul">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Nulla dignissim vehicula magna, et hendrerit quam iaculis a. Mauris in ultricies enim.</li>
                    <li>Donec bibendum est leo, sed dapibus mauris facilisis vitae.</li>
                    <li>Quisque hendrerit condimentum nisl, non volutpat ex eleifend at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi id suscipit felis, sed tincidunt arcu. Etiam vel blandit diam, vitae commodo mi.</li>
                  </ul>`,
                },
                {
                  title: "Delta",
                  body: `<div class="tna-table-wrapper">
                    <table class="tna-table">
                      <caption class="tna-table__caption">
                        Records added and removed between 2020 and 2022.
                      </caption>
                      <thead class="tna-table__head">
                        <tr class="tna-table__row">
                          <th class="tna-table__header" scope="col">Year</th>
                          <th class="tna-table__header" scope="col">Chinese zodiac sign</th>
                          <th class="tna-table__header tna-table__header--numeric" scope="col">Records added</th>
                          <th class="tna-table__header tna-table__header--numeric" scope="col">Size (megabytes)</th>
                        </tr>
                      </thead>
                      <tbody class="tna-table__body">
                        <tr>
                          <th class="tna-table__header" scope="row">2020</th>
                          <td class="tna-table__cell">Rat</td>
                          <td class="tna-table__cell tna-table__cell--numeric">123,456</td>
                          <td class="tna-table__cell tna-table__cell--numeric">789</td>
                        </tr>
                        <tr>
                          <th class="tna-table__header" scope="row">2021</th>
                          <td class="tna-table__cell">Ox</td>
                          <td class="tna-table__cell tna-table__cell--numeric">456,789</td>
                          <td class="tna-table__cell tna-table__cell--numeric">123</td>
                        </tr>
                        <tr>
                          <th class="tna-table__header" scope="row">2022</th>
                          <td class="tna-table__cell">Tiger</td>
                          <td class="tna-table__cell tna-table__cell--numeric">42,424</td>
                          <td class="tna-table__cell tna-table__cell--numeric">1,337</td>
                        </tr>
                      </tbody>
                      <tfoot class="tna-table__foot">
                        <tr>
                          <th class="tna-table__header" scope="row">Totals</th>
                          <td class="tna-table__cell"></td>
                          <td class="tna-table__cell tna-table__cell--numeric">622,669</td>
                          <td class="tna-table__cell tna-table__cell--numeric">2,249</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>`,
                },
              ],
              group: "group-1",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          <p>Lorem ipsum</p>
          <p class="tna-!--no-margin-top">Lorem ipsum (tna-!--no-margin-top)</p>
          <p class="tna-!--margin-top-xs">Lorem ipsum (tna-!--margin-top-xs)</p>
          <p class="tna-!--margin-top-s">Lorem ipsum (tna-!--margin-top-s)</p>
          <p class="tna-!--margin-top-m">Lorem ipsum (tna-!--margin-top-m)</p>
          <p class="tna-!--margin-top-l">Lorem ipsum (tna-!--margin-top-l)</p>
          <p class="tna-!--margin-top-xl">Lorem ipsum (tna-!--margin-top-xl)</p>
        </div>
      </div>
      ${nunjucks.renderString(Hero, {
        params: {
          imageSrc:
            "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
          imageAlt: "The National Archives office",
          imageWidth: 600,
          imageHeight: 400,
          imageCaption: "An interesting photo by a famous photographer ©2023",
        },
      })}
      <div class="tna-section tna-!--padding-bottom-s">
        <ul class="tna-container">
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                style: "contrast",
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                style: "accent",
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
        </ul>
      </div>
      <hr>
      <div class="tna-section">
        <ul class="tna-container">
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                horizontal: true,
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                horizontal: true,
                style: "contrast",
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${nunjucks.renderString(Card, {
              params: {
                ...cardDefaultOptions,
                horizontal: true,
                style: "accent",
              },
            })}
          </li>
        </ul>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          ${nunjucks.renderString(Tabs, {
            params: {
              title: "Example tabs",
              items: [
                {
                  id: "unique-id-a",
                  title: "Alpha section",
                  body: "<p>Lorem ipsum</p>",
                },
                {
                  id: "unique-id-b",
                  title: "Beta section",
                  body: "<p>Lorem ipsum</p>",
                },
                {
                  id: "unique-id-c",
                  title: "Gamma section",
                  body: "<p>Lorem ipsum</p>",
                },
              ],
              classes: "tna-tabs--demo",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          ${nunjucks.renderString(Picture, {
            params: {
              src: "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
              alt: "The National Archives office",
              width: 600,
              height: 400,
              caption: "<p>This is a pretty image</p>",
              information: [
                {
                  id: "transcript",
                  title: "Transcript",
                  body: "<p>Lorem ipsum transcript</p>",
                },
                {
                  id: "translation",
                  title: "Translation",
                  body: "<p>Lorem ipsum translation</p>",
                },
              ],
              classes: "tna-picture--demo",
            },
          })}
        </div>
      </div>
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          ${nunjucks.renderString(Gallery, {
            params: {
              title: "My gallery",
              headingLevel: 2,
              text: "Lorem ipsum",
              items: [
                {
                  alt: "Photo 1",
                  width: 600,
                  height: 400,
                  src: "https://picsum.photos/id/50/600/400",
                  description: "This is photo number 1",
                },
                {
                  alt: "Photo 2",
                  width: 400,
                  height: 400,
                  src: "https://picsum.photos/id/51/600/600",
                  description: "This is photo number 2",
                },
                {
                  alt: "Photo 3",
                  width: 400,
                  height: 600,
                  src: "https://picsum.photos/id/52/400/600",
                  description: "This is photo number 3",
                },
              ],
              id: "test-gallery",
              classes: "tna-gallery--demo",
            },
          })}
        </div>
      </div>
      <div class="tna-section">
        ${nunjucks.renderString(IndexGrid, {
          params: {
            title: "My dogs 1",
            headingLevel: 3,
            href: "#",
            items: Array(4)
              .fill({
                ...{
                  href: "#",
                  src: "https://picsum.photos/id/237/800/600",
                  alt: "Photo of a puppy",
                  width: "800",
                  height: "600",
                  title: "Cat",
                  subtitle: "4 photos",
                },
              })
              .map((item, index) => {
                const pseudoRandom = ((index * 29) % 8) + 1;
                return {
                  ...item,
                  href: `#/category-${index}`,
                  title: `Category #${index + 101}`,
                  subtitle: `${pseudoRandom} photos`,
                };
              }),
            columns: 4,
            columnsMedium: 3,
            columnsSmall: 2,
            columnsTiny: 1,
          },
        })}
        <div class="tna-container">
          <div class="tna-column tna-column--full">
            ${nunjucks.renderString(Pagination, {
              params: {
                landmarkLabel: "My dogs 1 results",
                previous: {
                  href: "#",
                },
                items: [
                  {
                    number: 1,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 6,
                    href: "#",
                  },
                  {
                    number: 7,
                    current: true,
                    href: "#",
                  },
                  {
                    number: 8,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 42,
                    href: "#",
                  },
                ],
                next: {
                  href: "#",
                },
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${nunjucks.renderString(SearchField, {
              params: {
                label: "Catalogue search results",
                headingLevel: 3,
                headingSize: "l",
                id: "search1",
                name: "q",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
              <a href="" class="tna-button tna-button--solid-hover">Solid hover button</a>
              <a href="" class="tna-button tna-button--plain">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-tint">
        ${nunjucks.renderString(IndexGrid, {
          params: {
            title: "My dogs 2",
            headingLevel: 3,
            href: "#",
            items: Array(4)
              .fill({
                ...{
                  href: "#",
                  src: "https://picsum.photos/id/237/800/600",
                  alt: "Photo of a puppy",
                  width: "800",
                  height: "600",
                  title: "Cat",
                  subtitle: "4 photos",
                },
              })
              .map((item, index) => {
                const pseudoRandom = ((index * 29) % 8) + 1;
                return {
                  ...item,
                  href: `#/category-${index}`,
                  title: `Category #${index + 101}`,
                  subtitle: `${pseudoRandom} photos`,
                };
              }),
            columns: 4,
            columnsMedium: 3,
            columnsSmall: 2,
            columnsTiny: 1,
          },
        })}
        <div class="tna-container">
          <div class="tna-column tna-column--full">
            ${nunjucks.renderString(Pagination, {
              params: {
                landmarkLabel: "My dogs 2 results",
                previous: {
                  href: "#",
                },
                items: [
                  {
                    number: 1,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 6,
                    href: "#",
                  },
                  {
                    number: 7,
                    current: true,
                    href: "#",
                  },
                  {
                    number: 8,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 42,
                    href: "#",
                  },
                ],
                next: {
                  href: "#",
                },
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${nunjucks.renderString(SearchField, {
              params: {
                label: "Catalogue search results",
                headingLevel: 3,
                headingSize: "l",
                id: "search2",
                name: "q",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
              <a href="" class="tna-button tna-button--solid-hover">Solid hover button</a>
              <a href="" class="tna-button tna-button--plain">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-contrast">
        ${nunjucks.renderString(IndexGrid, {
          params: {
            title: "My dogs 3",
            headingLevel: 3,
            href: "#",
            items: Array(4)
              .fill({
                ...{
                  href: "#",
                  src: "https://picsum.photos/id/237/800/600",
                  alt: "Photo of a puppy",
                  width: "800",
                  height: "600",
                  title: "Cat",
                  subtitle: "4 photos",
                },
              })
              .map((item, index) => {
                const pseudoRandom = ((index * 29) % 8) + 1;
                return {
                  ...item,
                  href: `#/category-${index}`,
                  title: `Category #${index + 101}`,
                  subtitle: `${pseudoRandom} photos`,
                };
              }),
            columns: 4,
            columnsMedium: 3,
            columnsSmall: 2,
            columnsTiny: 1,
          },
        })}
        <div class="tna-container">
          <div class="tna-column tna-column--full">
            ${nunjucks.renderString(Pagination, {
              params: {
                landmarkLabel: "My dogs 3 results",
                previous: {
                  href: "#",
                },
                items: [
                  {
                    number: 1,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 6,
                    href: "#",
                  },
                  {
                    number: 7,
                    current: true,
                    href: "#",
                  },
                  {
                    number: 8,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 42,
                    href: "#",
                  },
                ],
                next: {
                  href: "#",
                },
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${nunjucks.renderString(SearchField, {
              params: {
                label: "Catalogue search results",
                headingLevel: 3,
                headingSize: "l",
                id: "search3",
                name: "q",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
              <a href="" class="tna-button tna-button--solid-hover">Solid hover button</a>
              <a href="" class="tna-button tna-button--plain">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-accent-light">
        ${nunjucks.renderString(IndexGrid, {
          params: {
            title: "My dogs 4",
            headingLevel: 3,
            href: "#",
            items: Array(4)
              .fill({
                ...{
                  href: "#",
                  src: "https://picsum.photos/id/237/800/600",
                  alt: "Photo of a puppy",
                  width: "800",
                  height: "600",
                  title: "Cat",
                  subtitle: "4 photos",
                },
              })
              .map((item, index) => {
                const pseudoRandom = ((index * 29) % 8) + 1;
                return {
                  ...item,
                  href: `#/category-${index}`,
                  title: `Category #${index + 101}`,
                  subtitle: `${pseudoRandom} photos`,
                };
              }),
            columns: 4,
            columnsMedium: 3,
            columnsSmall: 2,
            columnsTiny: 1,
          },
        })}
        <div class="tna-container">
          <div class="tna-column tna-column--full">
            ${nunjucks.renderString(Pagination, {
              params: {
                landmarkLabel: "My dogs 4 results",
                previous: {
                  href: "#",
                },
                items: [
                  {
                    number: 1,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 6,
                    href: "#",
                  },
                  {
                    number: 7,
                    current: true,
                    href: "#",
                  },
                  {
                    number: 8,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 42,
                    href: "#",
                  },
                ],
                next: {
                  href: "#",
                },
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${nunjucks.renderString(SearchField, {
              params: {
                label: "Catalogue search results",
                headingLevel: 3,
                headingSize: "l",
                id: "search4",
                name: "q",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
              <a href="" class="tna-button tna-button--solid-hover">Solid hover button</a>
              <a href="" class="tna-button tna-button--plain">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-accent">
        ${nunjucks.renderString(IndexGrid, {
          params: {
            title: "My dogs 5",
            headingLevel: 3,
            href: "#",
            items: Array(4)
              .fill({
                ...{
                  href: "#",
                  src: "https://picsum.photos/id/237/800/600",
                  alt: "Photo of a puppy",
                  width: "800",
                  height: "600",
                  title: "Cat",
                  subtitle: "4 photos",
                },
              })
              .map((item, index) => {
                const pseudoRandom = ((index * 29) % 8) + 1;
                return {
                  ...item,
                  href: `#/category-${index}`,
                  title: `Category #${index + 101}`,
                  subtitle: `${pseudoRandom} photos`,
                };
              }),
            columns: 4,
            columnsMedium: 3,
            columnsSmall: 2,
            columnsTiny: 1,
          },
        })}
        <div class="tna-container">
          <div class="tna-column tna-column--full">
            ${nunjucks.renderString(Pagination, {
              params: {
                landmarkLabel: "My dogs 5 results",
                previous: {
                  href: "#",
                },
                items: [
                  {
                    number: 1,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 6,
                    href: "#",
                  },
                  {
                    number: 7,
                    current: true,
                    href: "#",
                  },
                  {
                    number: 8,
                    href: "#",
                  },
                  {
                    ellipsis: true,
                  },
                  {
                    number: 42,
                    href: "#",
                  },
                ],
                next: {
                  href: "#",
                },
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${nunjucks.renderString(SearchField, {
              params: {
                label: "Catalogue search results",
                headingLevel: 3,
                headingSize: "l",
                id: "search5",
                name: "q",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
              <a href="" class="tna-button tna-button--solid-hover">Solid hover button</a>
              <a href="" class="tna-button tna-button--plain">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section">
        <div class="tna-container">
          <div class="tna-column tna-column--width-2-3 tna-column--full-small tna-column--full-tiny">
            <form>
              <h2 class="tna-heading tna-heading--l">
                Forms
              </h2>
              ${nunjucks.renderString(ErrorSummary, {
                params: {
                  title: "There is a problem",
                  headingLevel: 2,
                  items: [
                    {
                      text: "Enter a valid email address",
                      href: "#email",
                    },
                  ],
                  disableAutoFocus: true,
                },
              })}
              ${nunjucks.renderString(TextInput, {
                params: {
                  label: "Enter your name",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "name",
                  name: "name",
                  autocomplete: "name",
                },
              })}
              ${nunjucks.renderString(TextInput, {
                params: {
                  label: "Enter your email",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "email",
                  name: "email",
                  autocomplete: "email",
                  error: {
                    text: "Enter a valid email address",
                  },
                },
              })}
              ${nunjucks.renderString(Select, {
                params: {
                  label: "Sort by",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "sort",
                  name: "sort",
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
              ${nunjucks.renderString(Radios, {
                params: {
                  label: "Type",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "type",
                  name: "type",
                  items: [
                    {
                      text: "Audio",
                      value: "audio",
                    },
                    {
                      text: "Image",
                      value: "image",
                    },
                    {
                      text: "Video",
                      value: "video",
                    },
                  ],
                },
              })}
              ${nunjucks.renderString(Checkboxes, {
                params: {
                  label: "Categories",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "categories",
                  name: "categories",
                  items: [
                    {
                      text: "Alpha",
                      value: "alpha",
                    },
                    {
                      text: "Beta",
                      value: "beta",
                    },
                    {
                      text: "Gamma",
                      value: "gamma",
                    },
                  ],
                },
              })}
              ${nunjucks.renderString(Textarea, {
                params: {
                  label: "Enter your feedback",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "feedback",
                  name: "feedback",
                },
              })}
              <div class="tna-button-group">
                <button type="button" class="tna-button">
                  Submit
                </button>
                <a href="#" class="tna-button tna-button--plain">
                  Skip
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    ${nunjucks.renderString(Footer, {
      params: {
        social: [
          {
            href: "https://twitter.com/UKNatArchives",
            icon: "twitter",
            title: "The National Archives X feed (formerly known as Twitter)",
            shortTitle: "X (formerly Twitter)",
          },
          {
            href: "https://www.youtube.com/c/TheNationalArchivesUK",
            icon: "youtube",
            title: "The National Archives YouTube channel",
            shortTitle: "YouTube",
          },
          {
            href: "https://www.facebook.com/TheNationalArchives",
            icon: "facebook",
            title: "The National Archives Facebook page",
            shortTitle: "Facebook",
          },
          {
            href: "https://www.flickr.com/photos/nationalarchives",
            icon: "flickr",
            title: "The National Archives Flickr feed",
            shortTitle: "Flickr",
          },
          {
            href: "https://www.instagram.com/nationalarchivesuk/",
            icon: "instagram",
            title: "The National Archives Instagram feed",
            shortTitle: "Instagram",
          },
        ],
        navigation: [
          {
            title: "Quick links",
            items: [
              {
                text: "About us",
                href: "https://www.nationalarchives.gov.uk/about/",
              },
              {
                text: "Contact us",
                href: "https://www.nationalarchives.gov.uk/contact-us/",
              },
              {
                text: "News",
                href: "https://www.nationalarchives.gov.uk/about/news/",
              },
              {
                text: "Blogs",
                href: "https://www.nationalarchives.gov.uk/blogs/",
              },
              {
                text: "Podcasts",
                href: "https://media.nationalarchives.gov.uk/index.php/category/podcasts-2/",
              },
              {
                text: "Image library",
                href: "https://images.nationalarchives.gov.uk/",
              },
              {
                text: "Press room",
                href: "https://www.nationalarchives.gov.uk/about/press-room/",
              },
              {
                text: "Jobs",
                href: "https://www.nationalarchives.gov.uk/about/jobs/",
              },
              {
                text: "British citizenship services",
                href: "https://www.nationalarchives.gov.uk/contact-us/british-citizenship-services/",
              },
              {
                text: "Historical Manuscripts Commission",
                href: "https://www.nationalarchives.gov.uk/archives-sector/our-archives-sector-role/historical-manuscripts-commission/",
              },
            ],
          },
          {
            title: "Other websites",
            items: [
              {
                text: "UK Government Web Archive",
                href: "https://www.nationalarchives.gov.uk/webarchive/",
              },
              {
                text: "Legislation.gov.uk",
                href: "https://www.legislation.gov.uk/",
              },
              {
                text: "Find Case Law",
                href: "https://caselaw.nationalarchives.gov.uk/",
              },
              {
                text: "The Gazette",
                href: "https://www.thegazette.co.uk/",
              },
              {
                text: "The National Archives Trust",
                href: "https://www.nationalarchivestrust.org.uk/",
              },
              {
                text: "Friends of The National Archives",
                href: "https://ftna.org.uk/",
              },
              {
                text: "The National Archives Design System",
                href: "https://design-system.nationalarchives.gov.uk/",
              },
            ],
          },
        ],
        showNewsletter: true,
        legal: [
          {
            text: "Accessibility statement",
            href: "#/accessibility",
          },
          {
            text: "Freedom of information",
            href: "#/freedom-of-information",
          },
          {
            text: "Terms and conditions",
            href: "#/terms-and-conditions",
          },
          {
            text: "Privacy policy",
            href: "#/privacy",
          },
          {
            text: "Cookies",
            href: "#/cookies",
          },
        ],
      },
    })}
  </div>
</div>`;
};

export const System = Template.bind({});
System.parameters = {
  chromatic: { disableSnapshot: true },
};
System.args = {
  theme: "system",
  accent: "pink",
};

export const Light = Template.bind({});
Light.args = {
  theme: "light",
  accent: "pink",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "dark",
  accent: "pink",
};
