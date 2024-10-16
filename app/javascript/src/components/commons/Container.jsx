import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import SideBar from "../SideBar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen">
    <SideBar />
    <div className="w-full justify-center overflow-y-scroll">
      <div className={classnames("mx-auto max-w-6xl px-6 pb-6", [className])}>
        {children}
      </div>
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
