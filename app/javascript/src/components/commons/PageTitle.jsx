import React from "react";

import { Button } from "@bigbinary/neetoui";

const PageTitle = ({ title }) => (
  <div className="mt-8 flex w-full items-center justify-between">
    <h2 className="text-3xl font-semibold ">{title}</h2>
    <Button
      className="bg-indigo-600 hover:bg-indigo-700"
      label="Create new post"
    />
  </div>
);

export default PageTitle;
