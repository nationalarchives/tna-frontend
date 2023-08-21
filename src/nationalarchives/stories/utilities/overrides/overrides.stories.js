const argTypes = {
  marginTop: {
    control: "radio",
    options: ["none", "xs", "s", "m", "l", "xl"],
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
  return `<p class="tna-!--margin-bottom-xl">Lorem ipsum (tna-!--margin-bottom-xl)</p>
    <p class="tna-!--margin-bottom-l">Lorem ipsum (tna-!--margin-bottom-l)</p>
    <p class="tna-!--margin-bottom-m">Lorem ipsum (tna-!--margin-bottom-m)</p>
    <p class="tna-!--margin-bottom-s">Lorem ipsum (tna-!--margin-bottom-s)</p>
    <p class="tna-!--margin-bottom-xs">Lorem ipsum (tna-!--margin-bottom-xs)</p>
    <p class="tna-!--no-margin-bottom">Lorem ipsum (tna-!--no-margin-bottom)</p>
    <p class="${marginClass}">Lorem ipsum (${marginClass})</p>`;
};

export const Margin = Template.bind({});
Margin.args = {
  marginTop: "none",
};
