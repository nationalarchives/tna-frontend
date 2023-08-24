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
};

export default {
  title: "Utilities/Colour schemes",
  argTypes,
};

const Template = ({ theme }) => {
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
          <a href="#" class="tna-button">Primary button</a>
          <a href="#" class="tna-button tna-button--secondary">Secondary button</a>
        </div>
      </div>
      <hr>
      <div class="tna-container">
        <div class="tna-column tna-column--full">
          <p class="tna-!--no-margin-bottom">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!__padding-top--xs">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!__padding-top--s">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!__padding-top--m">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!__padding-top--l">Lorem ipsum</p>
          <p class="tna-!--no-margin-bottom tna-!__padding-top--xl">Lorem ipsum</p>
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
    </main>
    ${Footer({
      params: {
        meta: "<p>Open today<br />09:00&mdash;19:00</p>",
        social: [
          {
            text: "Twitter",
            href: "#",
            image: "./images/footer/twitter.svg",
          },
          {
            text: "YouTube",
            href: "#",
            image: "./images/footer/youtube.svg",
          },
          {
            text: "Facebook",
            href: "#",
            image: "./images/footer/facebook.svg",
          },
          {
            text: "Flickr",
            href: "#",
            image: "./images/footer/flickr.svg",
          },
          {
            text: "Instagram",
            href: "#",
            image: "./images/footer/instagram.svg",
          },
          {
            text: "RSS",
            href: "#",
            image: "./images/footer/rss.svg",
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
};

export const Light = Template.bind({});
Light.args = {
  theme: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "dark",
};

export const LightHighContrast = Template.bind({});
LightHighContrast.args = {
  theme: "light high-contrast",
};

export const DarkHighContrast = Template.bind({});
DarkHighContrast.args = {
  theme: "dark high-contrast",
};
