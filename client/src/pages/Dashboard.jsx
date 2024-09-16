import React, { useState, useEffect } from "react";
import pumpImg from "/assets/Book.png";
import valveImg from "/assets/Book.png";
import cylinderImg from "/assets/Book.png";
import Table from "../components/TableComponent";

const Dashboard = () => {
  // Sample static product data with image imports
  const sampleProducts = [
    {
      _id: "1",
      name: "Hydraulic Pump",
      category: "Hydraulics",
      images: [pumpImg],
      smallDesc: "<p>This is a powerful hydraulic pump.</p>",
    },
    {
      _id: "2",
      name: "Control Valve",
      category: "Hydraulics",
      images: [valveImg],
      smallDesc: "<p>Efficient control valve for hydraulic systems.</p>",
    },
    {
      _id: "3",
      name: "Hydraulic Cylinder",
      category: "Cylinders",
      images: [cylinderImg],
      smallDesc: "<p>Durable hydraulic cylinder for heavy machinery.</p>",
    },
  ];

  const recentQueries = [
    { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
  ];

  const adminUsers = [
    { userId: "A123", name: "Admin One", email: "admin1@example.com" },
    { userId: "B456", name: "Admin Two", email: "admin2@example.com" },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  // Strip HTML tags from a string (for smallDesc)
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <div className="admin-bx">
        <h1 className="heading">Welcome AdminName</h1>
      </div>

      {/* Recent Queries and Admin Users in the same row */}
      <div className="table-row">
        {/* Recent Queries Table */}
        <div className="recent-queries">
          <h1 className="heading">Recent Queries</h1>
          <Table
            columns={["Name", "Email", "Phone Number"]}
            data={recentQueries.map((query) => ({
              Name: query.name,
              Email: query.email,
              "Phone Number": query.phone,
            }))}
            emptyMessage="No queries available"
          />
        </div>

        {/* Admin Users Table */}
        <div className="admin-users">
          <h1 className="heading">Admin Users</h1>
          <Table
            columns={["User ID", "Name", "Email"]}
            data={adminUsers.map((user) => ({
              "User ID": user.userId,
              Name: user.name,
              Email: user.email,
            }))}
            emptyMessage="No admin users available"
          />
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="product-listing">
        <h1 className="heading">Recent Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Table
            columns={["Product Name", "Category", "Image", "Small Description"]}
            data={products.map((product) => ({
              "Product Name": product.name,
              Category: product.category,
              Image: product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              ) : (
                "No image available"
              ),
              "Small Description": stripHtmlTags(product.smallDesc),
            }))}
            emptyMessage="No products available"
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
