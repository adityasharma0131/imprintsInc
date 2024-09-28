import React, { useEffect, useState } from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import toast, { Toaster } from "react-hot-toast"; // For notifications

const ContactOperation = () => {
  const [contactQueries, setContactQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact queries from backend
  useEffect(() => {
    const fetchContactQueries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setContactQueries(data);
      } catch (error) {
        console.error("Error fetching contact queries:", error);
        toast.error("Failed to fetch contact queries.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactQueries();
  }, []);

  // Handle deletion of a contact query
  const handleDelete = async (queryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${queryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      toast.success("Query deleted successfully!");
      // Remove the deleted query from the state
      setContactQueries((prevQueries) =>
        prevQueries.filter((query) => query._id !== queryId)
      );
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Failed to delete query.");
    }
  };

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
    <tr key={query._id}>
      <td>{query.name}</td>
      <td>{query.phone}</td>
      <td>{query.companyName}</td>
      <td>{query.email}</td>
      <td>{query.budget}</td>
      <td>{query.giftsNeeded}</td>
      <td>{query.message}</td>
      <td>
        <ActionButtons
          showEdit={false}
          showDelete={true}
          onDelete={() => handleDelete(query._id)} // Pass delete handler
        />
      </td>
    </tr>
  );

  return (
    <>
      <Toaster />
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Contact Queries</h1>
        </div>
      </div>
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Recent Queries</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : contactQueries.length > 0 ? (
          <Table
            headers={contactHeaders}
            data={contactQueries}
            renderRow={renderContactRow}
            noDataMessage="No queries available"
          />
        ) : (
          <p>No queries available</p>
        )}
      </div>
    </>
  );
};

export default ContactOperation;
