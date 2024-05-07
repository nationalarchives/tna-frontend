import SkipLink from "../../../components/skip-link/template.njk";
import Breadcrumbs from "../../../components/breadcrumbs/template.njk";
import Button from "../../../components/button/template.njk";
import Card from "../../../components/card/template.njk";
import Checkboxes from "../../../components/checkboxes/template.njk";
import ErrorSummary from "../../../components/error-summary/template.njk";
import FeaturedRecords from "../../../components/featured-records/template.njk";
import Footer from "../../../components/footer/template.njk";
import Gallery from "../../../components/gallery/template.njk";
import GlobalHeader from "../../../components/global-header/template.njk";
import Hero from "../../../components/hero/template.njk";
import IndexGrid from "../../../components/index-grid/template.njk";
import Pagination from "../../../components/pagination/template.njk";
import PhaseBanner from "../../../components/phase-banner/template.njk";
import Picture from "../../../components/picture/template.njk";
import Radios from "../../../components/radios/template.njk";
import SearchField from "../../../components/search-field/template.njk";
import Select from "../../../components/select/template.njk";
import Tabs from "../../../components/tabs/template.njk";
import TextInput from "../../../components/text-input/template.njk";
import Textarea from "../../../components/textarea/template.njk";
import Warning from "../../../components/warning/template.njk";

const argTypes = {
  theme: {
    control: "radio",
    options: [
      "system",
      "light",
      "dark",
      // "light high-contrast",
      // "dark high-contrast",
    ],
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
    ${GlobalHeader({
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
            text: "What's on",
            href: "#/whats-on",
          },
          {
            text: "Explore the collection",
            href: "#/explore-the-collection",
          },
          {
            text: "Using the archives",
            href: "#/using-the-archives",
          },
          {
            text: "Learn",
            href: "#/learn",
          },
          {
            text: "Professional guidance and services",
            href: "#/professional-guidance-and-services",
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
    <main class="tna-main" id="main-content">
      ${Hero({
        params: {
          title: "Title",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          imageSrc:
            "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
          imageAlt: "The National Archives office",
          imageWidth: 499,
          imageHeight: 333,
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
          <h2 class="tna-heading-l">
            Categories
          </h2>
          <ul class="tna-chip-list">
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip">Chip 1</a>
            </li>
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip">
                <i class="fa-solid fa-heart" aria-hidden="true"></i>
                Chip 2
              </a>
            </li>
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip tna-chip--plain">Chip 3</a>
            </li>
            <li class="tna-chip-list__item">
              <a href="#" class="tna-chip tna-chip--plain">
                <i class="fa-solid fa-heart" aria-hidden="true"></i>
                Chip 4
              </a>
            </li>
          </ul>
          ${Warning({
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
                  imageSrc: "https://picsum.photos/id/237/400/600",
                  imageWidth: 400,
                  imageHeight: 600,
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
                style: "contrast",
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
                style: "contrast",
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
            title: "My dogs 1",
            headingLevel: 3,
            headingHref: "#",
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
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${SearchField({
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
        ${IndexGrid({
          params: {
            title: "My dogs 2",
            headingLevel: 3,
            headingHref: "#",
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
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${SearchField({
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
        ${IndexGrid({
          params: {
            title: "My dogs 3",
            headingLevel: 3,
            headingHref: "#",
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
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${SearchField({
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
        ${IndexGrid({
          params: {
            title: "My dogs 4",
            headingLevel: 3,
            headingHref: "#",
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
                classes: "tna-pagination--demo tna-!--margin-top-m",
              },
            })}
            ${SearchField({
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
        ${IndexGrid({
          params: {
            title: "My dogs 5",
            headingLevel: 3,
            headingHref: "#",
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
            ${Pagination({
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
            ${SearchField({
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
              ${ErrorSummary({
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
              ${TextInput({
                params: {
                  label: "Enter your name",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "name",
                  name: "name",
                  autofill: "name",
                },
              })}
              ${TextInput({
                params: {
                  label: "Enter your email",
                  headingLevel: 3,
                  headingSize: "m",
                  id: "email",
                  name: "email",
                  autofill: "email",
                  error: {
                    text: "Enter a valid email address",
                  },
                },
              })}
              ${Select({
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
              ${Radios({
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
              ${Checkboxes({
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
              ${Textarea({
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
    ${Footer({
      params: {
        meta: "<p>Open today<br>09:00&ndash;19:00</p>",
        social: [
          {
            href: "https://twitter.com/UKNatArchives",
            icon: "twitter",
            title: "The National Archives X feed (formally known as Twitter)",
          },
          {
            href: "https://www.youtube.com/c/TheNationalArchivesUK",
            icon: "youtube",
            title: "The National Archives YouTube channel",
          },
          {
            href: "https://www.facebook.com/TheNationalArchives",
            icon: "facebook",
            title: "The National Archives Facebook page",
          },
          {
            href: "https://www.flickr.com/photos/nationalarchives",
            icon: "flickr",
            title: "The National Archives Flickr feed",
          },
          {
            href: "https://www.instagram.com/nationalarchivesuk/",
            icon: "instagram",
            title: "The National Archives Instagram feed",
          },
          {
            href: "https://www.tiktok.com/@uknatarchives",
            icon: "tiktok",
            title: "The National Archives TikTok feed",
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
                text: "Blog",
                href: "https://blog.nationalarchives.gov.uk/",
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
                text: "Find case law",
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
Dark.parameters = {
  chromatic: { disableSnapshot: true },
};
Dark.args = {
  theme: "dark",
  accent: "pink",
};

// export const LightHighContrast = Template.bind({});
// LightHighContrast.parameters = {
//   chromatic: { disableSnapshot: true },
// };
// LightHighContrast.args = {
//   theme: "light high-contrast",
//   accent: "pink",
// };

// export const DarkHighContrast = Template.bind({});
// DarkHighContrast.parameters = {
//   chromatic: { disableSnapshot: true },
// };
// DarkHighContrast.args = {
//   theme: "dark high-contrast",
//   accent: "pink",
// };
