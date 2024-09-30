import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      toast.success("Category added successfully!"); // Show success toast
      setCategoryName(""); // Clear the input field after success
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category."); // Show error toast
    }
  };

  return (
    <>
      <Toaster />
      {/* Dashboard Heading */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/category-operation">
              Categories Listing Page
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
          <form onSubmit={handleSubmit}>
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
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
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
