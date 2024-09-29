import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa"; // Imported only used icons

const Footer = () => {
  const [contactDetails, setContactDetails] = useState(null); // State to store contact details
  const [socialLinks, setSocialLinks] = useState([]); // State to store social links
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact-details`
        );
        if (!response.ok) throw new Error("Failed to fetch contact details");
        const data = await response.json();
        setContactDetails(data); // Set fetched data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails(); // Call the function to fetch contact details
  }, []); // Empty dependency array means it runs once when component mounts

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/socials`
        );
        if (!response.ok) throw new Error("Failed to fetch social links");
        const data = await response.json();
        setSocialLinks(data); // Set fetched data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks(); // Call the function to fetch links
  }, []); // Empty dependency array means it runs once when component mounts

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">Our Company</h3>
            <p className="footer-description">
              Welcome To Imprints INC
              <br />
              HAVING 10 YEARS EXPERIENCE
            </p>
            <p className="footer-text">
              Imprints INC is engaged in the business of corporate gifting,
              known for supplying unbeatable business promotional products that
              have made an indelible impact across industry verticals. Our
              commitment to excellence and passion for quality products have
              shown us the way to growth and prosperity. Our huge range of
              products includes stationery items, corporate gifts, clothing,
              signages, electronics, etc.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact Details</h3>
            {contactDetails && ( // Render contact details if available
              <>
                <p className="footer-contact">{contactDetails.phone}</p>
                <p className="footer-contact">{contactDetails.email}</p>
                <p className="footer-contact">{contactDetails.address}</p>
              </>
            )}
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <ul className="social-links">
              {socialLinks.map((social, index) => (
                <li key={social.id || index}>
                  {" "}
                  {/* Use social.id if available, else index */}
                  <a
                    href={social.url} // Use the URL from fetched data
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name === "Instagram" && <FaInstagram />}
                    {social.name === "Facebook" && <FaFacebook />}
                    {social.name === "WhatsApp" && <FaWhatsapp />}
                    {social.name === "LinkedIn" && <FaLinkedin />}
                  </a>
                </li>
              ))}
            </ul>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.9193236854294!2d72.87898507430629!3d19.103939682106375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8bd850fe24b%3A0xc190a88be735d0b5!2sImprints%20INC!5e1!3m2!1sen!2sin!4v1726071394981!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Imprints INC © 2024 | All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
