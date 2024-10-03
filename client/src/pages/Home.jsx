import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; // For notifications
import corporategifting from "/assets/Corporategifting.png";
import stationery from "/assets/Stationery.png";
import electronics from "/assets/Electronics.png";
import Book from "/assets/Book.png";
import { HashLink as Link } from "react-router-hash-link";


import { MdDesignServices } from "react-icons/md";
import { IoRibbon } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";

import client1 from "/assets/client1.png";
import client2 from "/assets/client2.png";
import client3 from "/assets/client3.png";
import client4 from "/assets/client4.png";
import client5 from "/assets/client5.png";
import client6 from "/assets/client6.png";
import client7 from "/assets/client7.png";
import client8 from "/assets/client8.png";
import client9 from "/assets/client9.png";
import client10 from "/assets/client10.png";
import client11 from "/assets/client11.png";
import client12 from "/assets/client12.png";
import client13 from "/assets/client13.png";
import client14 from "/assets/client14.png";
import client15 from "/assets/client15.png";
import client16 from "/assets/client16.png";
import client17 from "/assets/client17.png";
import client18 from "/assets/client18.png";

const Home = () => {
  const [clientImages, setClientImages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch logos from the backend
    const fetchLogos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/logos`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch logos");
        }

        const data = await response.json();
        const imageUrls = data.map(
          (logo) => `${import.meta.env.VITE_API_URL}/uploads/${logo.filename}`
        ); // Adjust URL to your backend's file path
        setClientImages(imageUrls);
      } catch (error) {
        console.error("Error fetching logos:", error);
        setError("Failed to load logos.");

        toast.error("Failed to load logos. Please try again later.");
      }
    };

    fetchLogos();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    email: "",
    budget: "",
    giftsNeeded: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

      // Reset form after successful submission
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
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form.");
    }
  };

  const categories = [
    {
      title: "Corporate Gifting",
      image: corporategifting,
    },
    {
      title: "Stationery",
      image: stationery,
    },
    {
      title: "Electronics",
      image: electronics,
    },
  ];

  const products = [
    { id: 1, title: "Product 1", image: Book },
    { id: 2, title: "Product 2", image: Book },
    { id: 3, title: "Product 3", image: Book },
    { id: 4, title: "Product 4", image: Book },
    { id: 5, title: "Product 5", image: Book },
    { id: 6, title: "Product 6", image: Book },
  ];

  return (
    <>
      {/* HOME SECTION  */}
      <div className="homepage" id="home"></div>

      <div className="popular-categories">
        <h1 className="popular-categories__title">Popular Categories</h1>
        <div className="popular-categories__grid">
          {categories.map((category, index) => (
            <div className="popular-categories__item" key={index}>
              <img
                src={category.image}
                alt={category.title}
                className="popular-categories__image"
              />
              <div className="popular-categories__overlay">
                <span className="popular-categories__text">
                  {category.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="best-selling-products">
        <h1 className="best-selling-products__title">Best Selling Products</h1>
        <div className="best-selling-products__grid">
          {products.map((product) => (
            <div className="best-selling-products__card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="best-selling-products__image"
              />
              <p className="best-selling-products__name">{product.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <div className="about-us">
          <div className="about-content">
            <h1 className="about-title">Welcome to Imprints INC</h1>
            <h2 className="about-subtitle">Having 10 Years of Experience</h2>
            <p className="about-description">
              Imprints INC is engaged in the business of corporate gifting,
              known for supplying unbeatable business promotional products that
              have made an indelible impact across industry verticals. Our
              commitment to excellence & passion for quality products has shown
              us the way to growth & prosperity. Our huge range of products
              includes stationery items, corporate gifts, clothing, signages,
              electronics, etc.
            </p>
          </div>
        </div>
      </div>

      <div className="clients">
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
      <div className="whyus">
        <h1 className="heading1">Why Choose Us</h1>
        <div className="pointers">
          <div className="sec">
            <MdDesignServices className="icon" />
            <h2>Unmatched Customization</h2>
          </div>
          <div className="sec">
            <IoRibbon className="icon" />
            <h2>High-Quality Products</h2>
          </div>
          <div className="sec">
            <FaTruckFast className="icon" />
            <h2>Timely & PAN India Delivery</h2>
          </div>
          <div className="sec">
            <RiDiscountPercentFill className="icon" />
            <h2>Discount on Bulk Orders</h2>
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
