/** @format */

import { useContext, useState } from "react";
import "./LoginPage.css";
import "../models/ILoginProps";
import { useFormState } from "../models/UseFormState";
import { RegisterForm } from "./RegisterForm";
import { Loginform } from "./LoginForm";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { email, setEmail, password, setPassword, error, setError } =
    useFormState();
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("hej", data);

      if (response.ok) {
        setUser(data);
        navigate('/'); 
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Login failed.");
        return;
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Registration failed.");
        return;
      }

      setShowRegisterForm(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="wrapped">
      <div className="login-container">
        {showRegisterForm ? (
          <>
          <h1 className="title">Log in</h1>
            <Loginform
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleLogin}
              error={error}
            />
            <button className="btn" onClick={() => setShowRegisterForm(false)}>
              Need an account? Register
            </button>
          </>
        ) : (
          <>
           <h1 className="title">Register</h1>
            <RegisterForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleRegister}
              error={error}
            />
            <button className="btn" onClick={() => setShowRegisterForm(true)}>
              Already have an account? Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
