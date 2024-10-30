import React, { useState, useEffect } from "react";

import { Typography, Input } from "@bigbinary/neetoui";
import classnames from "classnames";

import categoriesApi from "apis/categories";

import CategoryItem from "./CategoryItem";

const CategoryList = ({ show = false, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);

  const handleSelection = value => {
    setSelectedCategories(value);
  };

  const fetchCategories = async () => {
    try {
      const { categories: availableCategories } = await categoriesApi.fetch();
      setCategories(availableCategories);
    } catch (error) {
      logger.error = error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      className={classnames(
        "overflow-hidden bg-blue-50 transition-all duration-500 ease-in-out",
        {
          "w-0 px-0 opacity-0": !show,
          "w-72 px-3 opacity-100": show,
        }
      )}
    >
      <div className="flex items-center justify-between pt-8 pb-4">
        <Typography
          className="font-semibold"
          style="h3"
          textTransform="capitalize"
        >
          Categories
        </Typography>
        <button className="h-4 w-4 rounded-full hover:bg-gray-300">
          <i className="ri-search-line" />
        </button>
        <button
          className="h-4 w-4 rounded-full hover:bg-gray-300"
          onClick={() => setIsCreateEnabled(!isCreateEnabled)}
        >
          {!isCreateEnabled && <i className="ri-add-line" />}
          {isCreateEnabled && <i className="ri-close-line" />}
        </button>
      </div>
      {isCreateEnabled && <Input placeholder="Category Name" type="text" />}
      <form>
        <ul>
          {categories.map(category => (
            <CategoryItem
              handleClick={handleSelection}
              key={category.id}
              name={category.name}
              value={category.name}
            />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default CategoryList;
