import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ title, description }) => (
  <div className="w-full rounded-md border bg-blue-50 px-4 py-4">
    <Typography className="border-b" style="h3" weight="medium">
      {title}
    </Typography>
    <Typography className="mt-4 truncate" style="h4" weight="normal">
      {description}
    </Typography>
  </div>
);

export default Card;
