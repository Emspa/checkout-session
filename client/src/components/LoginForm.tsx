/** @format */

import { ILoginProps } from "../models/ILoginProps";
import "./LoginPage.css"

export const Loginform = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
}: ILoginProps) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
