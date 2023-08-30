import SkipLink from "../../../components/skip-link/template.njk";
import Header from "../../../components/header/template.njk";
import Breadcrumbs from "../../../components/breadcrumbs/template.njk";
import Card from "../../../components/card/template.njk";
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
    options: ["none", "black", "yellow", "pink", "orange", "green", "blue"],
  },
};

export default {
  title: "Utilities/Colour schemes",
  argTypes,
};

const Template = ({ theme, accent }) => {
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
        colour: "yellow",
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
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          <hgroup class="tna-hgroup tna-hgroup--l">
            <p class="tna-hgroup__supertitle">TNA colour theme</p>
            <h2 class="tna-hgroup__title">Heading</h2>
          </hgroup>
          <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
          <ul class="tna-ul">
            <li>Alpha</li>
            <li>Beta</li>
            <li>Gamma</li>
          </ul>
          <div class="tna-button-group">
            <a href="#" class="tna-button">Primary button</a>
            <a href="#" class="tna-button tna-button--accent">Accent button</a>
          </div>
          <h1 class="tna-heading tna-heading--xl">
            This is a heading (XL)
          </h1>
          <h2 class="tna-heading tna-heading--l">
            This is a heading (L)
          </h2>
          <h3 class="tna-heading tna-heading--m">
            This is a heading (M)
          </h3>
          <p class="tna-scene-setter">
            We are the official archive of England and Wales. Discover 1,000 years of history through <a href="#">fascinating stories</a> from the past or <a href="#">start your own research</a> and <a href="#">search our catalogue</a> of 32 million records. <a href="#">Plan a visit</a> to access original historic documents from our collections then enjoy the grounds, café, and <a href="#">free exhibitions</a>.
          </p>
          <blockquote class="tna-blockquote">
            <div class="tna-blockquote__quote">
              <p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>
            </div>
            <p class="tna-blockquote__author">Douglas Adams, Mostly Harmless</p>
          </blockquote>
          <h2 class="tna-heading">
            <a href="#">Reaerching with The National Archives</a>
          </h2>
          <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
        </div>
      </div>
      <hr>
      <div class="tna-container">
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
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          ${Message({
            params: {
              message:
                "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          ${Card({
            params: {
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
              classes: "tna-card--demo",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          ${Card({
            params: {
              heading: {
                supertitle: "Card supertitle",
                title: "Card title",
                level: 3,
                size: "l",
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
              featured: true,
              classes: "tna-card--demo",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          ${Tabs({
            params: {
              title: "Example tabs",
              items: [
                {
                  id: "unique-id-a",
                  title: "Alpha section",
                  body: "<h2>Alpha title</h2><p>Lorem ipsum</p>",
                },
                {
                  id: "unique-id-b",
                  title: "Beta section",
                  body: "<h2>Beta title</h2><p>Lorem ipsum</p>",
                },
                {
                  id: "unique-id-c",
                  title: "Gamma section",
                  body: "<h2>Gamma title</h2><p>Lorem ipsum</p>",
                },
              ],
              classes: "tna-tabs--demo",
            },
          })}
        </div>
      </div>
      <hr>
      <div class="tna-container">
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
      <div class="tna-background--accent-light">
        ${IndexGrid({
          params: {
            heading: "My dogs",
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
      <div class="tna-background--accent">
        ${IndexGrid({
          params: {
            heading: "My dogs",
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
    ${Footer({})}
  </div>
</div>`;
};

export const System = Template.bind({});
// System.parameters = { options: { showPanel: false } };
System.args = {
  theme: "system",
  accent: "none",
};

export const Light = Template.bind({});
Light.args = {
  theme: "light",
  accent: "none",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "dark",
  accent: "none",
};

export const LightHighContrast = Template.bind({});
LightHighContrast.args = {
  theme: "light high-contrast",
  accent: "none",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.args = {
  theme: "dark high-contrast",
  accent: "none",
};
