import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Book from "/assets/Book.png";
import data from "../data.json";

const ProductPage = () => {
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    // Assuming you want the first subcategory for demonstration
    const category = data.find((item) => item.categoryName === "Stationery");
    if (category && category.subcategories.length > 0) {
      setSubCategory(category.subcategories[0]); // Fetch the first subcategory as an example
    }
  }, []);

  if (!subCategory) {
    return <div>Loading...</div>; // Display loading state while data is being fetched
  }

  return (
    <>
      <div className="product-page-container">
        <div className="single-product-image">
          <img src={Book} alt="Product" className="image-placeholder" />
        </div>
        <div className="product-details">
          <h1 className="product-title">Employee Joining Kit</h1>
          <p className="product-description">
            From Boardrooms to Brunches, Your Go-To for Every Occasion: Jack and
            Jones Polo T-shirts
          </p>
          <ul className="product-features">
            <li>Material: 100% Cotton for all-day comfort.</li>
            <li>
              Customization: Print on the pocket (3x3 or 4x4 inches) and back
              (up to A4 size) with high-quality digital prints.
            </li>
            <li>Fit: Half sleeves; available in sizes S, M, L, XL, XXL.</li>
            <li>Colors: Classic Black and White.</li>
            <li>MOQ: Order starting from 1 T-shirt.</li>
          </ul>
          <p className="product-additional-info">
            Ideal for corporate events, team outings, or everyday wear, these
            polos combine comfort and style, effortlessly boosting your brand.
          </p>
          <Link to="/#contact">
            {" "}
            {/* Use Link to navigate to the contact section */}
            <button className="get-quote-btn">Get a Quote</button>
          </Link>
        </div>
      </div>

      <div className="bgbox">
        <div className="categories-sec">
          <h1 className="categories-sec-heading">Similar Products</h1>
          <div className="topproducts">
            {[
              subCategory.subCategoryImg1,
              subCategory.subCategoryImg2,
              subCategory.subCategoryImg3,
              subCategory.subCategoryImg4,
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${subCategory.subCategoryName} ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
