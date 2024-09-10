import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ data, handlePostClick, setSelectedPost }) => (
  <div
    className="w-full rounded-md border bg-blue-50 px-4 py-4"
    onClick={() => {
      handlePostClick(true);
      setSelectedPost(data.id);
    }}
  >
    <Typography className="border-b" style="h3" weight="medium">
      {data.title}
    </Typography>
    <Typography className="mt-4 truncate" style="h4" weight="normal">
      {data.description}
    </Typography>
  </div>
);

export default Card;
