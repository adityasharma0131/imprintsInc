import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleCategoryPage = () => {
  const { categoryName, subCat } = useParams(); // Get both category name and subcategory from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null); // State to hold category data

  useEffect(() => {
    // Fetch category data to get backdrop images
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/category/${categoryName}` // Adjust the endpoint as needed
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategory(data); // Set category data
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    // Fetch all products for the given category
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/products?category=${categoryName}` // Fetch products by category
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Filter products based on the subcategory
        const filteredProducts = data.filter(
          (product) => product.subcategory === subCat
        );
        setProducts(filteredProducts); // Set filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategory();
    fetchProducts();
  }, [categoryName, subCat]); // Depend on categoryName and subCat

  if (loading) {
    return <div className="centerd">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="centerd">No products found for this subcategory.</div>
    ); // Update message to reflect subcategory
  }

  return (
    <div className="bgbox">
      {category && (
        <picture>
          {/* Responsive image for smaller screens */}
          <source
            srcSet={`${
              import.meta.env.VITE_API_URL
            }/${category.mobileBackdrop.replace(/\\/g, "/")}`}
            media="(max-width: 768px)"
          />
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/${category.desktopBackdrop.replace(/\\/g, "/")}`}
            alt={`${category.name} Hero`}
            className="hero-image"
          />
        </picture>
      )}
      <div className="categories-sec">
        <h1 className="categories-sec-heading">{subCat}</h1>
        <div className="topproducts">
          {products.map((product, index) => (
            <Link
              to={`/products/${product._id}`} // Link to the product page using product ID
              key={index}
              className="best-selling-products__card"
            >
              <img
                src={`${
                  import.meta.env.VITE_API_URL
                }/${product.images[0].replace(/\\/g, "/")}`} // Adjust image URL if necessary
                alt={product.name}
                className="best-selling-products__image"
              />
              <p className="best-selling-products__name">{product.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
