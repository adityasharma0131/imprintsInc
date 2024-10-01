import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const EditSubCategory = () => {
  const { categoryId, subcategory } = useParams(); // Correctly using both parameters
  const [subcategoryName, setSubcategoryName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the subcategory name when the component mounts
  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }

        const data = await response.json();
        const foundSubcategory = data.subcategories.find(
          (sub) => sub === subcategory
        );

        if (foundSubcategory) {
          setSubcategoryName(foundSubcategory);
        } else {
          setError("Subcategory not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubcategory();
  }, [categoryId, subcategory]);

  // Handle form submission to edit the subcategory
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/categories/${categoryId}/subcategories`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldSubcategory: subcategory,
            newSubcategory: subcategoryName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update subcategory");
      }

      // Redirect to the category operation page after a successful update
      navigate("/category-operation");
    } catch (error) {
      setError(error.message);
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
            <IoIosArrowForward />
            <span className="dash-head2">Edit Subcategory</span>
          </h1>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit Subcategory</h1>
          </div>

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
                      className="dash-input"
                      placeholder="Enter subcategory name"
                      value={subcategoryName}
                      onChange={(e) => setSubcategoryName(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Save
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

export default EditSubCategory;
