import React, { useState } from "react";
import {
  RiPlanetLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiPieChartLine,
  RiArrowUpDownLine,
  RiBarChartLine,
  RiAddLine,
  RiFileListLine,
  RiCashLine,
  RiRefund2Line,
  RiUserLine,
  RiLockLine,
  RiMessage3Line,
} from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      // Close all dropdowns if menu is being closed
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (index, e) => {
    e.stopPropagation(); // Prevent click event from closing the menu
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__data">
          <a href="#" className="nav__logo">
            <RiPlanetLine /> Company
          </a>

          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? (
              <RiCloseLine className="nav__icon" />
            ) : (
              <RiMenuLine className="nav__icon" />
            )}
          </div>
        </div>

        <div
          className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
          id="nav-menu"
          onClick={() => setIsMenuOpen(true)} // Ensure menu remains open if clicking inside it
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
                    NoteBooks & Daires
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
            <li className="dropdown__item">
              <div className="nav__link" onClick={(e) => toggleDropdown(1, e)}>
                Stationery <RiArrowDownSLine className="dropdown__arrow" />
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
                    NoteBooks & Daires
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
