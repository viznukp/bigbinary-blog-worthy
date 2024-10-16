import React from "react";

import { useHistory } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Create = () => {
  const history = useHistory();

  const handleSubmit = async payload => {
    try {
      await postsApi.create(payload);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <PageTitle title="Create new post" />
      <Form handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Create;
