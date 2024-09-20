import React from "react";
import { Table, ActionButtons } from "../components/TableActionB";

const SocialsOperation = () => {
  // Static social media data
  const socialPlatforms = [
    { platformId: "W123", name: "WhatsApp", url: "https://wa.me/1234567890" },
    {
      platformId: "I456",
      name: "Instagram",
      url: "https://instagram.com/yourprofile",
    },
    {
      platformId: "F789",
      name: "Facebook",
      url: "https://facebook.com/yourpage",
    },
    {
      platformId: "L101",
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
    },
  ];

  // Static contact details data
  const contactDetails = [
    {
      contactId: "C001",
      phone: "+1 123 456 7890",
      email: "contact@example.com",
      address: "1234 Street, City, Country",
    },
  ];

  const socialHeaders = ["Name", "URL", "Operation"];
  const contactHeaders = ["Phone Number", "Email", "Address", "Operation"];

  // Render each row of the social media table
  const renderSocialRow = (platform) => (
    <tr key={platform.platformId}>
      <td>{platform.name}</td>
      <td>{platform.url}</td>
      <td>
        <ActionButtons showEdit={true} showDelete={true} />
      </td>
    </tr>
  );

  // Render each row of the contact details table
  const renderContactRow = (contact) => (
    <tr key={contact.contactId}>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>{contact.address}</td>
      <td>
        <ActionButtons showEdit={true} showDelete={true} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="admin-bx">
        <h1 className="heading1">Socials Page</h1>
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
          data={contactDetails}
          renderRow={renderContactRow}
          noDataMessage="No contact details available"
        />
      </div>
    </>
  );
};

export default SocialsOperation;
