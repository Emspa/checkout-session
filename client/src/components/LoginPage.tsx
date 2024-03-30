/** @format */

import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <div className="wrapped">
      <div className="login-container">
        <h1>Login in</h1>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button>Log in</button>
        <div className="register-container">
          <h2>Create account</h2>
          <h2>Forgot password</h2>
        </div>
      </div>
    </div>
  );
};
