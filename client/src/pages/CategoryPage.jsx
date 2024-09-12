import React, { useEffect, useState } from "react";
import categoriesData from "../data.json";
const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetching the JSON data
    // If it's a local import, you can use it directly; otherwise, fetch if it's external.
    setCategories(categoriesData);
  }, []);

  return (
    <>
      {categories.map((category, index) => (
        <div key={index} className="bgbox">
          <picture>
            <source
              srcSet={category.RescatHeroImg}
              media="(max-width: 768px)"
            />
            <img
              src={category.catHeroImg}
              alt="Category Hero"
              className="hero-image"
            />
          </picture>

          {category.subcategories.map((subCategory, subIndex) => (
            <div key={subIndex} className="categories-sec">
              <h1 className="categories-sec-heading">
                {subCategory.subCategoryName}
              </h1>
              <div className="topproducts">
                <img
                  src={subCategory.subCategoryImg1}
                  alt={`${subCategory.subCategoryName} 1`}
                  className="product-image"
                />
                <img
                  src={subCategory.subCategoryImg2}
                  alt={`${subCategory.subCategoryName} 2`}
                  className="product-image"
                />
                <img
                  src={subCategory.subCategoryImg3}
                  alt={`${subCategory.subCategoryName} 3`}
                  className="product-image"
                />
                <img
                  src={subCategory.subCategoryImg4}
                  alt={`${subCategory.subCategoryName} 4`}
                  className="product-image"
                />
              </div>
              <button className="view-all-btn">View All</button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default CategoryPage;
