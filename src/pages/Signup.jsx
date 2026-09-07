import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import api from "../services/api";
import api from "../services/api";
function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSignup = (e) => {

    e.preventDefault();

    api.get("/users")
      .then((response) => {

        const existingUser =
          response.data.find(
            (user) =>
              user.email === formData.email
          );

        if (existingUser) {

          alert("Email already exists!");

          return;
        }

        api.post("/users", formData)
          .then(() => {

            alert(
              "Signup Successful! Please Login."
            );

            navigate("/login");

          })
          .catch((error) => {
            console.log(error);
          });

      });

  };

  return (
    <div className="form-page">

      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Signup
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

export default Signup;