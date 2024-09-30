import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Table, ActionButtons } from "../components/TableActionB";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const CategoryOperation = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

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

  // Define headers for categories
  const categoryHeaders = ["Category", "Operation"];

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

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Categories Listing Page</h1>
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
    </>
  );
};

export default CategoryOperation;
