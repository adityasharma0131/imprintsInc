import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useParams } from "react-router-dom"; // Import useParams to get productId from the URL

const ProductPage = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null); // State to store the fetched product data
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${productId}` // Fetch product by ID from backend
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data); // Set the product state
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct(); // Call the fetch function
  }, [productId]); // Depend on productId

  // Function to parse HTML list items into an array
  const parseHtmlList = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Set the inner HTML
    const listItems = tempDiv.querySelectorAll("li"); // Select all <li> elements
    return Array.from(listItems).map((li) => {
      // Return only the text content of each <li> without any HTML tags
      return li.textContent || li.innerText;
    });
  };

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Set the inner HTML
    return tempDiv.textContent || tempDiv.innerText; // Return only the text content
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!product) {
    return <div>Product not found.</div>; // Handle case where product is not found
  }

  // Parse features from the stored HTML
  const featuresArray = parseHtmlList(product.features);
  // Strip HTML tags from the product description
  const strippedDescription = stripHtmlTags(product.description);

  return (
    <>
      <div className="product-page-container">
        <div className="single-product-image">
          <img
            src={`${import.meta.env.VITE_API_URL}/${
              Array.isArray(product.images) &&
              product.images[0].replace(/\\/g, "/")
            }`} // Display first image or placeholder
            alt={product.name}
            className="image-placeholder"
          />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{strippedDescription}</p>{" "}
          {/* Display stripped description */}
          <ul className="product-features">
            {featuresArray.map((feature, index) => (
              <li key={index}>
                {feature} {/* Only the text content will be shown */}
              </li>
            ))}
          </ul>
          <Link smooth to="/#contact">
            <button className="get-quote-btn">Get a Quote</button>
          </Link>
        </div>
      </div>

      {/* Uncomment if you want to show similar products section */}
      {/* <div className="bgbox">
        <div className="categories-sec">
          <h1 className="categories-sec-heading">Similar Products</h1>
          <div className="top-products">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img} // Assuming similar products are within the same images array
                alt={`${product.name} ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProductPage;
