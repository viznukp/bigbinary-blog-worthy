import React from "react";

const PageTitle = ({ title, children }) => (
  <div className="flex w-full items-center justify-between bg-white py-8">
    <h2 className="text-3xl font-semibold ">{title}</h2>
    <div className="flex gap-1">{children}</div>
  </div>
);

export default PageTitle;
