import React, { useState, useEffect } from "react";

import { Button } from "@bigbinary/neetoui";
import {
  Form as NeetoUIForm,
  Input,
  Textarea,
} from "@bigbinary/neetoui/formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import { PageLoader } from "components/commons";

const Edit = ({ handleSubmit, fetchFirst, slug }) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    if (fetchFirst) fetchPost();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <NeetoUIForm
      className="flex flex-col gap-4"
      formikProps={{
        initialValues: {
          title: post.title || "",
          description: post.description || "",
        },
        onSubmit: handleSubmit,
      }}
    >
      <Input
        required
        label="Title"
        name="title"
        placeholder="Title of the post"
        size="medium"
      />
      <Textarea
        required
        label="Description"
        name="description"
        placeholder="Description of the post"
        size="large"
      />
      <div className="flex justify-end gap-2">
        <Button
          label="Cancel"
          style="secondary"
          onClick={() => history.push("/")}
        />
        <Button
          className="bg-black text-white transition-all duration-300 ease-in-out hover:bg-gray-600"
          label="Submit"
          type="submit"
        />
      </div>
    </NeetoUIForm>
  );
};

export default Edit;
