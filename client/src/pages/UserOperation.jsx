import React, { useEffect, useState } from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast"; // Importing toast for notifications

const UserOperation = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setAdminUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users."); // Notify user of fetch failure
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      toast.success("User deleted successfully!");
      // Remove the deleted user from the state
      setAdminUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  // Render each row of the table with user data
  const renderUserRow = (user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <ActionButtons
          editLink={`/user-operation/edit-user/${user._id}`}
          showEdit={true}
          showDelete={true}
          onDelete={() => handleDelete(user._id)} // Pass delete function
        />
      </td>
    </tr>
  );

  return (
    <>
      <Toaster />
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Users Page</h1>
        </div>
      </div>

      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Admin Users</h1>
          <Link to="/user-operation/add-user">
            <button className="add-category-btn">Add User +</button>
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : adminUsers.length > 0 ? (
          <Table
            headers={["Name", "Email", "Operation"]}
            data={adminUsers}
            renderRow={renderUserRow}
            noDataMessage="No users available"
          />
        ) : (
          <p>No users available</p>
        )}
      </div>
    </>
  );
};

export default UserOperation;
