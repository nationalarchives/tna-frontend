import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {};

export default {
  title: "Utilities/Overrides",
  argTypes,
};

const Template = () => `<div class="tna-spacing-demo">
  <p>Lorem ipsum</p>
  <p class="tna-!--no-margin-block-start">Lorem ipsum (tna-!--no-margin-block-start)</p>
  <p class="tna-!--margin-block-start-xs">Lorem ipsum (tna-!--margin-block-start-xs)</p>
  <p class="tna-!--margin-block-start-s">Lorem ipsum (tna-!--margin-block-start-s)</p>
  <p class="tna-!--margin-block-start-m">Lorem ipsum (tna-!--margin-block-start-m)</p>
  <p class="tna-!--margin-block-start-l">Lorem ipsum (tna-!--margin-block-start-l)</p>
  <p class="tna-!--margin-block-start-xl">Lorem ipsum (tna-!--margin-block-start-xl)</p>
  <p class="tna-!--margin-block-start-xxl">Lorem ipsum (tna-!--margin-block-start-xxl)</p>
</div>`;

export const Margin = Template.bind({});
Margin.parameters = {
  chromatic: { disableSnapshot: true },
};
Margin.args = {};

export const MarginMobile = Template.bind({});
MarginMobile.parameters = {
  chromatic: { disableSnapshot: true },
};
MarginMobile.parameters = {
  chromatic: {
    viewports: [customViewports.small.styles.width.replace(/px$/u, "")],
    disableSnapshot: true,
  },
};
MarginMobile.globals = {
  viewport: { value: "small" },
};
MarginMobile.args = {};
