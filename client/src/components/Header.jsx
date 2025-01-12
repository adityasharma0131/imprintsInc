import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import logo from "/assets/imprintslogo.png";
import { RiArrowRightUpLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`header ${scrollDirection === "down" ? "hide" : ""}`}
      id="header"
    >
      <nav className="nav container">
        <HashLink to="/">
          <img className="nav__logo" src={logo} alt="Logo" />
        </HashLink>

        <div
          className={`nav__menu ${menuOpen ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            {[
              { name: "Home", id: "home" },
              { name: "Our Categories", id: "categories" },
              { name: "Our Clients", id: "clients" },
              { name: "About Us", id: "about" },
              { name: "Contact for Bulk Orders", id: "contact" },
            ].map((item, index) => (
              <li className="nav__item" key={index}>
                <HashLink
                  smooth
                  className="nav__link"
                  to={`/#${item.id}`}
                  onClick={handleClose}
                >
                  <RiArrowRightUpLine />
                  <span>{item.name}</span>
                </HashLink>
              </li>
            ))}
          </ul>

          <div className="nav__close" id="nav-close" onClick={handleClose}>
            <RiCloseLine />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={handleToggle}>
          <RiMenuLine />
        </div>
      </nav>
    </header>
  );
};

export default Header;
