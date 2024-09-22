import React from "react";
import { Table, ActionButtons } from "../components/TableActionB";

const ContactOperation = () => {
  // Static contact queries data
  const contactQueries = [
    {
      name: "John Doe",
      phoneNo: "123-456-7890",
      companyName: "ABC Corp",
      email: "john@example.com",
      approxBudget: "$1000",
      qty: "50",
      message: "Looking for corporate hampers.",
    },
    {
      name: "Jane Smith",
      phoneNo: "987-654-3210",
      companyName: "XYZ Ltd",
      email: "jane@example.com",
      approxBudget: "$1500",
      qty: "30",
      message: "Need holiday gift hampers.",
    },
  ];

  const contactHeaders = [
    "Name",
    "Phone No",
    "Company Name",
    "Email",
    "Approx Budget per Hamper",
    "Qty",
    "Message",
    "Operation",
  ];

  // Render each row of the table
  const renderContactRow = (query) => (
    <tr key={query.email}>
      <td>{query.name}</td>
      <td>{query.phoneNo}</td>
      <td>{query.companyName}</td>
      <td>{query.email}</td>
      <td>{query.approxBudget}</td>
      <td>{query.qty}</td>
      <td>{query.message}</td>
      <td>
        <ActionButtons showEdit={true} showDelete={true} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Contact Queries</h1>
        </div>
      </div>
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Recent Queries</h1>
        </div>
        <Table
          headers={contactHeaders}
          data={contactQueries}
          renderRow={renderContactRow}
          noDataMessage="No queries available"
        />
      </div>
    </>
  );
};

export default ContactOperation;
