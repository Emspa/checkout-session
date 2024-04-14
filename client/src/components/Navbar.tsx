/** @format */

import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul className="navlinks">
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({ color: isActive ? "grey" : "black" })}
          >
            Products
          </NavLink>
        </li>
        <li >
          {user ? <LogoutButton /> : <NavLink to="/login">Login</NavLink>}
        </li>
        <li>
          <NavLink to="/cart">
            <img className="cart-img" src="shopping-bag.png" alt="Cart" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
