import React, { useEffect, useState } from "react";
import { Table, ActionButtons } from "../components/TableActionB";
import { Link } from "react-router-dom";

const SocialsOperation = () => {
  const [socialPlatforms, setSocialPlatforms] = useState([]);
  const [contactDetails, setContactDetails] = useState(null); // Change to null to represent a single object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const socialHeaders = ["Name", "URL", "Operation"];
  const contactHeaders = ["Phone Number", "Email", "Address", "Operation"];

  useEffect(() => {
    const fetchSocialPlatforms = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/socials`
        );
        if (!response.ok) throw new Error("Failed to fetch social platforms");
        const data = await response.json();
        setSocialPlatforms(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact-details`
        );
        if (!response.ok) throw new Error("Failed to fetch contact details");
        const data = await response.json();
        setContactDetails(data); // Set the fetched single contact object
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSocialPlatforms(), fetchContactDetails()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderSocialRow = (platform) => (
    <tr key={platform._id}>
      <td>{platform.name}</td>
      <td>{platform.url}</td>
      <td>
        <ActionButtons
          editLink={`/social-operation/edit-social/${platform._id}`} // Use _id for editing
          showEdit={true}
          showDelete={false}
        />
      </td>
    </tr>
  );

  const renderContactRow = () => {
    // Render a single contact row since we are fetching one contact detail object
    if (!contactDetails) return null; // If no contact details, return null
    return (
      <tr key={contactDetails._id}>
        <td>{contactDetails.phone}</td>
        <td>{contactDetails.email}</td>
        <td>{contactDetails.address}</td>
        <td>
          <ActionButtons
            editLink={`/social-operation/edit-contact/${contactDetails._id}`} // Use the _id for editing
            showEdit={true}
            showDelete={false}
          />
        </td>
      </tr>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="heading1">Socials Page</h1>
        </div>
      </div>

      {/* Social Media Platforms Table */}
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Social Media Platforms</h1>
        </div>
        <Table
          headers={socialHeaders}
          data={socialPlatforms}
          renderRow={renderSocialRow}
          noDataMessage="No platforms available"
        />
      </div>

      {/* Contact Details Table */}
      <div className="product-listing">
        <div className="product-header">
          <h1 className="heading">Contact Details</h1>
        </div>
        <Table
          headers={contactHeaders}
          data={[contactDetails]} // Wrap the single contact detail in an array
          renderRow={renderContactRow}
          noDataMessage="No contact details available"
        />
      </div>
    </>
  );
};

export default SocialsOperation;
