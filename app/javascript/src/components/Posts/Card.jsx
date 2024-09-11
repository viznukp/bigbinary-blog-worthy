import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import Show from "./Show";

const Card = ({ data }) => {
  const [isPostClicked, setIsPostClicked] = useState(false);

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-md border bg-blue-50 px-4 py-4"
        onClick={() => {
          setIsPostClicked(true);
        }}
      >
        <Typography className="text-blue-600" style="h3" weight="medium">
          {data.title}
        </Typography>
        <Typography className="mt-2 border-b" style="h5" weight="medium">
          {data.author.name}
        </Typography>
        <Typography className="mt-4 truncate" style="h4" weight="normal">
          {data.description}
        </Typography>
      </div>
      {isPostClicked && (
        <Show
          data={data}
          isPostClicked={isPostClicked}
          setIsPostClicked={setIsPostClicked}
        />
      )}
    </>
  );
};

export default React.memo(Card);
