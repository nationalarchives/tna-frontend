import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Files list",
  argTypes: Object.fromEntries(
    Object.entries({
      itemHeadingLevel: { control: { type: "number", min: 1, max: 6 } },
      items: { control: "object" },
      fullAreaClick: { control: "boolean" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Default = {
  args: {
    itemHeadingLevel: 3,
    items: [
      {
        id: "file-1",
        text: "Preservation policy part 1",
        href: "#",
        fileType: "PDF",
        fileSize: "1.7MB",
        fileExtent: "120 pages",
        icon: "pdf",
        description:
          "The principles according to which The National Archives will preserve and care for our archival collections.",
      },
      {
        id: "file-2",
        text: "Preservation policy part 2",
        href: "#",
        fileType: "ZIP",
        fileSize: "0.9MB",
        icon: "zipper",
        description:
          "The principles according to which The National Archives will preserve and care for our archival collections.",
      },
      {
        id: "file-3",
        text: "Preservation policy part 3",
        href: "#",
        fileType: "DOC",
        fileSize: "3MB",
        fileExtent: "200 pages",
        icon: "word",
      },
      {
        id: "file-4",
        text: "Preservation policy part 4",
        href: "#",
        fileType: "TXT",
        fileSize: "3MB",
      },
    ],
    classes: "tna-files-list--demo",
  },
};
