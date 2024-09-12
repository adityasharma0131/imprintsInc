import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesData from "../data.json"; // Assuming data.json is within the src or public directory

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Set the categories from the imported JSON data
    setCategories(categoriesData);
  }, []);

  // Handler to navigate to the single category page
  const handleViewAll = (categoryName) => {
    navigate(`/category/${categoryName}`); // Navigate with the category name
  };

  return (
    <>
      {categories.map((category, index) => (
        <div key={index} className="bgbox">
          <picture>
            {/* Responsive image for smaller screens */}
            <source
              srcSet={category.RescatHeroImg} // Adjust the key if the field name is different
              media="(max-width: 768px)"
            />
            <img
              src={category.catHeroImg}
              alt={`${category.categoryName} Hero`}
              className="hero-image"
            />
          </picture>

          {category.subcategories.map((subCategory, subIndex) => (
            <div key={subIndex} className="categories-sec">
              <h1 className="categories-sec-heading">
                {subCategory.subCategoryName}
              </h1>
              <div className="topproducts">
                {/* Dynamically rendering sub-category images */}
                {[
                  subCategory.subCategoryImg1,
                  subCategory.subCategoryImg2,
                  subCategory.subCategoryImg3,
                  subCategory.subCategoryImg4,
                ].map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`${subCategory.subCategoryName} ${imgIndex + 1}`}
                    className="product-image"
                  />
                ))}
              </div>
              <button
                className="view-all-btn"
                onClick={() => handleViewAll(subCategory.subCategoryName)}
              >
                View All
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default CategoryPage;
