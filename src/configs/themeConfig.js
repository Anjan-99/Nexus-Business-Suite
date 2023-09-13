import { v4 as uuidv4 } from "uuid";
const themeConfig = {
  app: {
    name: "Nexus",
  },
  // layout
  layout: {
    isRTL: false,
    darkMode: true,
    semiDarkMode: false,
    skin: "default",
    contentWidth: "full",
    type: "horizontal",
    navBarType: "sticky",
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
