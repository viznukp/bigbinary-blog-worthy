import React, { useState, useEffect } from "react";

import {
  Form as NeetoUIForm,
  Input,
  Textarea,
  Select,
} from "@bigbinary/neetoui/formik";

import categoriesApi from "apis/categories";

const Edit = ({ handleSubmit, post = {}, formRef }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { categories } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
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
      <Select
        required
        isMulti
        isSearchable
        label="Category"
        name="categories"
        optionRemapping={{ label: "name", value: "id" }}
        options={categories}
        placeholder="Select one or more category"
      />
      <Textarea
        required
        label="Description"
        name="description"
        placeholder="Description of the post"
        size="large"
      />
    </NeetoUIForm>
  );
};

export default Edit;
