import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import classnames from "classnames";
import { without } from "ramda";

import categoriesApi from "apis/categories";

import CategoryItem from "./CategoryItem";
import Create from "./Create";
import Search from "./Search";

const CategoryList = ({ show = false, setFilterCategories }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [reloadRequired, setReloadRequired] = useState(false);

  const fetchCategories = async () => {
    try {
      const { categories: availableCategories } = await categoriesApi.fetch();
      setCategories(availableCategories);
    } catch (error) {
      logger.error = error;
    }
  };

  const handleActiveCategories = value => {
    setActiveCategories(prevCategories => {
      if (prevCategories.includes(value)) {
        return without([value], prevCategories);
      }

      return [...prevCategories, value];
    });
  };

  useEffect(() => {
    fetchCategories();
  }, [reloadRequired]);

  useEffect(() => {
    setFilterCategories(activeCategories);
  }, [activeCategories]);

  return (
    <>
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
          <div className="flex gap-2">
            <button
              className="flex  items-center rounded-full p-1 hover:bg-gray-300"
              onClick={() => setIsSearchEnabled(!isSearchEnabled)}
            >
              <i className="ri-search-line" />
            </button>
            <button
              className="flex  items-center rounded-full p-1 hover:bg-gray-300"
              onClick={() => setIsCreateEnabled(!isCreateEnabled)}
            >
              <i className="ri-add-line" />
            </button>
          </div>
        </div>
        {isSearchEnabled && (
          <Search
            categories={categories}
            setSelectedCategories={handleActiveCategories}
          />
        )}
        <ul className="mt-2 flex flex-col gap-2 overflow-y-auto">
          {categories.map(category => (
            <CategoryItem
              handleClick={() => handleActiveCategories(category.name)}
              key={category.id}
              {...category}
              isChecked={activeCategories.includes(category.name)}
            />
          ))}
        </ul>
      </div>
      <Create
        disableCreate={() => setIsCreateEnabled(!isCreateEnabled)}
        isCreateEnabled={isCreateEnabled}
        reloadCategories={() => setReloadRequired(true)}
      />
    </>
  );
};

export default CategoryList;
