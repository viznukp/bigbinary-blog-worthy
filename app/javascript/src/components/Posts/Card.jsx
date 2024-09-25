import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import postsApi from "apis/posts";

import Show from "./Show";

const Card = ({ data, reloadPosts }) => {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const { upvotes, downvotes } = data;
  const netVoteCount = upvotes - downvotes;

  const updateVote = async voteType => {
    const payload =
      voteType === "upvote"
        ? { upvotes: upvotes + 1 }
        : { downvotes: downvotes + 1 };

    try {
      await postsApi.update({
        slug: data.slug,
        payload,
      });
      reloadPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-4 rounded-md border bg-blue-50 p-2">
        <div className="min-w-0 flex-1">
          <div className="flex gap-3">
            <Typography
              className="cursor-pointer text-blue-600 hover:text-blue-500"
              style="h3"
              weight="medium"
              onClick={() => {
                setIsPostClicked(true);
              }}
            >
              {data.title}
            </Typography>
            {data.is_blog_worthy && (
              <p className="m-0 h-5 rounded-full border border-green-500 bg-green-200 px-2 text-xs font-semibold leading-5 text-green-700">
                blog-worthy
              </p>
            )}
          </div>
          <Typography className="mt-2 border-b" style="h5" weight="medium">
            {data.author.name}
          </Typography>
          <Typography className="mt-4 truncate" style="body2" weight="normal">
            {data.description}
          </Typography>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 px-4">
          <button
            className="rounded bg-gray-200 p-1 hover:bg-gray-300"
            onClick={() => updateVote("upvote")}
          >
            <i className="ri-arrow-up-s-line" />
          </button>
          <Typography className="text-center font-semibold">{netVoteCount}</Typography>
          <button
            className="rounded bg-gray-200 p-1 hover:bg-gray-300"
            onClick={() => updateVote("downvote")}
          >
            <i className="ri-arrow-down-s-line" />
          </button>
        </div>
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
