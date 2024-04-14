/** @format */

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "./Layout.css";
import { CartProvider } from "../context/CartContext";
import { IUserContext, UserContext } from "../context/UserContext";
import { useState } from "react";
import { User } from "../models/User";

export const Layout = () => {
  const [user, setUser] = useState<IUserContext>({
    user: null,
    setUser: () => {},
  });
  user.setUser = (newUser: User | null = null) => {
    setUser({ ...user, user: newUser });
  };

  
  return (
    <>
      {" "}
      <UserContext.Provider value={user}>
        <CartProvider>
          <header className="header">
            <Navbar />
          </header>
          <main>
            <Outlet />
          </main>
        </CartProvider>
      </UserContext.Provider>
    </>
  );
};
