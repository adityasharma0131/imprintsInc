import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [desktopBackdrop, setDesktopBackdrop] = useState(null);
  const [mobileBackdrop, setMobileBackdrop] = useState(null);
  const [currentDesktopBackdrop, setCurrentDesktopBackdrop] = useState("");
  const [currentMobileBackdrop, setCurrentMobileBackdrop] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setCurrentDesktopBackdrop(data.desktopBackdrop);
        setCurrentMobileBackdrop(data.mobileBackdrop);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);

    // Append the files only if they are updated
    if (desktopBackdrop) {
      formData.append("desktopBackdrop", desktopBackdrop);
    }
    if (mobileBackdrop) {
      formData.append("mobileBackdrop", mobileBackdrop);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        {
          method: "PUT",
          body: formData, // Send FormData instead of JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      toast.success("Category updated successfully!");
      navigate("/category-operation");
    } catch (error) {
      setError(error.message);
      toast.error("Error updating category: " + error.message);
    }
  };

  return (
    <>
      <Toaster />
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
          {error && <p style={{ color: "red" }}>{error}</p>}
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
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Edit +
                    </button>
                  </td>
                </tr>

                {/* Display current desktop backdrop */}
                <tr>
                  <td>
                    <label>Current Desktop Backdrop</label>
                    {currentDesktopBackdrop && (
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL
                        }/${currentDesktopBackdrop}`}
                        alt="Current Desktop Backdrop"
                        style={{ width: "200px" }}
                      />
                    )}
                    <input
                      type="file"
                      name="desktopBackdrop"
                      className="dash-input"
                      onChange={(e) => setDesktopBackdrop(e.target.files[0])}
                      accept="image/*"
                    />
                  </td>
                </tr>

                {/* Display current mobile backdrop */}
                <tr>
                  <td>
                    <label>Current Mobile Backdrop</label>
                    {currentMobileBackdrop && (
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL
                        }/${currentMobileBackdrop}`}
                        alt="Current Mobile Backdrop"
                        style={{ width: "200px" }}
                      />
                    )}
                    <input
                      type="file"
                      name="mobileBackdrop"
                      className="dash-input"
                      onChange={(e) => setMobileBackdrop(e.target.files[0])}
                      accept="image/*"
                    />
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
