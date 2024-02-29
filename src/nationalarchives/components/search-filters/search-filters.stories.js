import Filters from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  rootHeadingLevel: { control: { type: "number", min: 1, max: 6 } },
  formId: { control: "text" },
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Search filters",
  argTypes,
};

const Template = ({
  title,
  rootHeadingLevel,
  formId,
  items,
  classes,
  attributes,
}) =>
  Filters({
    params: {
      title,
      rootHeadingLevel,
      formId,
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "Filters",
  rootHeadingLevel: 2,
  formId: "test-form",
  items: [
    {
      type: "text",
      label: "Refine your search",
      id: "refine1",
      name: "refine1",
      // open: true,
      hint: "Filter the current results further",
    },
    // {
    //   type: "single",
    //   label: "Type",
    //   id: "type1",
    //   name: "type1",
    //   small: true,
    //   // open: true,
    //   hint: "You can only select one.",
    //   items: [
    //     {
    //       text: "Audio",
    //       value: "audio",
    //     },
    //     {
    //       text: "Image",
    //       value: "image",
    //     },
    //     {
    //       text: "Video",
    //       value: "video",
    //     },
    //   ],
    // },
    {
      type: "multiple",
      label: "Categories",
      id: "categories1",
      name: "categories1",
      small: true,
      // open: true,
      hint: "What people call you by",
      // count: 2,
      // seeMoreText: 'See more',
      seeMoreUrl: "#",
      items: [
        {
          text: "Alpha",
          value: "alpha",
        },
        {
          text: "Beta",
          value: "beta",
          // checked: true,
        },
        {
          text: "Gamma",
          value: "gamma",
        },
      ],
    },
    {
      type: "date",
      label: "Opening date",
      id: "date1",
      name: "date1",
      hint: "The earliest opening date of the record",
    },
    {
      type: "daterange",
      label: "Covering date",
      id: "dates",
      hint: "The earliest and/or latest covering date of the record",
      // open: true,
      from: {
        label: "From",
        id: "date2",
        name: "date2",
      },
      to: {
        label: "To",
        id: "date3",
        name: "date3",
      },
    },
  ],
  classes: "tna-search-filters--demo",
};
