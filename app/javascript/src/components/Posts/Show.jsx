import React, { useEffect, useState } from "react";

import { capitalize } from "@bigbinary/neeto-cist";
import { Edit } from "@bigbinary/neeto-icons";
import { Typography, Button, Tag, Tooltip } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { dateFromTimeStamp } from "utils/dateTime";

import { POST_STATUSES } from "./constants";

const Show = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { slug } = useParams();

  const fetchPost = async () => {
    try {
      const { post: postDetails } = await postsApi.show(slug);
      setPost(postDetails);
      setIsLoading(false);
    } catch (error) {
      logger.error = error;
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="mt-12 flex justify-between gap-4">
        <div className="flex items-center gap-3">
          <Typography style="h1" textTransform="capitalize" weight="extrabold">
            {post.title}
          </Typography>
          <Tag
            disabled
            className="h-5"
            label={capitalize(post.status)}
            style={
              post.status === POST_STATUSES.PUBLISHED.STATUS
                ? "primary"
                : "danger"
            }
          />
        </div>
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
      </div>
      <div className="flex gap-2 py-2">
        {post.categories?.map(({ id, name }) => (
          <Tag key={id} label={name} type="solid" />
        ))}
      </div>
      <Typography
        className="mr-2 inline-block border-r-2 pr-2 text-xs text-gray-500"
        textTransform="capitalize"
      >
        {post.author.name}
      </Typography>
      <Typography className="inline-block pr-2 text-xs  text-gray-400">
        {dateFromTimeStamp(post.updatedAt)}
      </Typography>
      <Typography className="mt-3">{post.description}</Typography>
    </Container>
  );
};

export default Show;
