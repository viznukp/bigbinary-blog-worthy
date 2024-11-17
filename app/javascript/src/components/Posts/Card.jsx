import React from "react";

import { Typography, Tag } from "@bigbinary/neetoui";
import classnames from "classnames";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import votesApi from "apis/votes";
import { dateFromTimeStamp, timeFromTimeStamp } from "utils/dateTime";

const Card = ({ post, reloadPosts }) => {
  const {
    title,
    slug,
    categories = [],
    description,
    author,
    isBlogWorthy,
    upvotes,
    downvotes,
    voteType,
    updatedAt,
  } = post;
  const history = useHistory();

  const updateVote = async voteType => {
    const payload = { voteType, slug };

    try {
      await votesApi.create(payload);
      reloadPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const abbreviatedVoteRepresentation = votes => {
    if (votes >= 1_000_000) {
      return `${(votes / 1_000_000).toFixed(1)}M`;
    }

    if (votes >= 1_000) {
      return `${(votes / 1_000).toFixed(1)}k`;
    }

    return votes.toString();
  };

  return (
    <div className="border-b-2 pt-3 pb-2">
      <div className="flex justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Typography
              className="cursor-pointer text-lg font-bold hover:text-blue-500"
              textTransform="capitalize"
              onClick={() => history.push(`/posts/${slug}/show`)}
            >
              {title}
            </Typography>
            {isBlogWorthy && <Tag label="BlogIt" />}
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
            {author?.name}
          </Typography>
          <Typography className="inline-block pr-2 text-xs  text-gray-400">
            {`${dateFromTimeStamp(updatedAt)},
              ${timeFromTimeStamp(updatedAt)} `}
          </Typography>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className={classnames(
              " flex items-center justify-center rounded-md bg-gray-300  p-1 font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-400",
              { "bg-green-400": voteType === "upvote" }
            )}
            onClick={() => updateVote("upvote")}
          >
            <i className="ri-arrow-up-s-fill" />
          </button>
          <span> {abbreviatedVoteRepresentation(upvotes)}</span>
          <button
            className={classnames(
              " flex items-center justify-center rounded-md bg-gray-300  p-1 font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-400",
              { "bg-red-400": voteType === "downvote" }
            )}
            onClick={() => updateVote("downvote")}
          >
            <i className="ri-arrow-down-s-fill" />
          </button>
          <span>{abbreviatedVoteRepresentation(downvotes)}</span>
        </div>
      </div>
      <p
        className="mt-3 overflow-hidden text-ellipsis whitespace-normal text-sm text-gray-600"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default Card;
