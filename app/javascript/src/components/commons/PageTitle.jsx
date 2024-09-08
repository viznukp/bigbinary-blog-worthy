import React from "react";

import Button from "./Button";

const PageTitle = ({ title }) => (
  <div className="mt-8 flex w-full items-center justify-between">
    <h2 className="text-3xl font-semibold ">{title}</h2>
    <Button buttonText="Create new post" />
  </div>
);

export default PageTitle;
