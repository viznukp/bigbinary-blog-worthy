import React from "react";

import { Link } from "react-router-dom/cjs/react-router-dom";

const TitleToLink = ({ title, slug }) => (
  <Link
    className="block w-full truncate text-green-700 "
    to={`/posts/${slug}/show`}
  >
    {title}
  </Link>
);

export default TitleToLink;
