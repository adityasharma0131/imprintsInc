import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";

const AddUsers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset message before submission

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`, // Use Vite environment variable
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: result.message, type: "success" });
        setFormData({ name: "", email: "", password: "" }); // Reset form data
      } else {
        setMessage({ text: result.error || result.message, type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        text: "An error occurred while adding the user.",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/user-operation">
              Users Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Add User</span>
          </h1>
        </div>
      </div>

      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Add New User</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="dash-input"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="dash-input"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      className="dash-input"
                      placeholder="Enter password"
                      value={formData.password}
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

          {message && (
            <p
              className={
                message.type === "success" ? "success-message" : "error-message"
              }
            >
              {message.text}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUsers;
