import React, { useRef } from "react";

import { Button, Typography, Avatar, Popover } from "@bigbinary/neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import BlogWorthyLogo from "./BlogWorthyLogo";
import SideBarNavItem from "./SideBarNavItem";

const SideBar = () => {
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");
  const avatarRef = useRef();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex w-16 flex-col items-center space-y-4 border-r border-gray-300 px-10 pb-4">
      <div className="flex flex-1 flex-col items-center gap-2">
        <Link to="/">
          <BlogWorthyLogo className="mt-4" height={64} width={64} />
        </Link>
        <SideBarNavItem
          className="mt-6"
          icon="dashboard-line"
          label="Posts"
          path="/"
        />
        <SideBarNavItem icon="add-line" label="New" path="/posts/new" />
      </div>
      <div>
        <div ref={avatarRef}>
          <Avatar size="large" user={{ name: userName }} />
        </div>
        <Popover reference={avatarRef}>
          <Typography className="">{userName}</Typography>
          <Typography className="border-b" style="body3">
            {userEmail}
          </Typography>
          <Button
            fullWidth
            label="Logout"
            style="danger-text"
            onClick={handleLogout}
          />
        </Popover>
      </div>
    </div>
  );
};

export default SideBar;
