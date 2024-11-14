import React, { useState, useEffect } from "react";

import { pluck } from "ramda";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";

import Form from "./Form";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { post: postDetails } = await postsApi.show(slug);
      setPost(postDetails);
      setIsLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      await postsApi.update({
        slug,
        payload: {
          ...values,
          categoryIds: pluck("id", values.categories),
        },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
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
      <PageTitle title="Edit post" />
      <Form handleSubmit={handleSubmit} post={post} slug={slug} />
    </Container>
  );
};

export default Edit;
