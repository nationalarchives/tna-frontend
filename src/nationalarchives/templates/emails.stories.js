import Template from "./layouts/email.njk?raw";
import nunjucks from "nunjucks";
import "../email.scss";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Templates/Emails",
  argTypes: {
    subject: { control: "text" },
    panel: { control: "object" },
    content: { control: "text" },
    cta_buttons: { control: "object" },
    final_content: { control: "text" },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { ...params });
  },
};

export const Basic = {
  args: {
    subject: "Thank you for contacting The National Archives",
    content:
      "<p>Thank you for contacting The National Archives.</p><p>We look forward to being in touch.</p>",
  },
};

export const Confirmation = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    subject: "Your application has been received",
    panel: {
      title: "Application received",
      headingLevel: 1,
      headingSize: "l",
      body: "<p>Your reference number is <strong>TNA1756716690J57</strong>.</p>",
    },
    content:
      '<p>Thank you for contacting The National Archives with your application to film or record here.</p><p>You will receive a response from us about your application within 10 working days.</p><p>The details you have provided to us are listed below. If any of these are incorrect or if you have any questions regarding your enquiry, please email us at <a href="#">enquiry@nationalarchives.gov.uk</a> or call <a href="#">+44 (0) 20 8876 3444</a>, quoting your reference number.</p>',
  },
};

export const CallsToAction = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    subject: "Respond to a request to access a record",
    content:
      '<p>You have received a request to access the following record:</p><dl class="tna-dl"><dt>Record IAID</dt><dd>C1234</dd><dt>Record name</dt><dd>Example record</dd></dl><p>Please review the request and either accept or reject it.</p>',
    cta_buttons: [
      {
        text: "Accept this request",
        href: "#",
      },
      {
        text: "Reject this request",
        href: "#",
        plain: true,
      },
    ],
  },
};
