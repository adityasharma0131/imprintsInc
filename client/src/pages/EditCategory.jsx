import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { IoIosArrowForward } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

const EditCategory = () => {
  const { id } = useParams(); // Use useParams to get the route parameters
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories/${id}`
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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }), // Send updated name
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();
      console.log("Category updated successfully:", updatedCategory);

      toast.success("Category updated successfully!"); // Show success toast
      // Optionally, navigate back to the categories listing
      navigate("/category-operation"); // Redirect to the main product operation page or categories list
    } catch (error) {
      setError(error.message); // Handle errors
      toast.error("Error updating category: " + error.message); // Show error toast
    }
  };

  return (
    <>
      <Toaster /> {/* Add Toaster here */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/category-operation">
              Categories Listing Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Edit Category</span>
          </h1>
        </div>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit Category</h1>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display error if any */}
          {/* Form for editing category */}
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
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)} // Update state on change
                      placeholder="Enter category name"
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Edit +
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

export default EditCategory;
