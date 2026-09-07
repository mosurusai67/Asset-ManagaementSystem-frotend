import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/apilink";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Check all fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check existing user
    api.get("/users")
      .then((response) => {
        const existingUser = response.data.find(
          (user) => user.email === formData.email
        );

        if (existingUser) {
          alert("Email already exists!");
          return;
        }

        // Register new user
        api.post("/users", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
          .then(() => {
            alert("Registration Successful!");

            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
            alert("Registration failed!");
          });
      })
      .catch((error) => {
        console.log(error);
        alert("Server error!");
      });
  };

  return (
    <div className="form-page">
      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;