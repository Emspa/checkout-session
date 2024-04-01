import { useState } from "react";
import "./LoginPage.css";
import "../models/ILoginProps"
import { useFormState } from "../models/UseFormState";
import { RegisterForm } from "./RegisterForm";
import { Loginform } from "./LoginForm";

export const LoginPage = () => {
    const { email, setEmail, password, setPassword, error, setError } = useFormState();
    const [showRegisterForm, setShowRegisterForm] = useState(false);

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
            <Loginform 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              handleSubmit={handleLogin} 
              error={error} 
            />
            <button onClick={() => setShowRegisterForm(false)}>Need an account? Register</button>
          </>
        ) : (
          <>
            <RegisterForm 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              handleSubmit={handleRegister} 
              error={error} 
            />
            <button onClick={() => setShowRegisterForm(true)}>Already have an account? Login</button>
          </>
        )}
      
            </div>
        </div>
    );
};


// {!showRegisterForm ? (
//     <>
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//             <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit">Log in</button>
//         </form>
//         <button onClick={() => setShowRegisterForm(true)}>Create account</button>
//         <h2>Forgot password?</h2>
//     </>
// ) : (
//     <>
//         <h1>Register</h1>
//         <form onSubmit={handleRegister}>
//             <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit">Register</button>
//         </form>
//         <button onClick={() => setShowRegisterForm(false)}>Back to login</button>
//     </>
// )}
// {error && <div className="error">{error}</div>}