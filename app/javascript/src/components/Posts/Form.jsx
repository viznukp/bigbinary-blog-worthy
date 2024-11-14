import React, { useState, useEffect } from "react";

import { Button } from "@bigbinary/neetoui";
import {
  Form as NeetoUIForm,
  Input,
  Textarea,
  Select,
} from "@bigbinary/neetoui/formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import categoriesApi from "apis/categories";

const Edit = ({ handleSubmit, post = {} }) => {
  const history = useHistory();
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
