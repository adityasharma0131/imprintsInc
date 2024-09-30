import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Table, ActionButtons } from "../components/TableActionB";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const CategoryOperation = () => {
  const [categories, setCategories] = useState([]);
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

  const deleteSubcategory = async (categoryId, subcategory) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/categories/${categoryId}/subcategories`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subcategory }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete subcategory");
      }
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                subcategories: category.subcategories.filter(
                  (sub) => sub !== subcategory
                ),
              }
            : category
        )
      );
      toast.success("Subcategory deleted successfully!");
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting subcategory: " + error.message);
    }
  };

  // Define headers for categories and subcategories
  const categoryHeaders = ["Category", "Operation"];
  const subcategoryHeaders = ["Subcategory", "Operation"];

  // Render a row for each category
  const renderCategoryRow = (category) => (
    <tr key={category._id}>
      <td>{category.name}</td>
      <td>
        <ActionButtons
          editLink={`/category-operation/edit-category/${category._id}`}
          showEdit={true}
          showDelete={true}
          onDelete={() => deleteCategory(category._id)}
        />
      </td>
    </tr>
  );

  // Render a row for each subcategory within a category
  const renderSubCategoryRow = (categoryId, subcategory) => (
    <tr key={subcategory}>
      <td>{subcategory}</td>
      <td>
        <ActionButtons
          editLink={`/category-operation/edit-subcategory/${categoryId}`}
          showEdit={true}
          showDelete={true}
          onDelete={() => deleteSubcategory(categoryId, subcategory)}
        />
      </td>
    </tr>
  );

  // Render a table for each category with its subcategories
  const renderCategoryTable = (category) => (
    <div key={category._id} className="category-section">
      <h2>{category.name}</h2>

      {/* Subcategory table */}
      <Table
        headers={subcategoryHeaders}
        data={category.subcategories}
        renderRow={(subcategory) =>
          renderSubCategoryRow(category._id, subcategory)
        }
        loading={isLoadingCategories}
        noDataMessage="No subcategories available"
      />
    </div>
  );

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Categories Listing Page</h1>
        </div>
      </div>

      {/* Error display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Categories Section */}
      <div className="category-listing">
        <div className="product-header">
          <h1 className="heading">Category</h1>
          <Link to="/category-operation/add-category">
            <button className="add-category-btn">Add Category +</button>
          </Link>
        </div>

        {/* Main Categories Table */}
        <Table
          headers={categoryHeaders}
          data={categories}
          renderRow={renderCategoryRow}
          loading={isLoadingCategories}
          noDataMessage="No categories available"
        />

        {/* Render a table for each category with its subcategories */}
        {categories.map((category) => renderCategoryTable(category))}
      </div>
    </>
  );
};

export default CategoryOperation;
