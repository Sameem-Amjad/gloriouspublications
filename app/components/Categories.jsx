"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Categories = ({
  selectedCategories,
  setSelectedCategories,
  sortOption,
  setSortOption,
  filterFormat,
  setFilterFormat,
}) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Coming Soon",
    "New Arrival",
    "Children and Youth",
    "Sacred Writings",
    "Devotions",
    "History",
    "Introductory Books",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleFormatChange = (e) => {
    const { name, checked } = e.target;
    setFilterFormat((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleClick = () => {
    setIsRotated(!isRotated);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center py-4 relative">
      <div className="flex justify-center w-full">
        <IoFilter
          onClick={handleClick}
          className={`text-3xl text-gray-800 transform transition-transform duration-500 ${
            isRotated ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`absolute rounded-3xl mt-8  text-white top-0  left-1/2 -translate-x-1/2 ${
          isMenuOpen
            ? "translate-y-10 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } border-t sm:w-full w-[80%] bg-gray-800 p-4 transform transition-all duration-300 z-10`}
      >
        {isMenuOpen && (
          <div
            className={`flex flex-col sm:flex-row  items-center justify-around gap-4`}
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:w-[50%] w-full items-center">
              <label htmlFor="sort-options" className="mr-2">
                Sort By
              </label>
              <select
                id="sort-options"
                name="sort-options"
                className="py-2  bg-gray-800 border-2 sm:w-[60%] w-[70%] rounded-lg cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option className="sm:text-[16px] text-[12px]" value="title">Title</option>
                <option className="sm:text-[16px] text-[12px]"  value="category">Category</option>
                <option className="sm:text-[16px] text-[12px]" value="newest">Newest</option>
                <option className="sm:text-[16px] text-[12px]" value="oldest">Oldest</option>
                <option className="sm:text-[16px] text-[12px]" value="price-low-to-high">Price Low to High</option>
                <option className="sm:text-[16px] text-[12px]" value="price-high-to-low">Price High to Low</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 px-[2%]">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="ebook"
                  className="mr-2"
                  checked={filterFormat.ebook}
                  onChange={handleFormatChange}
                />
                E-book
              </label>
              <label className="flex items-center mt-2 sm:mt-0">
                <input
                  type="checkbox"
                  name="hardCopy"
                  className="mr-2"
                  checked={filterFormat.hardCopy}
                  onChange={handleFormatChange}
                />
                Hard Copy
              </label>
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex flex-wrap w-full max-w-4xl py-6 justify-center items-center gap-4 sm:gap-[2%] ${
          isRotated ? "mt-24" : ""
        }`}
      >
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`text-blue-500 mt-2 font-semibold border border-blue-700 rounded-md px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
              selectedCategories.includes(category)
                ? "bg-gray-800 text-white border-none"
                : "bg-white"
            } transition-colors duration-300`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
