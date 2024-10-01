import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { toast } from "react-hot-toast"; // Import toast for notifications

const AddSubCategory = () => {
  const { categoryId } = useParams(); // Get categoryId from URL parameters
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the category by ID from the backend
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategoryName(data.name);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName) {
      toast.error("Please enter a subcategory name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/categories/${categoryId}/subcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subcategory: subcategoryName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add subcategory");
      }

      // Reset the subcategory name after successful addition
      toast.success("Subcategory added successfully!");
      setSubcategoryName(""); // Clear the input field after success

      // Optionally: Update the UI or state here to reflect the new subcategory.
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/category-operation">
              Categories Listing Page
            </Link>
            <span className="dash-head2">
              Add Sub Category for {categoryName}
            </span>
          </h1>
        </div>
      </div>

      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Add new Sub Category to {categoryName}</h1>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Subcategory Name</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      value={subcategoryName}
                      onChange={(e) => setSubcategoryName(e.target.value)}
                      className="dash-input"
                      placeholder="Enter subcategory name"
                      required
                    />
                  </td>
                  <td>
                    <button type="submit" className="add" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add +"}
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

export default AddSubCategory;
