import React, { useState, useEffect } from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import { HashLink as Link } from "react-router-hash-link";

const ClientImg = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  // Fetch logo data from the backend API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/logos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch logos");
        }
        const data = await response.json();
        setProducts(data); // Assuming the response is an array of logos
      } catch (error) {
        console.error("Error fetching logos:", error);
        setError("Failed to load logos. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchLogos();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this logo?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete logo");
      }

      // Remove the deleted logo from state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting logo:", error);
      setError("Failed to delete logo. Please try again later.");
    }
  };

  const headers = ["Company logo", "Operation"];

  const renderRow = (product) => (
    <tr key={product._id}>
      <td>
        <img
          src={product.imageUrl} // Ensure this URL is correct
          alt="Client Logo"
          className="product-image"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
      </td>
      <td>
        <ActionButtons
          showEdit={false}
          showDelete={true}
          onDelete={() => handleDelete(product._id, product.imageUrl)} // Pass delete handler
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Gallery Page</h1>
        </div>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Logo</h1>
            <Link to="/client-operation/add-logo">
              <button className="add-category-btn">Add Logo +</button>
            </Link>
          </div>
          {loading && <div>Loading logos...</div>} {/* Loading message */}
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Error message */}
          <Table
            headers={headers}
            data={products}
            renderRow={renderRow}
            loading={loading}
            noDataMessage="No logos available"
          />
        </div>
      </div>
    </>
  );
};

export default ClientImg;
