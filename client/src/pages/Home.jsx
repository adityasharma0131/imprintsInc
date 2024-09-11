import React from "react";
import corporategifting from "../assets/Corporategifting.png";
import stationery from "../assets/Stationery.png";
import electronics from "../assets/Electronics.png";
import Book from "../assets/Book.png";

const Home = () => {
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
    </>
  );
};

export default Home;
