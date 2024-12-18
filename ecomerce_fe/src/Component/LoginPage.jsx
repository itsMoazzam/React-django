import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To redirect after login

  // Hardcoded login credentials (for demonstration purposes)
  const validUsername = "user";
  const validPassword = "password123";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    if (username === validUsername && password === validPassword) {
      // Redirect to Product List page after successful login
      navigate("/page1"); // Redirect to Product List page (or any other page)
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="lfrom" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="lforminpt"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="lforminpt"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button className="formbtn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
