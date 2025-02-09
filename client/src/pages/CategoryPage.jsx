import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryPage = () => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { catId } = useParams(); // Extract category ID from URL params

  useEffect(() => {
    // Fetch category data based on category ID from URL
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/category/${catId}` // Use catId here
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    // Fetch products for the category
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?category=${catId}` // Adjust the endpoint as needed
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategory();
    fetchProducts();
    setLoading(false); // Set loading to false after fetching both data
  }, [catId]);

  // Handler to navigate to the single subcategory page
  const handleViewAll = (subCategoryName) => {
    navigate(`/category/${category.name}/${subCategoryName}`); // Pass the category name too
  };

  if (loading) {
    return <p>Loading category...</p>;
  }

  if (!category) {
    return <p>Category not found.</p>; // Handle case where category is not found
  }

  return (
    <div className="bgbox">
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

      {category.subcategories.map((subCategory, subIndex) => (
        <div key={subIndex} className="categories-sec">
          <h1 className="categories-sec-heading">{subCategory}</h1>
          <div className="top-products">
            {/* Filter products by subcategory and limit to top 4 */}
            {products
              .filter((product) => product.subcategory === subCategory)
              .slice(0, 4) // Get only the top 4 products
              .map((product, prodIndex) => (
                <Link
                  to={`/products/${product._id}`} // Link to the product page using product ID
                  key={prodIndex}
                  className="best-selling-products__card"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${
                      Array.isArray(product.images) &&
                      product.images[0].replace(/\\/g, "/")
                    }`}
                    alt={product.name}
                    className="best-selling-products__image"
                  />
                  <p className="best-selling-products__name">{product.name}</p>
                </Link>
              ))}
          </div>
          <button
            className="view-all-btn"
            onClick={() => handleViewAll(subCategory)} // Pass the subcategory to the handler
          >
            View All
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
