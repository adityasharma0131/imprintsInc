import React, { useState, useEffect } from "react";

import Table from "../components/TableComponent";

const Dashboard = () => {
  // Retrieve the logged-in user's name from localStorage
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recentQueries, setRecentQueries] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch recent queries from the backend
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }
        const data = await response.json();
        setRecentQueries(data.slice(-2)); // Slice the last 2 queries
      } catch (error) {
        console.error("Error fetching contact queries:", error);
      } finally {
        setLoadingQueries(false);
      }
    };

    fetchQueries();
  }, []);

  // Fetch admin users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAdminUsers(data.slice(-2)); // Slice the last 2 users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch products from the backend (replace static sampleProducts)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        setProducts(data.slice(-4));
      } catch (error) {
        setError("Failed to load products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        <div className="dash-opr-head">
          {/* Display the logged-in user's name */}
          <h1 className="heading1">Welcome {loggedInUser}</h1>
        </div>
      </div>

      {/* Recent Queries and Admin Users in the same row */}
      <div className="table-row">
        {/* Recent Queries Table */}
        <div className="recent-queries">
          <h1 className="heading">Recent Queries</h1>
          {loadingQueries ? (
            <p>Loading queries...</p>
          ) : (
            <Table
              columns={["Name", "Email", "Phone Number"]}
              data={recentQueries.map((query) => ({
                Name: query.name,
                Email: query.email,
                "Phone Number": query.phone,
              }))}
              emptyMessage="No queries available"
            />
          )}
        </div>

        {/* Admin Users Table */}
        <div className="admin-users">
          <h1 className="heading">Admin Users</h1>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <Table
              columns={["User ID", "Name", "Email"]}
              data={adminUsers.map((user) => ({
                "User ID": user._id,
                Name: user.name,
                Email: user.email,
              }))}
              emptyMessage="No admin users available"
            />
          )}
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="product-listing">
        <h1 className="heading">Recent Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            columns={[
              "Product Name",
              "Category",
              "Sub Category",
              "Image",
              "Small Description",
            ]}
            data={products.map((product) => ({
              "Product Name": product.name,
              "Sub Category": product.subcategory,
              Category: product.category,
              Image: product.images[0] ? (
                <img
                  src={`${
                    import.meta.env.VITE_API_URL
                  }/${product.images[0].replace(/\\/g, "/")}`}
                  alt={product.name}
                  className="product-image"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              ) : (
                "No image available"
              ),
              "Small Description": stripHtmlTags(product.description),
            }))}
            emptyMessage="No products available"
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
