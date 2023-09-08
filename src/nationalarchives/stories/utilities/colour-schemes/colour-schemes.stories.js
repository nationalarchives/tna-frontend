import SkipLink from "../../../components/skip-link/template.njk";
import Header from "../../../components/header/template.njk";
import Breadcrumbs from "../../../components/breadcrumbs/template.njk";
import Button from "../../../components/button/template.njk";
import Card from "../../../components/card/template.njk";
import Gallery from "../../../components/gallery/template.njk";
import Hero from "../../../components/hero/template.njk";
import IndexGrid from "../../../components/index-grid/template.njk";
import Message from "../../../components/message/template.njk";
import Picture from "../../../components/picture/template.njk";
import Tabs from "../../../components/tabs/template.njk";
import Footer from "../../../components/footer/template.njk";

const argTypes = {
  theme: {
    control: "radio",
    options: [
      "system",
      "light",
      "dark",
      "light high-contrast",
      "dark high-contrast",
    ],
  },
  accent: {
    control: "radio",
    options: ["none", /*"black",*/ "yellow", "pink", "orange", "green", "blue"],
  },
};

export default {
  title: "Utilities/Colour schemes",
  argTypes,
};

const Template = ({ theme, accent }) => {
  const cardDefaultOptions = {
    heading: {
      supertitle: "Card supertitle",
      title: "Card title",
      level: 3,
      size: "m",
      singleSentence: false,
    },
    href: "#",
    image: {
      src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
      alt: "The National Archives office",
      width: 1996,
      height: 1331,
    },
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
      : theme === "light"
      ? "tna-template--light-theme"
      : theme === "dark"
      ? "tna-template--dark-theme"
      : theme === "light high-contrast"
      ? "tna-template--light-theme tna-template--high-contrast-theme"
      : theme === "dark high-contrast"
      ? "tna-template--dark-theme tna-template--high-contrast-theme"
      : ""
  } ${
    accent === "black"
      ? "tna-template--black-accent"
      : accent === "yellow"
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
    ${SkipLink({
      params: {
        href: "main-content",
      },
    })}
    ${Header({
      params: {
        logo: {
          strapline: "Colours",
          href: "#/",
        },
        navigation: [
          {
            text: "Alpha",
            href: "#/alpha",
            selected: true,
          },
          {
            text: "Beta",
            href: "#/beta",
          },
          {
            text: "Gamma",
            href: "#/gamma",
          },
        ],
      },
    })}
    ${Breadcrumbs({
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
      },
    })}
    <main id="main-content" role="main">
      ${Hero({
        params: {
          heading: "Title",
          image: {
            src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
            alt: "The National Archives office",
            width: 1996,
            height: 1331,
          },
          classes: "tna-hero--demo",
        },
      })}
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--width-2-3 tna-column--full-small tna-column--full-tiny">
          <hgroup class="tna-hgroup tna-hgroup--xl">
            <p class="tna-hgroup__supertitle">TNA colour theme</p>
            <h2 class="tna-hgroup__title">Heading</h2>
          </hgroup>
          <p class="tna-p">This is some body text <a href="#">link</a>.</p>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <p class="tna-p">Donec ac tellus in dui rutrum maximus. Aliquam vel euismod eros. Integer ut magna velit. Fusce sed dui sit amet metus eleifend dictum quis vitae mi. Aenean sagittis euismod purus, in accumsan metus venenatis nec. Nullam nec velit felis. Sed nec felis eu nisl varius dictum eu quis nisl.</p>
          <p class="tna-p">Donec dapibus est arcu, vel pellentesque risus pellentesque eget.</p>
          <ul class="tna-ul">
            <li>Alpha</li>
            <li>Beta</li>
            <li>Gamma</li>
          </ul>
          <div class="tna-button-group">
            ${Button({
              params: {
                text: "Primary button",
                href: "#",
              },
            })}
            ${Button({
              params: {
                text: "Accent button",
                href: "#",
                accent: true,
              },
            })}
            ${Button({
              params: {
                text: "Explore the collection",
                href: "#",
                icon: "map-location-dot",
              },
            })}
            ${Button({
              params: {
                text: "Tweet us",
                href: "#",
                brandIcon: "twitter",
              },
            })}
            ${Button({
              params: {
                text: "Tweet us",
                href: "#",
                accent: true,
                brandIcon: "twitter",
              },
            })}
          </div>
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--full-small tna-column--full-tiny">
          <div class="tna-aside tna-background--contrast tna-!--margin-top-l-small tna-!--margin-top-xl-tiny">
            <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          </div>
          <div class="tna-aside tna-background--accent">
            <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          </div>
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          <h1 class="tna-heading tna-heading--xl">
            This is a heading (XL)
          </h1>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h2 class="tna-heading tna-heading--l">
            This is a heading (L)
          </h2>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h3 class="tna-heading tna-heading--m">
            This is a heading (M)
          </h3>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <h4 class="tna-heading tna-heading--s">
            This is a heading (S)
          </h4>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup tna-hgroup--xl">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (XL)</h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup tna-hgroup--l">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (L)</h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup tna-hgroup--m">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (M)</h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <hgroup class="tna-hgroup tna-hgroup--s">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">This is a heading (S)</h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
          <p class="tna-scene-setter">
            We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.
          </p>
          <blockquote class="tna-blockquote">
            <div class="tna-blockquote__quote">
              <p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>
            </div>
            <p class="tna-blockquote__author">Douglas Adams, Mostly Harmless</p>
          </blockquote>
          <h2 class="tna-heading tna-heading--l">
            <a href="#">Reaerching with The National Archives</a>
          </h2>
          <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
          <hgroup class="tna-hgroup tna-hgroup--l">
            <p class="tna-hgroup__supertitle">Supertitle</p>
            <h2 class="tna-hgroup__title">
              <a href="#">Reaerching with The National Archives</a>
            </h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
          <ul class="tna-chip-list">
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip">Chip 1</a>
            </li>
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip">Chip 2</a>
            </li>
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip">Chip 3</a>
            </li>
          </ul>
          ${Message({
            params: {
              message:
                "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          <p class="tna-!--no-margin-bottom">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!--padding-top-xs">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!--padding-top-s">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!--padding-top-m">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!--padding-top-l">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!--padding-top-xl">Lorem ipsum</p>
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
          ${Card({
            params: { ...cardDefaultOptions },
          })}
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
          ${Card({
            params: { ...cardDefaultOptions, style: "boxed" },
          })}
        </div>
        <div class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
          ${Card({
            params: { ...cardDefaultOptions, style: "accent" },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
          ${Card({
            params: {
              ...cardDefaultOptions,
              horizontal: true,
              classes: "tna-!--margin-bottom-m",
            },
          })}
        </div>
        <div class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
          ${Card({
            params: {
              ...cardDefaultOptions,
              horizontal: true,
              style: "boxed",
              classes: "tna-!--margin-bottom-m",
            },
          })}
        </div>
        <div class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
          ${Card({
            params: {
              ...cardDefaultOptions,
              horizontal: true,
              style: "accent",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container tna-section">
        <div class="tna-column tna-column--full">
          ${Tabs({
            params: {
              title: "Example tabs",
              items: [
                {
                  id: "unique-id-a",
                  title: "Alpha section",
                  body: '<h2 class="tna-heading">Alpha title</h2><p>Lorem ipsum</p>',
                },
                {
                  id: "unique-id-b",
                  title: "Beta section",
                  body: '<h2 class="tna-heading">Beta title</h2><p>Lorem ipsum</p>',
                },
                {
                  id: "unique-id-c",
                  title: "Gamma section",
                  body: '<h2 class="tna-heading">Gamma title</h2><p>Lorem ipsum</p>',
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
          ${Picture({
            params: {
              src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
              alt: "The National Archives office",
              width: 1996,
              height: 1331,
              caption: "<p>This is a pretty image</p>",
              transcript: "<p>Lorem ipsum transcript</p>",
              translation: "<p>Lorem ipsum translation</p>",
              classes: "tna-picture--demo",
            },
          })}
        </div>
      </div>
      <hr>
      ${Gallery({
        params: {
          items: Array(6)
            .fill({
              alt: "",
              width: "",
              height: "",
            })
            .map((item, index) => ({
              ...item,
              src: `https://picsum.photos/id/${index + 1}/${
                index % 3 === 0
                  ? "800/600"
                  : index % 3 === 1
                  ? "600/600"
                  : "600/800"
              }`,
              alt: `Photo ${index + 1}`,
              description: `Photo #${index + 1}`,
            })),

          classes: "tna-gallery--demo",
        },
      })}
      <div class="tna-section">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs", href: "#" },
            items: Array(12)
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
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background--contrast">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs", href: "#" },
            items: Array(12)
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
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background--accent-light">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs", href: "#" },
            items: Array(12)
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
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent">Accent button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background--accent">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs", href: "#" },
            items: Array(12)
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
            <div class="tna-button-group">
              <a href="#" class="tna-button">Primary button</a>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${Footer({
      params: {
        meta: "<p>Open today<br />09:00&mdash;19:00</p>",
        social: [
          {
            text: "Twitter",
            href: "#",
            brandIcon: "twitter",
          },
          {
            text: "YouTube",
            href: "#",
            brandIcon: "youtube",
          },
          {
            text: "Facebook",
            href: "#",
            brandIcon: "facebook",
          },
          {
            text: "Flickr",
            href: "#",
            brandIcon: "flickr",
          },
          {
            text: "Instagram",
            href: "#",
            brandIcon: "instagram",
          },
          {
            text: "RSS",
            href: "#",
            icon: "rss",
          },
        ],
        navigation: [
          {
            title: "About us",
            items: [
              {
                text: "Our role",
                href: "#",
              },
              {
                text: "Our history",
                href: "#",
              },
              {
                text: "Our collection",
                href: "#",
              },
              {
                text: "Our people",
                href: "#",
              },
              {
                text: "How we are run",
                href: "#",
              },
              {
                text: "Our research amd academic collaboration",
                href: "#",
              },
              {
                text: "News",
                href: "#",
              },
              {
                text: "Contact us",
                href: "#",
              },
              {
                text: "Jobs & careers",
                href: "#",
              },
              {
                text: "Get involved",
                href: "#",
              },
            ],
          },
          {
            title: "Our websites help",
            items: [
              {
                text: "UK Government Web Archive",
                href: "#",
                newTab: true,
              },
              {
                text: "Legislation.gov.uk",
                href: "#",
                newTab: true,
              },
              {
                text: "Find case law",
                href: "#",
                newTab: true,
              },
              {
                text: "The Gazette",
                href: "#",
                newTab: true,
              },
            ],
          },
          {
            title: "Quick links",
            items: [
              {
                text: "Press room",
                href: "#",
              },
              {
                text: "Venue hire",
                href: "#",
              },
            ],
          },
        ],
        showNewsletter: true,
        legal: [
          {
            text: "Accessibility statement",
            href: "#",
          },
          {
            text: "Freedom of information",
            href: "#",
          },
          {
            text: "Terms and condidtions",
            href: "#",
          },
          {
            text: "Privacy policy",
            href: "#",
          },
          {
            text: "Cookies",
            href: "#",
          },
        ],
      },
    })}
  </div>
</div>`;
};

export const System = Template.bind({});
// System.parameters = { options: { showPanel: false } };
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

export const LightHighContrast = Template.bind({});
LightHighContrast.args = {
  theme: "light high-contrast",
  accent: "pink",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.args = {
  theme: "dark high-contrast",
  accent: "pink",
};
