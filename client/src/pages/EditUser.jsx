import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster

const EditUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL parameters
  const navigate = useNavigate(); // For navigation after editing
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user data."); // Use toast for error message
      } finally {
        setLoading(false); // Stop loading when the request completes
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submission for updating the user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      toast.success("User updated successfully!"); // Use toast for success message
      navigate("/user-operation"); // Navigate back to the users page
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user."); // Use toast for error message
    }
  };

  if (loading) {
    return <p>Loading user data...</p>; // Loading state
  }

  return (
    <>
      <Toaster /> {/* Render the Toaster component */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/user-operation">
              Users Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Edit User</span>
          </h1>
        </div>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit User</h1>
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
          {/* Form for editing a user */}
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
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="dash-input"
                      placeholder="Enter email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      className="dash-input"
                      placeholder="Enter password"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      required
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

export default EditUser;
