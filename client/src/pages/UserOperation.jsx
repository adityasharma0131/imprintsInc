import React, { useEffect, useState } from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import { HashLink as Link } from "react-router-hash-link";

const UserOperation = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Ensure loading is set to true when fetching begins
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`
        );

        // Check for response status
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setAdminUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUsers();
  }, []);

  // Table headers for the admin users
  const tableHeaders = ["Name", "Email", "Operation"];

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
        />
      </td>
    </tr>
  );

  return (
    <>
      {/* Page Header */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Users Page</h1>
        </div>
      </div>

      {/* Admin Users Table */}
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
            headers={tableHeaders}
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
