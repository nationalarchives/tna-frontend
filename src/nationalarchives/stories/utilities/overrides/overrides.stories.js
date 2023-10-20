const argTypes = {};

export default {
  title: "Utilities/Overrides",
  argTypes,
};

const Template = () => {
  return `<p>Lorem ipsum</p>
  <p class="tna-!--no-margin-top">Lorem ipsum (tna-!--no-margin-top)</p>
  <p class="tna-!--margin-top-xs">Lorem ipsum (tna-!--margin-top-xs)</p>
  <p class="tna-!--margin-top-s">Lorem ipsum (tna-!--margin-top-s)</p>
  <p class="tna-!--margin-top-m">Lorem ipsum (tna-!--margin-top-m)</p>
  <p class="tna-!--margin-top-l">Lorem ipsum (tna-!--margin-top-l)</p>
  <p class="tna-!--margin-top-xl">Lorem ipsum (tna-!--margin-top-xl)</p>`;
};

export const Margin = Template.bind({});
Margin.args = {};
