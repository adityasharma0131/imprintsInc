import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; // For notifications
import corporategifting from "/assets/Corporategifting.png";
import stationery from "/assets/Stationery.png";
import electronics from "/assets/Electronics.png";
import { HashLink as Link } from "react-router-hash-link";

import { MdDesignServices } from "react-icons/md";
import { IoRibbon } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";

const Home = () => {
  const [clientImages, setClientImages] = useState([]);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State for loading
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

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/latest/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Store the fetched products
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLatestProducts(); // Call the function to fetch latest products
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
      link: "/categories/Corporate Gift",
    },
    {
      title: "Stationery",
      image: stationery,
      link: "/categories/Stationery",
    },
    {
      title: "Electronics",
      image: electronics,
      link: "/categories/Electronics",
    },
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
              <a href={category.link} className="popular-categories__link">
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
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="best-selling-products">
        <h1 className="best-selling-products__title">Best Selling Products</h1>
        <div className="best-selling-products__grid">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`} // Link to the product page using product ID
              key={product._id}
              className="best-selling-products__card"
            >
              <img
                src={
                  Array.isArray(product.images) && product.images.length > 0
                    ? `${
                        import.meta.env.VITE_API_URL
                      }/${product.images[0].replace(/\\/g, "/")}`
                    : Book // Use placeholder if no images are available
                }
                alt={product.name}
                className="best-selling-products__image"
              />
              <p className="best-selling-products__name">{product.name}</p>
            </Link>
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
