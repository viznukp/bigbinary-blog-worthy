import React, { useState, useEffect } from "react";

import { Select } from "@bigbinary/neetoui/formik";

import categoriesApi from "apis/categories";

const CategorySelector = ({ required = false }) => {
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
    <Select
      isMulti
      isSearchable
      label="Category"
      name="categories"
      optionRemapping={{ label: "name", value: "id" }}
      options={categories}
      placeholder="Select one or more category"
      required={required}
    />
  );
};

export default CategorySelector;
