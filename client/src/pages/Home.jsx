import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; // For notifications

import { HashLink as Link } from "react-router-hash-link";

import aboutus from "/assets/aboutus.png";

import { MdDesignServices } from "react-icons/md";
import { IoRibbon } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientImages, setClientImages] = useState([]);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    email: "",
    budget: "",
    giftsNeeded: "",
    message: "",
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch client logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/logos`
        );
        if (!response.ok) throw new Error("Failed to fetch logos");
        const data = await response.json();
        const imageUrls = data.map(
          (logo) => `${import.meta.env.VITE_API_URL}/uploads/${logo.filename}`
        );
        setClientImages(imageUrls);
      } catch (err) {
        console.error("Error fetching logos:", err);
        setError("Failed to load logos.");
        toast.error("Failed to load logos. Please try again later.");
      }
    };

    fetchLogos();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Reset form on success
      setFormData({
        name: "",
        phone: "",
        companyName: "",
        email: "",
        budget: "",
        giftsNeeded: "",
        message: "",
      });

      toast.success("Form submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit the form.");
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* HOME SECTION  */}
      <div className="homepage" id="home"></div>

      {/* WHY CHOOSE US SECTION */}
      <div className="whyus">
        <h1 className="heading1">Why Choose Us</h1>
        <div className="pointers">
          {[
            {
              icon: <MdDesignServices className="hero-icon" />,
              title: "Unmatched Customization",
            },
            {
              icon: <IoRibbon className="hero-icon" />,
              title: "High-Quality Products",
            },
            {
              icon: <FaTruckFast className="hero-icon" />,
              title: "Timely & PAN India Delivery",
            },
            {
              icon: <RiDiscountPercentFill className="hero-icon" />,
              title: "Discount on Bulk Orders",
            },
          ].map((item, index) => (
            <div className="sec" key={index}>
              {item.icon}
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="categories-container" id="categories">
        <h1 className="heading1">Our Categories</h1>
        <div className="categories-flex">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.name}`} // Dynamic URL
              key={category._id}
              className="category-item"
            >
              <div className="category-border">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${
                    category.homepageImage
                  }`}
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/path-to-placeholder-image.jpg"; // Fallback image
                  }}
                />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CLIENTS SECTION */}
      <div className="clients" id="clients">
        <h1 className="heading1">Clients That Trust Us</h1>
        <div className="slider">
          <div className="logos">
            <div className="logos-slide">
              {clientImages.concat(clientImages).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="item"
                  alt={`Client ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <div className="about-section" id="about">
        <h2 className="heading1">About Us</h2>
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">We have 15+ Years of Experience</h1>
            <p className="about-description">
              Imprints INC is engaged in the business of corporate gifting,
              known for supplying unbeatable business promotional products that
              have made an indelible impact across industry verticals. Our
              commitment to excellence & passion for quality products have shown
              us the way to growth & prosperity. Our huge range of products
              includes stationery items, corporate gifts, clothing, signages,
              electronics, etc.
            </p>
          </div>
          <div className="about-image">
            <img
              src={aboutus}
              alt="A gift box with Imprints INC branding"
              className="about-img"
            />
          </div>
        </div>
      </div>

      <div className="contact" id="contact">
        <Toaster />
        <div className="contact-container">
          <h2 className="contact-heading">Let's Talk</h2>
          <p className="contact-subheading">
            Fill out the form below to request a custom gift design.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone No."
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="form-input"
                value={formData.companyName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="budget"
              placeholder="Approx. Budget Per Hamper"
              className="form-input full-width"
              value={formData.budget}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="giftsNeeded"
              placeholder="Estimated Number of Gifts Needed"
              className="form-input full-width"
              value={formData.giftsNeeded}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="form-input full-width"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="contact-button">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
