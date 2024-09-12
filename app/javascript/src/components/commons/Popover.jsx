import React, { useState, useEffect, useRef } from "react";

import classnames from "classnames";

const Popover = ({ label, icon, className = "", children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  const toggleMenu = () => {
    setIsMenuVisible(prevValue => !prevValue);
  };

  return (
    <div
      ref={menuRef}
      className={classnames(
        "flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-200 transition-all duration-300 hover:bg-gray-300",
        [className, "relative"]
      )}
      onClick={toggleMenu}
    >
      {icon && <i className={`ri-${icon} text-base`} />}
      {label}
      {isMenuVisible && (
        <div className="absolute right-0 bottom-0 left-full z-20  ml-2 w-48 rounded-md border border-gray-300 bg-white p-4 py-1 shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
