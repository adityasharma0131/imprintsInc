import React, { useState, useEffect } from "react";
import client1 from "/assets/client1.png";
import heroImg from "/assets/Property 1=Frame 3.png";
import { Table, ActionButtons } from "../components/TableActionB";

// Dummy product data
const sampleProducts = [
  { _id: "1", images: [client1] },
  { _id: "2", images: [client1] },
];

const imgHero = [
  { _id: "1", images: [heroImg] },
  { _id: "2", images: [heroImg] },
];

const ClientImg = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  const headers = ["Company logo", "Operation"];

  const renderRow = (product) => (
    <tr key={product._id}>
      <td>
        <img
          src={product.images[0]}
          alt="Client Logo"
          className="product-image"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
      </td>
      <td>
        <ActionButtons showEdit={false} showDelete={true} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <h1 className="heading1">Gallery Page</h1>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Logo</h1>
            <button className="add-category-btn">Add Logo +</button>
          </div>
          <Table
            headers={headers}
            data={products}
            renderRow={renderRow}
            loading={loading}
            noDataMessage="No logos available"
          />
        </div>

        <div className="category-listing">
          <div className="product-header">
            <h1 className="heading">Hero Image</h1>
            <button className="add-category-btn">Add Image +</button>
          </div>
          <Table
            headers={headers}
            data={imgHero}
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
