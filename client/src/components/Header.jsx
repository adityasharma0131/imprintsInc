import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import {
  RiPlanetLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "/assets/imprintslogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setOpenDropdown(null); // Close all dropdowns when the menu is toggled off
    }
  };

  // Function to toggle specific dropdowns
  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown on click
  };

  // Function to close dropdowns
  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
    closeDropdown();
  };

  // Fetch categories and subcategories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__data">
          <Link to="/">
            <img className="nav__logo" src={logo} alt="Logo" />
          </Link>

          <div
            className="nav__toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <RiCloseLine className="nav__icon" />
            ) : (
              <RiMenuLine className="nav__icon" />
            )}
          </div>
        </div>

        <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}>
          <ul className="nav__list">
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category, index) => (
                <li className="dropdown__item" key={category._id}>
                  <div className="nav__link">
                    <Link
                      to={`/categories/${category.name}`}
                      className="nav__link--plain"
                      onClick={handleLinkClick}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories.length > 0 && (
                      <RiArrowDownSLine
                        className="dropdown__arrow"
                        onClick={() => toggleDropdown(index)}
                      />
                    )}
                  </div>
                  {category.subcategories.length > 0 && (
                    <ul
                      className={`dropdown__menu ${
                        openDropdown === index ? "show" : ""
                      }`}
                    >
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={`/category/${category.name}/${subcategory}`}
                            className="dropdown__link"
                            onClick={handleLinkClick}
                          >
                            {subcategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            )}

            {/* Contact Link */}
            <li>
              <Link
                smooth
                to="/#contact"
                className="nav__link"
                onClick={handleLinkClick}
              >
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
