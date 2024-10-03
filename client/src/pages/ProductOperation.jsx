import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Table, ActionButtons } from "../components/TableActionB";
import { toast } from "react-hot-toast"; // For success/error notifications

// Fetch live product data from backend API
const ProductOperation = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete a product from the backend and update the state
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
        { method: "DELETE" }
      );

      // Check if the response is OK
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error deleting product");
      }

      // Remove the product from the state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  // Strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Define headers for products
  const productHeaders = [
    "Product Name",
    "Category",
    "Sub Category",
    "Image",
    "Small Description",
    "Operation",
  ];

  // Render a row for each product
  const renderProductRow = (product) => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.subcategory}</td>
      <td>
        <img
          src={`${import.meta.env.VITE_API_URL}/${
            Array.isArray(product.images) &&
            product.images[0].replace(/\\/g, "/")
          }`}
          alt={product.name}
          className="product-image"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
      </td>
      <td>{stripHtmlTags(product.description)}</td>
      <td>
        <ActionButtons
          editLink={`/product-operation/edit-product/${product._id}`}
          showEdit={true}
          showDelete={true}
          onDelete={() => handleDeleteProduct(product._id)} // Pass delete handler
        />
      </td>
    </tr>
  );

  if (isLoadingProducts) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Products Listing Page</h1>
        </div>
      </div>

      {/* Products Section */}
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Products</h1>
          <Link to="/product-operation/add-product">
            <button className="add-category-btn">Add Products +</button>
          </Link>
        </div>
        <Table
          headers={productHeaders}
          data={products}
          renderRow={renderProductRow}
          loading={isLoadingProducts}
          noDataMessage="No products available"
        />
      </div>
    </>
  );
};

export default ProductOperation;
