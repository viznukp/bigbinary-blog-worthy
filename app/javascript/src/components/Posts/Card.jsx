import React from "react";

import { Typography, Tag } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import votesApi from "apis/votes";
import { dateFromTimeStamp } from "utils/dateTime";

import BlogWorthyIndicator from "./BlogWorthyIndicator";

const Card = ({ data }) => {
  const { upvotes: upVotes, downvotes: downVotes } = data;
  const history = useHistory();

  const updateVote = async voteType => {
    const payload = { vote_type: voteType, slug: data.slug };

    try {
      await votesApi.create(payload);
      history.go(0);
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
              onClick={() => history.push(`/posts/${data.slug}/show`)}
            >
              {data.title}
            </Typography>
            <BlogWorthyIndicator show={data.is_blog_worthy} />
          </div>
          <div className="flex gap-2 py-2">
            {data.categories?.map(({ id, name }) => (
              <Tag key={id} label={name} />
            ))}
          </div>
          <Typography className="mr-2 inline-block border-r-2 pr-2 text-xs text-gray-500">
            {data.author.name}
          </Typography>
          <Typography className="inline-block pr-2 text-xs  text-gray-400">
            {dateFromTimeStamp(data.updatedAt)}
          </Typography>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className=" flex items-center justify-center rounded-md bg-green-400 p-1 font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-500"
            onClick={() => updateVote("upvote")}
          >
            <i className="ri-arrow-up-s-fill" />
          </button>
          <span> {abbreviatedVoteRepresentation(upVotes)}</span>
          <button
            className=" flex items-center justify-center rounded-md bg-red-400 p-1 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-500"
            onClick={() => updateVote("downvote")}
          >
            <i className="ri-arrow-down-s-fill" />
          </button>
          <span>{abbreviatedVoteRepresentation(downVotes)}</span>
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
        {data.description}
      </p>
    </div>
  );
};

export default Card;
