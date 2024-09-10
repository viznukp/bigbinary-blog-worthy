import React from "react";

const PageTitle = ({ title, children }) => (
  <div className="mt-8 flex w-full items-center justify-between">
    <h2 className="text-3xl font-semibold ">{title}</h2>
    {children}
  </div>
);

export default PageTitle;
