const argTypes = {
  marginTop: {
    control: "radio",
    options: [
      "none",
      // "xs",
      "s",
      "m",
      "l",
      "xl",
    ],
  },
};

export default {
  title: "Utilities/Overrides",
  argTypes,
};

const Template = ({ marginTop }) => {
  const marginClass =
    marginTop === "none"
      ? `tna-!--no-margin-top`
      : `tna-!--margin-top-${marginTop}`;
  return `<p class="tna-!--no-margin-bottom">Lorem ipsum</p>
    <p class="tna-!--no-margin-bottom tna-!--margin-top-s">Lorem ipsum (tna-!--margin-top-s)</p>
    <p class="tna-!--no-margin-bottom tna-!--margin-top-m">Lorem ipsum (tna-!--margin-top-m)</p>
    <p class="tna-!--no-margin-bottom tna-!--margin-top-l">Lorem ipsum (tna-!--margin-top-l)</p>
    <p class="tna-!--no-margin-bottom tna-!--margin-top-xl">Lorem ipsum (tna-!--margin-top-xl)</p>
    <p class="tna-!--no-margin-bottom ${marginClass}">Lorem ipsum (${marginClass})</p>`;
};

export const Margin = Template.bind({});
Margin.args = {
  marginTop: "none",
};
