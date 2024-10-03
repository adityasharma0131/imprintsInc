import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [desktopBackdrop, setDesktopBackdrop] = useState(null);
  const [mobileBackdrop, setMobileBackdrop] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("desktopBackdrop", desktopBackdrop);
    formData.append("mobileBackdrop", mobileBackdrop);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          body: formData, // Send formData with images
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      toast.success("Category added successfully!");
      setCategoryName("");
      setDesktopBackdrop(null);
      setMobileBackdrop(null);
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
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
            <span className="dash-head2">Add Category</span>
          </h1>
        </div>
      </div>

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
                  <th>Desktop Backdrop</th>
                  <th>Mobile Backdrop</th>
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
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      name="desktop-backdrop"
                      className="dash-input"
                      accept="image/*"
                      onChange={(e) => setDesktopBackdrop(e.target.files[0])}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      name="mobile-backdrop"
                      className="dash-input"
                      accept="image/*"
                      onChange={(e) => setMobileBackdrop(e.target.files[0])}
                      required
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
