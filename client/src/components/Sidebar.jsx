import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import logo from "/assets/imprintslogo.png";
import { AiFillProduct } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { RiContactsLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiChevronRight, BiLogOutCircle } from "react-icons/bi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  // Set active link based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = links.find((link) => link.link === currentPath);
    if (activeItem) {
      setActiveLink(activeItem.name);
    }
  }, [location.pathname]);

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle link click and close sidebar
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsExpanded(false); // Automatically collapse after a click
  };

  // Sidebar links
  const links = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard className="sidebar__icon" />,
      link: "/dashboard",
    },
    {
      name: "Products",
      icon: <AiFillProduct className="sidebar__icon" />,
      link: "/product-operation",
    },
    {
      name: "Gallery",
      icon: <RiGalleryFill className="sidebar__icon" />,
      link: "/gallery-operation",
    },
    {
      name: "Users",
      icon: <FiUsers className="sidebar__icon" />,
      link: "/user-operation",
    },
    {
      name: "Contact Us",
      icon: <RiContactsLine className="sidebar__icon" />,
      link: "/contact-operation",
    },
    {
      name: "Socials",
      icon: <IoShareSocialOutline className="sidebar__icon" />,
      link: "/social-operation",
    },
  ];

  return (
    <div
      className={`sidebar ${isExpanded ? "sidebar--expanded" : ""}`}
      id="navbar"
    >
      <nav className="sidebar__nav">
        <div>
          <Link
            to="/"
            className="sidebar__logo"
            aria-label="M.K Hydraulics Home"
          >
            <img src={logo} alt="Logo" className="sidebar__logo-icon" />
            {isExpanded && (
              <span className="sidebar__logo-text">Imprints INC</span>
            )}
          </Link>

          <button
            className={`sidebar__toggle ${isExpanded ? "rotate" : ""}`}
            id="nav-toggle"
            onClick={toggleSidebar}
            aria-expanded={isExpanded}
            aria-controls="navbar"
          >
            <BiChevronRight />
          </button>

          <ul className="sidebar__list" role="menu">
            {links.map((link) => (
              <li key={link.name} role="menuitem">
                <Link
                  to={link.link}
                  className={`sidebar__link ${
                    activeLink === link.name ? "sidebar__link--active" : ""
                  }`}
                  onClick={() => handleLinkClick(link.name)}
                  aria-current={activeLink === link.name ? "page" : undefined}
                >
                  {link.icon}
                  {isExpanded && (
                    <span className="sidebar__text">{link.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          className="sidebar__link sidebar__link--logout"
          aria-label="Logout"
          onClick={() => navigate("/logout")}
        >
          <BiLogOutCircle className="sidebar__icon" />
          {isExpanded && <span className="sidebar__text">Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
