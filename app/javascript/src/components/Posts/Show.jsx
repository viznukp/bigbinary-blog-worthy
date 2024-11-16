import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageLoader, PostDisplay } from "components/commons";

const Show = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      <PostDisplay {...post} downloadEnabled editEnabled />
    </Container>
  );
};

export default Show;
