import React from "react";

const SideBarNavItem = ({ title, icon }) => (
  <a
    className="flex h-16 w-16 flex-col items-center justify-center transition-all duration-300 hover:bg-gray-200"
    href="#"
  >
    {icon && <i className={`ri-${icon} text-base`} />}
    <span className="text-xs">{title}</span>
  </a>
);

export default SideBarNavItem;
