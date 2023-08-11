import Header from "../../components/header/template.njk";
import Breadcrumbs from "../../components/breadcrumbs/template.njk";
import Card from "../../components/card/template.njk";
import Hero from "../../components/hero/template.njk";
import IndexGrid from "../../components/index-grid/template.njk";
import Message from "../../components/message/template.njk";
import Picture from "../../components/picture/template.njk";
import Tabs from "../../components/tabs/template.njk";
import Footer from "../../components/footer/template.njk";
import { supportDynamicColourSchemes } from "../../../../.storybook/preview";

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
  title: "Experimental/Utilities/Colour themes",
  argTypes,
};

const Template = ({ theme }) => {
  if (supportDynamicColourSchemes) {
    // document.documentElement.classList.remove("tna-template--light-theme");
    // document.documentElement.classList.add("tna-template--system-theme");
  }
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
    ${Header({
      params: {
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
    <article>
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
          <hr>
          <p class="tna-p">Lorem ipsum <a href="#">link</a></p>
          <ul class="tna-ul">
            <li>Alpha</li>
            <li>Beta</li>
            <li>Gamma</li>
          </ul>
          <a href="#" class="tna-button">Primary button</a>
          <a href="#" class="tna-button tna-button--secondary">Secondary button</a>
          <hr>
          ${Message({
            params: {
              message:
                "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
            },
          })}
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
              body: "<p>Card body</p>",
              classes: "tna-card--demo",
            },
          })}
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
    <article>
    ${Footer({})}
  </div>
</div>`;
};

export const Examples = Template.bind({});
// Examples.parameters = { options: { showPanel: false } };
Examples.args = {
  theme: "light",
};
