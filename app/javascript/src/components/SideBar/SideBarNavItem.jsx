import React from "react";

import classnames from "classnames";
import { Link } from "react-router-dom";

const SideBarNavItem = ({
  label,
  icon,
  url = "",
  className = "",
  children,
}) => (
  <div
    className={classnames(
      "relative flex h-12 w-12 flex-col items-center justify-center rounded-md bg-gray-200 transition-all duration-300 hover:bg-gray-300",
      [className]
    )}
  >
    <Link className="flex flex-col items-center" to={url}>
      {icon && <i className={`ri-${icon} text-base`} />}
      {label && <span className="text-xs">{label}</span>}
    </Link>
    {children}
  </div>
);

export default SideBarNavItem;
