import React from "react";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const ProductOperation = () => {
  // Dummy product data
  const products = [
    { id: 1, category: "Hydraulics" },
    { id: 2, category: "Pneumatics" },
    { id: 3, category: "Fittings" },
  ];

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
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.category}</td>
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
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductOperation;
