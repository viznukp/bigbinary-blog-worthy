import React, { useEffect, useState } from "react";

import { Typography, Button, Tag } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";
import { dateFromTimeStamp } from "utils/dateTime";

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
      <PageTitle>
        <Button
          className="bg-black"
          label="Edit Post"
          onClick={() => history.push(`/posts/${slug}/edit`)}
        />
      </PageTitle>
      <Typography style="h1" textTransform="capitalize" weight="extrabold">
        {post.title}
      </Typography>
      <div className="flex gap-2 py-2">
        {post.categories?.map(({ id, name }) => (
          <Tag key={id} label={name} />
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
