import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // For notifications

const AddLogo = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For previewing the selected image
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Generate a preview URL for the selected image
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/upload`, // Update with your backend endpoint
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("Logo uploaded successfully!");
          setTimeout(() => {
            navigate("/client-operation");
          });
        } else {
          toast.error("Failed to upload logo. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/client-operation">
              Gallery Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add Logo</span>
          </h1>
        </div>
      </div>

      <div className="table-row">
        <div className="recent-queries">
          <div className="operation-header">
            <h1 className="heading">Add New Logo</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="file"
                      name="image-file"
                      className="dash-input"
                      accept="image/*"
                      onChange={handleChange}
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

          {/* Preview the selected image */}
          {previewUrl && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img
                src={previewUrl}
                alt="Selected Logo"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddLogo;
