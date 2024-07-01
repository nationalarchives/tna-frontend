import Files from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
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
  title: "Components/Files",
  argTypes,
};

const Template = ({ items, classes, attributes }) =>
  Files({
    params: {
      items,
      classes,
      attributes,
    },
  });

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      text: "Preservation policy part 1",
      href: "#",
      fileType: "PDF",
      fileSize: "1.7MB",
      fileExtent: "120 pages",
      description:
        "The principles according to which The National Archives will preserve and care for our archival collections.",
    },
    {
      text: "Preservation policy part 2",
      href: "#",
      fileType: "PDF",
      fileSize: "0.9MB",
      description:
        "The principles according to which The National Archives will preserve and care for our archival collections.",
    },
    {
      text: "Preservation policy part 3",
      href: "#",
      fileType: "PDF",
      fileSize: "3MB",
      fileExtent: "200 pages",
    },
  ],
  classes: "tna-files--demo",
};
