import React from "react";

const CategoryItem = ({ name, value, handleClick }) => (
  <li className="mt-2 border bg-gray-300 px-2 py-2">
    <input
      className="mr-2 rounded"
      type="checkbox"
      value={value}
      onChange={e => handleClick(e.target.value)}
    />
    {name}
  </li>
);

export default CategoryItem;
