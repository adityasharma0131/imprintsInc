import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";

const AddCategory = () => {
  return (
    <>
      {/* Dashboard Heading */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/product-operation">
              Products Listing Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add Category</span>
          </h1>
        </div>
      </div>

      {/* Add Category Form */}
      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Add new Category</h1>
          </div>

          {/* Form for adding category */}
          <form>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="category-name"
                      className="dash-input"
                      placeholder="Enter category name"
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Add +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
