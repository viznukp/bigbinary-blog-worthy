import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { Popover } from "components/commons";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import BlogWorthyLogo from "./BlogWorthyLogo";
import SideBarNavItem from "./SideBarNavItem";

const SideBar = () => {
  const userName = getFromLocalStorage("authUserName");

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
    <div className="flex w-16 flex-col items-center justify-between space-y-4 border-r border-gray-300 px-10 pb-4">
      <div className="flex flex-col items-center gap-3">
        <BlogWorthyLogo className="mt-4" height={64} width={64} />
        <SideBarNavItem className="mt-6" icon="dashboard-line" label="Posts" />
      </div>
      <Popover
        className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-gray-200 transition-all duration-300 hover:bg-gray-300"
        icon="user-fill"
      >
        <Typography className="border-b">{userName}</Typography>
        <Button
          fullWidth
          label="Logout"
          style="danger-text"
          onClick={handleLogout}
        />
      </Popover>
    </div>
  );
};

export default SideBar;
