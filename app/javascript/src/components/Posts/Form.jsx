import React from "react";

import {
  Form as NeetoUIForm,
  Input,
  Textarea,
} from "@bigbinary/neetoui/formik";

import { CategorySelector } from "components/commons";

const Edit = ({ handleSubmit, post = {}, formRef }) => (
  <NeetoUIForm
    className="flex flex-col gap-4"
    formikProps={{
      initialValues: {
        title: post?.title || "",
        description: post?.description || "",
        categories: post?.categories,
      },
      onSubmit: handleSubmit,
      innerRef: formRef,
    }}
  >
    <Input
      required
      label="Title"
      name="title"
      placeholder="Title of the post"
      size="medium"
    />
    <CategorySelector required />
    <Textarea
      required
      label="Description"
      name="description"
      placeholder="Description of the post"
      size="large"
    />
  </NeetoUIForm>
);

export default Edit;
