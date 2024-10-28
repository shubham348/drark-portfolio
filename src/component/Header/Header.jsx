import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

const links = [
  {
    name: "home",
    to: "/",
  },
  {
    name: "work",
    to: "/work",
  },
  {
    name: "about-me",
    to: "/about-me",
  },
  {
    name: "contacts",
    to: "/contacts",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <div className="header__container">
      <div className="header__section">
        <div class="logo">Shubham</div>
        <input
          className="menu-btn"
          type="checkbox"
          id="menu-btn"
          onChange={toggleMenu}
          checked={menuOpen}
        />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <div
          className={`header__nav-container ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          {links.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `header__navlink ${isActive ? "active" : ""}`
              }
              to={item?.to}
            >
              <span>#</span>
              {item?.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
