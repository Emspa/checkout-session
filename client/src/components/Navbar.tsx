import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { useCart } from "../context/CartContext";

export const Navbar = () => {

  const {cart} = useCart()
  return (
    <nav className="navbar">
      <ul className="navlinks">
        <li>
          <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? 'grey' : 'black' })}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" >
            <img className="profile-img" src="profile.png" alt="Login" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <img  className="cart-img" src="shopping-bag.png" alt="Cart" />
      
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


