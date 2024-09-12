import React from "react";
import { useParams } from "react-router-dom";
import categoriesData from "../data.json"; // Importing JSON data

const SingleCategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from URL
  const category = categoriesData
    .flatMap((cat) => cat.subcategories)
    .find((subCategory) => subCategory.subCategoryName === categoryName);

  if (!category) {
    return <div className="centerd">Category not found</div>;
  }

  return (
    <div className="bgbox">
      <div className="categories-sec">
        <h1 className="categories-sec-heading">{category.subCategoryName}</h1>
        <div className="topproducts">
          {[
            category.subCategoryImg1,
            category.subCategoryImg2,
            category.subCategoryImg3,
            category.subCategoryImg4,
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${category.subCategoryName} ${index + 1}`}
              className="product-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
