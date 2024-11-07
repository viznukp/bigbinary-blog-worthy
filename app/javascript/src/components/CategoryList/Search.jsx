import React, { useState, useEffect, useRef } from "react";

import { Input } from "@bigbinary/neetoui";

const Search = ({ categories, setSelectedCategories }) => {
  const [searchCategory, setSearchCategory] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const inputRef = useRef();

  const findMatchingStrings = (categories, substring) =>
    categories.filter(category =>
      category.name.toLowerCase().includes(substring.toLowerCase())
    );

  const highlightMatchingSubstring = (string, substring) => {
    const regex = new RegExp(`(${substring})`, "gi");
    const parts = string.split(regex);

    return parts.reduce((highlightedString, part, index) => {
      highlightedString.push(
        part.toLowerCase() === substring.toLowerCase() ? (
          <span className="text-blue-400" key={index}>
            {part}
          </span>
        ) : (
          part
        )
      );

      return highlightedString;
    }, []);
  };

  const handleClick = match => {
    setSelectedCategories(match);
    setIsDropDownOpen(false);
  };

  useEffect(() => {
    setMatches(
      categories?.length ? findMatchingStrings(categories, searchCategory) : []
    );
    setIsDropDownOpen(!!searchCategory);
    inputRef.current?.focus();
  }, [searchCategory]);

  return (
    <>
      <Input
        placeholder="Category name"
        ref={inputRef}
        type="text"
        onChange={event => setSearchCategory(event.target.value)}
      />
      <div className="relative">
        {isDropDownOpen && (
          <div className="absolute top-3 h-64 w-full overflow-auto rounded-md bg-white shadow-lg">
            {matches.map(match => (
              <div
                className="cursor-pointer p-3 hover:bg-gray-300"
                key={match.id}
                onClick={() => handleClick(match.name)}
              >
                {highlightMatchingSubstring(match.name, searchCategory)}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
