import React from "react";

const BlogWorthyIndicator = ({ show }) =>
  show && (
    <p className="m-0 h-5 rounded-full border border-green-500 bg-green-200 px-2 text-xs font-semibold leading-5 text-green-700">
      blog-worthy
    </p>
  );

export default BlogWorthyIndicator;
