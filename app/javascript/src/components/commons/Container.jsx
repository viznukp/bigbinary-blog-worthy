import React from "react";

import classnames from "classnames";

import SideBar from "components/SideBar";

const Container = ({ children, additionalSidebar, className = "" }) => (
  <div className="flex h-screen">
    <SideBar />
    {additionalSidebar}
    <div className="w-full overflow-y-scroll">
      <div className={classnames("mx-auto max-w-6xl px-6 pb-6", [className])}>
        {children}
      </div>
    </div>
  </div>
);

export default Container;
