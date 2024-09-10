import React from "react";

import { Link } from "react-router-dom";

const SideBarNavItem = ({ title, icon, url }) => (
  <Link
    className="flex h-16 w-16 flex-col items-center justify-center transition-all duration-300 hover:bg-gray-200"
    to={url}
  >
    {icon && <i className={`ri-${icon} text-base`} />}
    <span className="text-xs">{title}</span>
  </Link>
);

export default SideBarNavItem;
