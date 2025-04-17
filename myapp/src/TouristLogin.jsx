import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";

const TouristLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/tourist/login", {
        email,
        password,
      });

      const { token, role, status } = res.data;
      

if (status !== "approved") {
  return res.status(401).json({ message: "Your account is not approved yet." });
}


      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setMessage("Login successful!");
      navigate("/tourist-dashboard"); // redirect to tourist dashboard
    } catch (err) {
      console.error("Login failed:", err);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="tourist-login-page">
      <div className="tourist-login-card">
        <h2 className="tourist-login-title">Tourist Vehicle Owner Login</h2>
        <form onSubmit={handleLogin} className="tourist-login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="tourist-login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="tourist-login-input"
          />
          <button type="submit" className="tourist-login-button">Login</button>
        </form>
        <p className="tourist-login-link">
          Don't have an account? <Link to='/touristreg'>Register here</Link>
        </p>
        {message && <p className="tourist-login-message">{message}</p>}
      </div>
    </div>
  );
};

export default TouristLogin;
