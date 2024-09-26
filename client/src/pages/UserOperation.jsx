import React from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import { HashLink as Link } from "react-router-hash-link";

const UserOperation = () => {
  // Static admin users data
  const adminUsers = [
    { userId: "A123", name: "Admin One", email: "admin1@example.com" },
    { userId: "B456", name: "Admin Two", email: "admin2@example.com" },
  ];

  // Table headers for the admin users
  const tableHeaders = ["Name", "Email", "Operation"];

  // Render each row of the table with user data
  const renderUserRow = (user) => (
    <tr key={user.userId}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        {/* Dynamic link to edit the user based on userId */}
        <ActionButtons
          editLink={`/product-operation/edit-user/${user.userId}`}
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

        {/* Table Component */}
        <Table
          headers={tableHeaders}
          data={adminUsers}
          renderRow={renderUserRow}
          noDataMessage="No users available"
        />
      </div>
    </>
  );
};

export default UserOperation;
