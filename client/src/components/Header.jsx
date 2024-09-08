import React, { useState } from "react";
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

  const toggleDropdown = (index, e) => {
    e.stopPropagation(); // Prevent event from closing the menu
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__data">
          <img className="nav__logo" src={logo} alt="Logo" />

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

        <div
          className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
          onClick={() => setIsMenuOpen(true)} // Keep menu open if clicking inside it
        >
          <ul className="nav__list">
            {/* DROPDOWN 1 */}
            <li className="dropdown__item">
              <div className="nav__link" onClick={(e) => toggleDropdown(1, e)}>
                Stationery <RiArrowDownSLine className="dropdown__arrow" />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 1 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Notebooks & Diaries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Premium Pens
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Desk Organizers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Daily Office Material
                  </a>
                </li>
              </ul>
            </li>

            {/* DROPDOWN 2 */}
            <li className="dropdown__item">
              <div className="nav__link" onClick={(e) => toggleDropdown(2, e)}>
                Office Supplies <RiArrowDownSLine className="dropdown__arrow" />
              </div>
              <ul
                className={`dropdown__menu ${openDropdown === 2 ? "show" : ""}`}
              >
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Paper Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    File Folders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Sticky Notes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown__link"
                    onClick={closeDropdown}
                  >
                    Binders
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className="nav__link" onClick={closeDropdown}>
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
