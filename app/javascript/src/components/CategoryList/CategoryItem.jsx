import React from "react";

import { Checkbox } from "@bigbinary/neetoui";

const CategoryItem = ({ id, name, isChecked, handleClick }) => (
  <li className="flex border bg-gray-300 p-2">
    <Checkbox
      checked={isChecked}
      className="mr-2 rounded"
      id={id}
      label={name}
      value={name}
      onChange={handleClick}
    />
  </li>
);

export default CategoryItem;
