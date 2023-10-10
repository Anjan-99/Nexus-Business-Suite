import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";

// import images
import MobileLogo from "@/assets/images/logo/1.png";
import MobileLogoWhite from "@/assets/images/logo/2.png";

const SidebarLogo = ({ menuHover }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link to="/client">
        <div className="flex items-center justify-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img src={MobileLogo} width="85%" alt="" />
            ) : (
              <img src={MobileLogoWhite} width="85%" alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
            </div>
          )}
        </div>
      </Link>

      
    </div>
  );
};

export default SidebarLogo;
