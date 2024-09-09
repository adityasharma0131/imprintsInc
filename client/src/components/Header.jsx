import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiPlanetLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import logo from "../assets/imprintslogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setOpenDropdown(null); // Close all dropdowns when the menu is toggled off
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown on click
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
    closeDropdown();
  };

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
            {/* DROPDOWN 1 */}
            <li className="dropdown__item">
              <div className="nav__link">
                <Link
                  to="/categories/Stationery"
                  className="nav__link--plain"
                  onClick={handleLinkClick}
                >
                  Stationery
                </Link>
                <RiArrowDownSLine
                  className="dropdown__arrow"
                  onClick={(e) => toggleDropdown(1)}
                />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 1 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Notebooks & Diaries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Premium Pens
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Desk Organizers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Daily Office Material
                  </a>
                </li>
              </ul>
            </li>

            {/* Repeat similar structure for other dropdowns */}
            {/* DROPDOWN 2 */}
            <li className="dropdown__item">
              <div className="nav__link">
                <Link
                  to="/categories/Corporate-Gifts"
                  className="nav__link--plain"
                  onClick={handleLinkClick}
                >
                  Corporate Gifts
                </Link>
                <RiArrowDownSLine
                  className="dropdown__arrow"
                  onClick={(e) => toggleDropdown(2)}
                />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 2 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Paper Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    File Folders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Sticky Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Binders
                  </a>
                </li>
              </ul>
            </li>

            {/* Repeat for DROPDOWN 3, 4, and 5, and other links */}
            {/* DROPDOWN 3 */}
            <li className="dropdown__item">
              <div className="nav__link">
                <Link
                  to="/categories/Apparels"
                  className="nav__link--plain"
                  onClick={handleLinkClick}
                >
                  Apparels
                </Link>
                <RiArrowDownSLine
                  className="dropdown__arrow"
                  onClick={(e) => toggleDropdown(3)}
                />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 3 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Paper Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    File Folders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Sticky Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Binders
                  </a>
                </li>
              </ul>
            </li>

            {/* DROPDOWN 4 */}
            <li className="dropdown__item">
              <div className="nav__link">
                <Link
                  to="/categories/Signages"
                  className="nav__link--plain"
                  onClick={handleLinkClick}
                >
                  Signages
                </Link>
                <RiArrowDownSLine
                  className="dropdown__arrow"
                  onClick={(e) => toggleDropdown(4)}
                />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 4 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Paper Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    File Folders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Sticky Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Binders
                  </a>
                </li>
              </ul>
            </li>

            {/* DROPDOWN 5 */}
            <li className="dropdown__item">
              <div className="nav__link">
                <Link
                  to="/categories/Electronics"
                  className="nav__link--plain"
                  onClick={handleLinkClick}
                >
                  Electronics
                </Link>
                <RiArrowDownSLine
                  className="dropdown__arrow"
                  onClick={(e) => toggleDropdown(5)}
                />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 5 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Paper Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    File Folders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Sticky Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={handleLinkClick}
                  >
                    Binders
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className="nav__link" onClick={handleLinkClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
