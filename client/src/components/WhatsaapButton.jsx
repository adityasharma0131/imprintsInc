// WhatsAppButton.js
import React from "react";
import PropTypes from "prop-types"; // For type checking props

const WhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

// Define prop types for the component
WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default WhatsAppButton;
