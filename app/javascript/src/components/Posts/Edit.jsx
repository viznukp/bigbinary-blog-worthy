import React, { useState, useEffect, useRef } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Button, ActionDropdown } from "@bigbinary/neetoui";
import { pluck } from "ramda";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { Container, PageTitle, PageLoader } from "components/commons";

import { POST_STATUSES } from "./constants";
import Form from "./Form";

const Edit = () => {
  const {
    DRAFT: { STATUS: STATUS_DRAFT, BUTTON_LABEL: DRAFT_BUTTON_LABEL },
    PUBLISHED: { STATUS: STATUS_PUBLISHED, BUTTON_LABEL: PUBLISH_BUTTON_LABEL },
  } = POST_STATUSES;
  const { slug } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});
  const formRef = useRef();
  const [saveType, setSaveType] = useState(STATUS_DRAFT);

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
          status: saveType,
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
      <PageTitle title="Edit blog post">
        <Button
          label="Cancel"
          style="secondary"
          onClick={() => history.push("/")}
        />
        <ActionDropdown
          buttonProps={{
            className: "neetix-button--primary",
          }}
          dropdownProps={{
            buttonProps: {
              className: "neetix-button--primary",
            },
          }}
          label={
            saveType === STATUS_DRAFT
              ? DRAFT_BUTTON_LABEL
              : PUBLISH_BUTTON_LABEL
          }
          onClick={() => formRef.current.handleSubmit()}
        >
          <div className="flex flex-col">
            <Button
              fullWidth
              className="justify-end"
              icon={saveType === STATUS_PUBLISHED && Check}
              iconPosition="left"
              label={PUBLISH_BUTTON_LABEL}
              style="text"
              onClick={() => setSaveType(STATUS_PUBLISHED)}
            />
            <Button
              fullWidth
              className="justify-end"
              icon={saveType === STATUS_DRAFT && Check}
              iconPosition="left"
              label={DRAFT_BUTTON_LABEL}
              style="text"
              onClick={() => setSaveType(STATUS_DRAFT)}
            />
          </div>
        </ActionDropdown>
      </PageTitle>
      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        post={post}
        slug={slug}
      />
    </Container>
  );
};

export default Edit;
