import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Table, ActionButtons } from "../components/TableActionB";

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

  // Strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Define headers for and products

  const productHeaders = [
    "Product Name",
    "Category",
    "Image",
    "Small Description",
    "Operation",
  ];

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
