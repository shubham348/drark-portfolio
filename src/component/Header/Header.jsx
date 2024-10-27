import React from "react";
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
  return (
    <div className="header__container">
      <div className="header__section">
        <div class="logo">Shubham</div>
        <div className="header__nav-container">
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
