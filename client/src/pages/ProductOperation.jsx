import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import pumpImg from "/assets/Book.png";
import valveImg from "/assets/Book.png";
import cylinderImg from "/assets/Book.png";
import { Table, ActionButtons } from "../components/TableActionB";

// Dummy data
const categories = [
  { id: 1, category: "Hydraulics" },
  { id: 2, category: "Pneumatics" },
  { id: 3, category: "Fittings" },
];

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
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  // Strip HTML tags from a string
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const categoryHeaders = ["Category", "Operation"];
  const productHeaders = [
    "Product Name",
    "Category",
    "Image",
    "Small Description",
    "Operation",
  ];

  const renderCategoryRow = (category) => (
    <tr key={category.id}>
      <td>{category.category}</td>
      <td>
        <ActionButtons
          editLink={`/product-operation/edit-category/${category.id}`}
          showEdit={true}
          showDelete={true}
        />
      </td>
    </tr>
  );

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
      <div className="table-row">
        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Category</h1>
            <Link to="/product-operation/add-category">
              <button className="add-category-btn">Add Category +</button>
            </Link>
          </div>
          <Table
            headers={categoryHeaders}
            data={categories}
            renderRow={renderCategoryRow}
            loading={loading}
            noDataMessage="No categories available"
          />
        </div>
      </div>

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
          loading={loading}
          noDataMessage="No products available"
        />
      </div>
    </>
  );
};

export default ProductOperation;
