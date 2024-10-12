import React from "react";

import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();

  const handleSubmit = async payload => {
    try {
      await postsApi.update({ slug, payload });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <PageTitle title="Edit post" />
      <Form fetchFirst handleSubmit={handleSubmit} slug={slug} />
    </Container>
  );
};

export default Edit;
