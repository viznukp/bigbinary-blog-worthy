import React from "react";

import { capitalize } from "@bigbinary/neeto-cist";
import { Edit } from "@bigbinary/neeto-icons";
import { Typography, Button, Tag, Tooltip } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import { POST_STATUSES } from "components/constants";
import { dateFromTimeStamp } from "utils/dateTime";

const PostDisplay = ({
  title,
  description,
  status = "",
  categories = [],
  author = {},
  updatedAt,
  editButtonEnabled = false,
}) => {
  const history = useHistory();
  const { slug } = useParams();

  return (
    <>
      <div className="mt-12 flex justify-between gap-4">
        <div className="flex items-start gap-3">
          <Typography style="h1" textTransform="capitalize" weight="extrabold">
            {title}
          </Typography>
          {status === POST_STATUSES.DRAFT.STATUS && (
            <Tag
              disabled
              className="h-5"
              label={capitalize(status)}
              style="danger"
            />
          )}
        </div>
        {editButtonEnabled && (
          <div className="h-16 w-16">
            <Tooltip content="Edit" position="top">
              <Button
                icon={Edit}
                size="large"
                style="text"
                onClick={() => history.push(`/posts/${slug}/edit`)}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex gap-2 py-2">
        {categories?.map(({ id, name }) => (
          <Tag key={id} label={name} type="solid" />
        ))}
      </div>
      <Typography
        className="mr-2 inline-block border-r-2 pr-2 text-xs text-gray-500"
        textTransform="capitalize"
      >
        {author.name}
      </Typography>
      <Typography className="inline-block pr-2 text-xs  text-gray-400">
        {dateFromTimeStamp(updatedAt)}
      </Typography>
      <Typography className="mt-3">{description}</Typography>
    </>
  );
};

export default PostDisplay;
