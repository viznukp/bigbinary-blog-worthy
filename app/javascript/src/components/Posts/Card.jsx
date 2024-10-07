import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import votesApi from "apis/votes";

import BlogWorthyIndicator from "./BlogWorthyIndicator";
import Show from "./Show";

const Card = ({ data, reloadPosts }) => {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const { upvotes: upVotes, downvotes: downVotes } = data;

  const updateVote = async voteType => {
    const payload = { vote_type: voteType, slug: data.slug };

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
    <>
      <div className="rounded-md border bg-blue-50 p-4 shadow-md">
        <div className="flex justify-between border-b">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Typography
                className="cursor-pointer text-lg font-medium text-blue-600 hover:text-blue-500"
                onClick={() => setIsPostClicked(true)}
              >
                {data.title}
              </Typography>
              <BlogWorthyIndicator show={data.is_blog_worthy} />
            </div>
            <Typography
              className="border-b pb-2 text-xs text-gray-700"
              weight="medium"
            >
              {data.author.name}
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
        <Typography
          className="mt-3 truncate text-sm text-gray-600"
          weight="normal"
        >
          {data.description}
        </Typography>
      </div>
      {isPostClicked && (
        <Show
          isModalOpen={isPostClicked}
          setIsModalOpen={setIsPostClicked}
          slug={data.slug}
        />
      )}
    </>
  );
};

export default Card;
