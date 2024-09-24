import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";

const AddLogo = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      // Process the file upload
      const formData = new FormData();
      formData.append("image", imageFile);
      console.log("Uploaded Image:", imageFile);
      // You can add the logic to send formData to the backend
    } else {
      console.log("No image file selected");
    }
  };

  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default AddLogo;
