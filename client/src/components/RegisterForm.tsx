/** @format */

import { ILoginProps } from "../models/ILoginProps";

export const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
}: ILoginProps) => {
  return (
    <div>
      <h1>Register</h1>
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
        <button type="submit">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
