import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMap,
} from "react-icons/fa"; // Imported additional icons

const Footer = () => {
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
              have made indelible impact across industry verticals. Our
              commitment for excellence & passion for quality products have
              shown us the way to growth & prosperity. Our huge range of
              products includes stationery items, corporate gifts, clothing,
              signages, electronics, etc.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact Details</h3>
            <p className="footer-contact">99309 80228</p>
            <p className="footer-contact">tandon@imprintsinc.in</p>
            <p className="footer-contact">
              {" "}
              C-Annexe, Hind Saurashtra Industrial Estate, Andheri-Kurla Road,
              Near Marol Naka Metro Station, Marol, Andheri (East), Mumbai
              400059.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <ul className="social-links">
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://www.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </li>
              <li>
                <a
                  href="https://www.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.9193236854294!2d72.87898507430629!3d19.103939682106375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8bd850fe24b%3A0xc190a88be735d0b5!2sImprints%20INC!5e1!3m2!1sen!2sin!4v1726071394981!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
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
