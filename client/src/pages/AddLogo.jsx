import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // For notifications

// Use import.meta.env to access Vite environment variables
const AddLogo = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        // Use the environment variable for the API URL
        const backendUrl = `${import.meta.env.VITE_API_URL}/api/upload-logo`;

        // Fetch API instead of axios
        const response = await fetch(backendUrl, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Logo uploaded successfully!");

          // Navigate to /client-operation after a successful upload
          setTimeout(() => {
            navigate("/client-operation");
          }); // Delay the navigation by 2 seconds
        } else {
          toast.error("Failed to upload the image");
        }
      } catch (error) {
        console.error("Error uploading the image:", error);

        toast.error("Error uploading the image");
      }
    } else {
      console.log("No image file selected");

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
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default AddLogo;
