import Header from "./template.njk";
import "../../all.scss";
import "./_grid.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  columns: { control: "object" },
  maxWidth: { control: "boolean" },
  noPadding: { control: "boolean" },
  htmlElement: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "text" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Utilities/Grid",
  argTypes,
};

const Template = ({
  columns,
  maxWidth,
  noPadding,
  htmlElement,
  classes,
  attributes,
}) => {
  return Header({
    params: {
      columns,
      maxWidth,
      noPadding,
      htmlElement,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-container--demo",
  columns: [
    {
      html: "<p>Full width</p>",
      width: "full",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Two thirds</p>",
      width: "2-3",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Two thirds</p>",
      width: "2-3",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Quarter</p>",
      width: "1-4",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
    {
      html: "<p>Half</p>",
      width: "1-2",
    },
    {
      html: "<p>Third</p>",
      width: "1-3",
    },
    {
      html: "<p>Sixth</p>",
      width: "1-6",
    },
  ],
};

export const Responsive = Template.bind({});
const responsiveColumn = {
  html: "<p>Responsive</p>",
  width: "1-4",
  widthMedium: "1-3",
  widthSmall: "1-2",
  widthTiny: "full",
};
Responsive.args = {
  classes: "tna-container--demo",
  columns: Array(12).fill({ ...responsiveColumn }),
};
