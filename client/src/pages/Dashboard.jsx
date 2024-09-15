import React, { useState, useEffect } from "react";
import pumpImg from "/assets/Book.png";
import valveImg from "/assets/Book.png";
import cylinderImg from "/assets/Book.png";

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
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {recentQueries.length > 0 ? (
                recentQueries.map((query, index) => (
                  <tr key={index}>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td>{query.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No queries available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Admin Users Table */}
        <div className="admin-users">
          <h1 className="heading">Admin Users</h1>
          <table className="modern-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.length > 0 ? (
                adminUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No admin users available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="product-listing">
        <h1 className="heading">Recent Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Small Description</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  const firstImage = product.images?.[0]; // Directly use imported image

                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt={product.name}
                            className="product-image"
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </td>
                      <td>{stripHtmlTags(product.smallDesc)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Dashboard;
