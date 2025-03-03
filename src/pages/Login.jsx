import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../css/auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure correct headers
      );

      // ✅ Store token and user data properly
      localStorage.setItem("token", response.data.token);
      login(response.data.user, response.data.token);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error?.response?.data || error.message);
      setError(error?.response?.data?.error || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <img src="./src/assets/login.jpg" alt="login" />
      <div className="form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
    </div>
  );
};

export default Login;
