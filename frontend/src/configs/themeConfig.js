import { v4 as uuidv4 } from "uuid";
const themeConfig = {
  app: {
    name: "Nexus Business Suite",
  },
  // layout
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    skin: "default",
    contentWidth: "full",
    type: "horizontal",
    navBarType: "floating",
    footerType: "static",
    isMonochrome: false,
    menu: {
      isCollapsed: false,
      isHidden: false,
    },
    mobileMenu: false,
    customizer: false,
  },
};

export default themeConfig;
