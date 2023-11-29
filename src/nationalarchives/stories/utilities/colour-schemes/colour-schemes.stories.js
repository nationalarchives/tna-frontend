import SkipLink from "../../../components/skip-link/template.njk";
import Breadcrumbs from "../../../components/breadcrumbs/template.njk";
import Button from "../../../components/button/template.njk";
import Card from "../../../components/card/template.njk";
import FeaturedRecords from "../../../components/featured-records/template.njk";
import Footer from "../../../components/footer/template.njk";
import CookieBanner from "../../../components/cookie-banner/template.njk";
import Gallery from "../../../components/gallery/template.njk";
import Header from "../../../components/header/template.njk";
import Hero from "../../../components/hero/template.njk";
import IndexGrid from "../../../components/index-grid/template.njk";
import Message from "../../../components/message/template.njk";
import Pagination from "../../../components/pagination/template.njk";
import PhaseBanner from "../../../components/phase-banner/template.njk";
import Picture from "../../../components/picture/template.njk";
import Tabs from "../../../components/tabs/template.njk";

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
    options: ["none", "yellow", "pink", "orange", "green", "blue"],
  },
};

export default {
  title: "Utilities/Colour schemes",
  argTypes,
};

const Template = ({ theme, accent }) => {
  const cardDefaultOptions = {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "s",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 499,
    imageHeight: 333,
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
    <!--
    ${CookieBanner({
      params: {
        cookiesUrl: "#",
      },
    })}
    -->
    ${SkipLink({
      params: {
        href: "main-content",
      },
    })}
    ${PhaseBanner({
      params: {
        phase: "beta",
        message:
          'This is a new service - <a href="#">give us your feedback</a> to help improve it.',
        accent: true,
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
    <div class="tna-container">
      <div class="tna-column tna-column--full">
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
      </div>
    </div>
    <main id="main-content" role="main">
      ${Hero({
        params: {
          heading: "Title",
          body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
          imageSrc:
            "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
          imageAlt: "The National Archives office",
          imageWidth: 499,
          imageHeight: 333,
          imageCaption: "An interesting photo by a famous photographer ©2023",
          classes: "tna-hero--demo",
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
            ${Button({
              params: {
                text: "Plain button",
                plain: true,
              },
            })}
          </div>
        </div>
        <div class="tna-column tna-column--no-padding tna-column--width-1-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
          <div class="tna-container tna-container--no-padding">
            <div class="tna-column tna-column--full tna-column--width-1-2-medium tna-column--width-1-2-small tna-!--margin-vertical-m tna-!--no-margin-top-large">
              <div class="tna-aside tna-background-contrast">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis. Sed odio libero, sodales eleifend lorem sit amet, feugiat consequat nibh.</p>
                <div class="tna-button-group">
                  ${Button({
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
                  ${Button({
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
            <p class="tna-blockquote__author">Douglas Adams, Mostly Harmless</p>
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
        <div class="tna-column tna-column--width-1-2 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
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
        <div class="tna-column tna-column--width-1-2 tna-column--full-small tna-column--full-tiny tna-!--margin-top-m">
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
        <div class="tna-column tna-column--full tna-!--margin-top-m">
          <h3 class="tna-heading-m">
            Descriptions
          </h3>
          <dl class="tna-dl tna-dl--icon-padding ">
            <dt>
              <i class="fa-solid fa-landmark"></i>
              Held by
            </dt>
            <dd>The National Archives, Kew</dd>
            <dt>
              <i class="fa-solid fa-calendar"></i>
              Date
            </dt>
            <dd>1972–1979</dd>
            <dt>
              <i class="fa-solid fa-database"></i>
              Reference
            </dt>
            <dd>LC 4</dd>
          </dl>
          <h2 class="tna-heading-l">
            Categories
          </h2>
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
          <h2 class="tna-heading-l">
            Featured records
          </h2>
          ${FeaturedRecords({
            params: {
              items: [
                {
                  imageSrc:
                    "https://beta.nationalarchives.gov.uk/media/images/wedderburn-trial.max-832x591.format-webp_i3c9pUH.webp",
                  imageWidth: 576,
                  imageHeight: 591,
                  collection: "TS 11/45/167",
                  title: "Court records relating to Robert Wedderburn's trial",
                  href: "#",
                  date: "1819–1820",
                },
                {
                  collection: "HO 42/191",
                  title: "Home office letters",
                  href: "#",
                  date: "1819",
                },
              ],
              classes: "tna-featured-records--demo",
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
      ${Hero({
        params: {
          imageSrc:
            "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
          imageAlt: "The National Archives office",
          imageWidth: 499,
          imageHeight: 333,
          imageCaption: "An interesting photo by a famous photographer ©2023",
          classes: "tna-hero--demo",
        },
      })}
      <div class="tna-section tna-!--padding-bottom-s">
        <ul class="tna-ul tna-ul--plain tna-container">
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${Card({
              params: {
                ...cardDefaultOptions,
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${Card({
              params: {
                ...cardDefaultOptions,
                style: "boxed",
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny">
            ${Card({
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
        <ul class="tna-ul tna-ul--plain tna-container">
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${Card({
              params: {
                ...cardDefaultOptions,
                horizontal: true,
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${Card({
              params: {
                ...cardDefaultOptions,
                horizontal: true,
                style: "boxed",
                classes: "tna-!--margin-bottom-m",
              },
            })}
          </li>
          <li class="tna-column tna-column--width-2-3 tna-column--full-medium tna-column--full-small tna-column--full-tiny">
            ${Card({
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
          ${Tabs({
            params: {
              title: "Example tabs",
              items: [
                {
                  id: "unique-id-a",
                  title: "Alpha section",
                  body: '<h2 class="tna-heading-l">Alpha title</h2><p>Lorem ipsum</p>',
                },
                {
                  id: "unique-id-b",
                  title: "Beta section",
                  body: '<h2 class="tna-heading-l">Beta title</h2><p>Lorem ipsum</p>',
                },
                {
                  id: "unique-id-c",
                  title: "Gamma section",
                  body: '<h2 class="tna-heading-l">Gamma title</h2><p>Lorem ipsum</p>',
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
              width: 499,
              height: 333,
              caption: "<p>This is a pretty image</p>",
              transcript: "<p>Lorem ipsum transcript</p>",
              translation: "<p>Lorem ipsum translation</p>",
              classes: "tna-picture--demo",
            },
          })}
        </div>
      </div>
      ${Gallery({
        params: {
          heading: { title: "My gallery", level: 3 },
          items: [
            {
              src: "https://picsum.photos/id/1/800/600",
              alt: "",
              width: 800,
              height: 600,
            },
            {
              src: "https://picsum.photos/id/2/600/800",
              alt: "",
              width: 600,
              height: 800,
              description: "Image description",
            },
            {
              src: "https://picsum.photos/id/3/800/800",
              alt: "",
              width: 800,
              height: 800,
              tabs: [
                {
                  id: "gallery-tabs-3-1",
                  title: "Transcript",
                  body: "<p>TEST TRANSCRIPT</p>",
                },
                {
                  id: "gallery-tabs-3-2",
                  title: "Translation",
                  body: "<p>TEST TRANSLATION</p>",
                },
              ],
            },
            {
              src: "https://picsum.photos/id/4/800/600",
              alt: "",
              width: 800,
              height: 600,
              description: "Image description",
              tabs: [
                {
                  id: "gallery-tabs-4-1",
                  title: "Transcript",
                  body: "<p>TEST TRANSCRIPT</p>",
                },
                {
                  id: "gallery-tabs-4-2",
                  title: "Translation",
                  body: "<p>TEST TRANSLATION</p>",
                },
              ],
            },
          ],
          classes: "tna-gallery--demo",
        },
      })}
      <div class="tna-section">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs 1", level: 3, href: "#" },
            items: Array(6)
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
            ${Pagination({
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
                classes: "tna-pagination--demo",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button" role="button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent" role="button">Accent button</a>
              <a href="" class="tna-button tna-button--plain" role="button">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-tint">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs 2", level: 3, href: "#" },
            items: Array(6)
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
            ${Pagination({
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
                classes: "tna-pagination--demo",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button" role="button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent" role="button">Accent button</a>
              <a href="" class="tna-button tna-button--plain" role="button">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-contrast">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs 3", level: 3, href: "#" },
            items: Array(6)
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
            ${Pagination({
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
                classes: "tna-pagination--demo",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button" role="button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent" role="button">Accent button</a>
              <a href="" class="tna-button tna-button--plain" role="button">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-accent-light">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs 4", level: 3, href: "#" },
            items: Array(6)
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
            ${Pagination({
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
                classes: "tna-pagination--demo",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button" role="button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent" role="button">Accent button</a>
              <a href="" class="tna-button tna-button--plain" role="button">Plain button</a>
            </div>
          </div>
        </div>
      </div>
      <div class="tna-section tna-background-accent">
        ${IndexGrid({
          params: {
            heading: { title: "My dogs 5", level: 3, href: "#" },
            items: Array(6)
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
            ${Pagination({
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
                classes: "tna-pagination--demo",
              },
            })}
            <div class="tna-button-group">
              <a href="#" class="tna-button" role="button">Primary button</a>
              <a href="#" class="tna-button tna-button--accent" role="button">Accent button</a>
              <a href="" class="tna-button tna-button--plain" role="button">Plain button</a>
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
            title: "Our websites",
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
            text: "Terms and conditions",
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

const CombinationsTemplate = () => {
  const themes = [
    "tna-template--light-theme",
    "tna-template--light-theme tna-template--high-contrast-theme",
    "tna-template--dark-theme",
    "tna-template--dark-theme tna-template--high-contrast-theme",
  ];

  const accents = [
    "",
    // "tna-template--black-accent",
    "tna-template--yellow-accent",
    "tna-template--pink-accent",
    "tna-template--orange-accent",
    "tna-template--green-accent",
    "tna-template--blue-accent",
  ];

  const blocks = [
    "",
    "tna-background-tint",
    "tna-background-accent-light",
    "tna-background-accent",
    "tna-background-contrast",
  ];

  return `<div class="tna-colour-contrast-demo">
  <div class="tna-colour-contrast-demo__header">
    <div class="tna-colour-contrast-demo__block">
      Blocks
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__block">
      ${block.replace(/^tna-background-/, "") || "Base"}
    </div>`,
      "",
    )}
  </div>
  <div class="tna-colour-contrast-demo__examples">
  ${themes.reduce(
    (themeOutput, theme) =>
      `${themeOutput}${accents.reduce(
        (
          accentOutput,
          accent,
        ) => `${accentOutput}<div class="tna-colour-contrast-demo__theme-accent">
    <div class="tna-colour-contrast-demo__example">
      <p>Theme: <strong>${theme
        .replace(/tna-template--/g, "")
        .replace(/-theme/g, "")}</strong></p>
      <p>Accent: <strong>${
        accent.replace(/tna-template--/g, "").replace(/-accent/g, "") ||
        "[none]"
      }</strong></p>
    </div>
    ${blocks.reduce(
      (blockOutput, block) =>
        `${blockOutput}<div class="tna-colour-contrast-demo__example tna-template ${theme} ${accent}">
      <div class="tna-template__body">
        <div class="tna-colour-contrast-demo__example-content ${block}">
          <p>Text</p>
          <p><a href="#"><strong>Link</strong></a> / <a href="#" class="tna-colour-contrast-demo__link--visited"><strong>Link (visited)</strong></a></p>
          <span class="tna-chip">Chip</span>
          <div class="tna-button-group">
            ${Button({
              params: {
                text: "Button",
                small: true,
              },
            })}
            ${Button({
              params: {
                text: "Button",
                small: true,
                accent: true,
              },
            })}
            ${Button({
              params: {
                text: "Button",
                small: true,
                plain: true,
              },
            })}
            <!--${Button({
              params: {
                text: "Button",
                accent: true,
                class: "tna-button--solid-hover",
              },
            })}-->
          </div>
          <!--${Pagination({
            params: {
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
                  number: 7,
                  current: true,
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
            },
          })}-->
        </div>
      </div>
    </div>`,
      "",
    )}
  </div>`,
        "",
      )}`,
    "",
  )}
  </div>
</div>`;
};

export const Combinations = CombinationsTemplate.bind({});
Combinations.args = {};
