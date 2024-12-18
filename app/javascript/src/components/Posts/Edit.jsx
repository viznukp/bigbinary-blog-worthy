import React, { useState, useEffect, useRef } from "react";

import { MenuHorizontal, ExternalLink, Close } from "@bigbinary/neeto-icons";
import { Button, Tooltip, Typography } from "@bigbinary/neetoui";
import { pluck } from "ramda";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import {
  Container,
  PageTitle,
  PageLoader,
  PostDisplay,
} from "components/commons";
import { POST_STATUSES } from "components/constants";

import Form from "./Form";
import SaveActionList from "./SaveActionList";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});
  const formRef = useRef();
  const [saveType, setSaveType] = useState(POST_STATUSES.DRAFT.STATUS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const [previewData, setPreviewData] = useState({});

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

  const deletePost = async () => {
    try {
      await postsApi.destroy(slug);
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
        <Tooltip content="Preview">
          <Button
            icon={ExternalLink}
            style="text"
            onClick={() => {
              setPreviewData({
                ...formRef.current.values,
                updatedAt: new Date().toLocaleString(),
              });
              setIsPreviewEnabled(true);
            }}
          />
        </Tooltip>
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
        <div className="relative">
          <Button
            icon={MenuHorizontal}
            style="text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white  shadow-xl">
              <Button
                fullWidth
                label="Delete"
                style="danger-text"
                onClick={deletePost}
              />
            </div>
          )}
        </div>
      </PageTitle>
      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        post={post}
        slug={slug}
      />
      {isPreviewEnabled && (
        <div className="mt-6 rounded-md border p-4">
          <div className="flex gap-3">
            <Typography>Preview</Typography>
            <Button
              icon={Close}
              style="danger-text"
              onClick={() => setIsPreviewEnabled(false)}
            />
          </div>
          <PostDisplay {...previewData} />
        </div>
      )}
    </Container>
  );
};

export default Edit;
