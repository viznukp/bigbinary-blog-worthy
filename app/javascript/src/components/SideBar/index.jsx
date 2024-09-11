import React from "react";

import BlogWorthyLogo from "./BlogWorthyLogo";
import SideBarNavItem from "./SideBarNavItem";

const SideBar = () => (
  <div className="flex w-16 flex-col items-center space-y-4 border-r border-gray-300 px-10">
    <BlogWorthyLogo className="mt-4" height={64} width={64} />
    <nav className="flex-1 space-y-4 px-4 py-6">
      <SideBarNavItem icon="dashboard-line" title="Posts" url="/" />
    </nav>
  </div>
);

export default SideBar;
