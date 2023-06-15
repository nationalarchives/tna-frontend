import Header from "./template.njk";
import "../../all.scss";
import "./_header.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  logo: { control: "boolean" },
  productName: { control: "text" },
  homepageUrl: { control: "text" },
  serviceName: { control: "text" },
  serviceUrl: { control: "text" },
  navigation: { control: "object" },
  navigationLabel: { control: "text" },
  menuButtonLabel: { control: "text" },
  fullWidth: { control: "boolean" },
  classes: { control: "text" },
  containerClasses: { control: "text" },
  attributes: { control: "text" },
  navigationClasses: { control: "text" },
  navigationContainerClasses: { control: "text" },
  navigationAttributes: { control: "text" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Components/Header",
  argTypes,
};

const Template = ({
  logo,
  productName,
  homepageUrl,
  serviceName,
  serviceUrl,
  navigation,
  navigationLabel,
  menuButtonLabel,
  fullWidth,
  classes,
  containerClasses,
  attributes,
  navigationClasses,
  navigationContainerClasses,
  navigationAttributes,
}) => {
  return Header({
    params: {
      logo,
      productName,
      homepageUrl,
      serviceName,
      serviceUrl,
      navigation,
      navigationLabel,
      menuButtonLabel,
      fullWidth,
      containerClasses,
      classes,
      attributes,
      navigationClasses,
      navigationContainerClasses,
      navigationAttributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  serviceName: "My Service",
};

export const ServiceNameWithLink = Template.bind({});
ServiceNameWithLink.args = {
  serviceName: "My Service",
  serviceUrl: "#",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  serviceName: "My Service",
  fullWidth: true,
};

export const WithLogo = Template.bind({});
WithLogo.args = {
  logo: true,
  serviceName: "My Service",
};

export const WithLogoAndLink = Template.bind({});
WithLogoAndLink.args = {
  logo: true,
  homepageUrl: "#",
  serviceName: "My Service",
};

export const WithProductName = Template.bind({});
WithProductName.args = {
  productName: "The National Archives",
  serviceName: "My Service",
};

export const WithProductNameAndLink = Template.bind({});
WithProductNameAndLink.args = {
  homepageUrl: "#",
  productName: "The National Archives",
  serviceName: "My Service",
};

export const WithProductNameAndLogo = Template.bind({});
WithProductNameAndLogo.args = {
  logo: true,
  productName: "My Product",
  serviceName: "My Service",
};

export const WithProductNameAndLogoAndLink = Template.bind({});
WithProductNameAndLogoAndLink.args = {
  logo: true,
  productName: "My Product",
  homepageUrl: "#",
  serviceName: "My Service",
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  logo: true,
  productName: "My Product",
  homepageUrl: "#",
  serviceName: "My Service",
  serviceUrl: "#",
  navigation: [
    {
      text: "Page 1",
      href: "#",
      active: true,
    },
    {
      text: "Page 2",
      href: "#",
    },
    {
      text: "Page 3",
      href: "#",
    },
  ],
};
