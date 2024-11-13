import React, { useState, useRef } from "react";

import { Button } from "@bigbinary/neetoui";
import { pluck } from "ramda";
import { useHistory } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";
import { POST_STATUSES } from "components/constants";

import Form from "./Form";
import SaveActionList from "./SaveActionList";

const Create = () => {
  const [saveType, setSaveType] = useState(POST_STATUSES.DRAFT.STATUS);
  const formRef = useRef();
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      await postsApi.create({
        ...values,
        status: saveType,
        categoryIds: pluck("id", values.categories),
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <PageTitle title="New blog post">
        <Button
          label="Cancel"
          style="secondary"
          onClick={() => history.push("/")}
        />
        <SaveActionList
          saveAction={() => formRef.current.handleSubmit()}
          saveType={saveType}
          setSaveType={setSaveType}
        />
      </PageTitle>
      <Form formRef={formRef} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Create;
