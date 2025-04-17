import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const Login= ({ setUserRole }) => {  // ✅ Receive setUserRole
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setmessage]=useState("")
  

 

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
  
      if (res.data.role === "admin") {
        navigate("/adminpage"); // Redirect admin
      } else {
        navigate("/homepage"); // Redirect user to home
      }
    } catch (error) {
      console.error("Login failed", error.response.data);
      setmessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  
  

  return (
<div className="login-wrapper">
  <div className="login-container">
    <div className="login-image-side">
      {/* Optional: Add image or branding here */}
    </div>

    <div className="login-form-side">
      <form onSubmit={handleSubmit}>
        <div className="login-form-card">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />

          <button type="submit" className="login-button">Login</button>

          {message && <p className="login-link-text1">{message}</p>}

          <p className="login-link-text">
            Don't have an account? <Link to='/register'>Register here</Link>
          </p>
          <p className="login-link-text">
            Login As A Tourister <Link to='/touristlogin'>Register here</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
