import React, { useState, useEffect } from "react";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import pumpImg from "/assets/Book.png";
import valveImg from "/assets/Book.png";
import cylinderImg from "/assets/Book.png";

const ProductOperation = () => {
  // Dummy product data
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  // Strip HTML tags from a string (for smallDesc)
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <div className="admin-bx">
        <h1>Products Page</h1>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Category</h1>
            <button className="add-category-btn">Add Category +</button>
          </div>

          <table className="modern-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.category}</td>
                    <td>
                      <div className="action-icons">
                        <MdEditNote className="icon edit-icon" />
                        <AiFillDelete className="icon delete-icon" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="no-products">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Category</h1>
          <button className="add-category-btn">Add Category +</button>
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Small Description</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  const firstImage = product.images?.[0]; // Directly use imported image

                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt={product.name}
                            className="product-image"
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </td>
                      <td>{stripHtmlTags(product.smallDesc)}</td>
                      <td>
                        <div className="action-icons">
                          <MdEditNote className="icon edit-icon" />
                          <AiFillDelete className="icon delete-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductOperation;
