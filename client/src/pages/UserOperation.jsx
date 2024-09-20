import React from "react";
import { Table, ActionButtons } from "../components/TableActionB";

const UserOperation = () => {
  // Static admin users data
  const adminUsers = [
    { userId: "A123", name: "Admin One", email: "admin1@example.com" },
    { userId: "B456", name: "Admin Two", email: "admin2@example.com" },
  ];

  const productHeaders = ["Name", "Email", "Operation"];

  // Render each row of the table
  const renderProductRow = (user) => (
    <tr key={user.userId}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <ActionButtons showEdit={true} showDelete={true} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <h1 className="heading">Admin Users</h1>
      </div>
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Admin Users</h1>
          <button className="add-category-btn">Add User +</button>
        </div>
        <Table
          headers={productHeaders}
          data={adminUsers}
          renderRow={renderProductRow}
          noDataMessage="No users available"
        />
      </div>
    </>
  );
};

export default UserOperation;
