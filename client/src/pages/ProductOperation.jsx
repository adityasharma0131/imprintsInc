import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Table, ActionButtons } from "../components/TableActionB";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

import pumpImg from "/assets/Book.png";
import valveImg from "/assets/Book.png";
import cylinderImg from "/assets/Book.png";

// Sample product data
const sampleProducts = [
  {
    _id: "1",
    name: "Hydraulic Pump",
    category: "Hydraulics",
    images: [pumpImg],
    smallDesc: "<p>This is a powerful hydraulic pump.</p>",
  },
  {
    _id: "2",
    name: "Control Valve",
    category: "Hydraulics",
    images: [valveImg],
    smallDesc: "<p>Efficient control valve for hydraulic systems.</p>",
  },
  {
    _id: "3",
    name: "Hydraulic Cylinder",
    category: "Cylinders",
    images: [cylinderImg],
    smallDesc: "<p>Durable hydraulic cylinder for heavy machinery.</p>",
  },
];

const ProductOperation = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load products (simulated)
    setTimeout(() => {
      setProducts(sampleProducts);
      setIsLoadingProducts(false);
    }, 1000);
  }, []);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      setCategories(categories.filter((category) => category._id !== id)); // Update state
      toast.success("Category deleted successfully!"); // Show success toast
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting category: " + error.message); // Show error toast
    }
  };

  // Strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Define headers for categories and products
  const categoryHeaders = ["Category", "Operation"];
  const productHeaders = [
    "Product Name",
    "Category",
    "Image",
    "Small Description",
    "Operation",
  ];

  // Render a row for each category
  const renderCategoryRow = (category) => (
    <tr key={category._id}>
      <td>{category.name}</td>
      <td>
        <ActionButtons
          editLink={`/product-operation/edit-category/${category._id}`}
          showEdit={true}
          showDelete={true}
          onDelete={() => deleteCategory(category._id)}
        />
      </td>
    </tr>
  );

  // Render a row for each product
  const renderProductRow = (product) => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
      </td>
      <td>{stripHtmlTags(product.smallDesc)}</td>
      <td>
        <ActionButtons
          editLink={`/product-operation/edit-product/${product._id}`}
          showEdit={true}
          showDelete={true}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Products Listing Page</h1>
        </div>
      </div>

      {/* Categories Section */}
      <div className="table-row">
        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Category</h1>
            <Link to="/product-operation/add-category">
              <button className="add-category-btn">Add Category +</button>
            </Link>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Table
            headers={categoryHeaders}
            data={categories}
            renderRow={renderCategoryRow}
            loading={isLoadingCategories}
            noDataMessage="No categories available"
          />
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
