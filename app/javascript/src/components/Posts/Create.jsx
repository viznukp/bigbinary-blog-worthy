import React from "react";

import { pluck } from "ramda";
import { useHistory } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Create = () => {
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      await postsApi.create({
        ...values,
        categoryIds: pluck("id", values.categories),
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <PageTitle title="New blog post" />
      <Form handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Create;
