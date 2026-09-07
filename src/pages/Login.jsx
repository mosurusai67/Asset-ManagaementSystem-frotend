import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    api.get("/users")
      .then((response) => {

        const user = response.data.find(
          (item) =>
            item.email === email &&
            item.password === password
        );

        if (user) {

          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );

          alert("Login Successful!");

          navigate("/assets");

          window.location.reload();

        } else {

          alert("Invalid Email or Password");

        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-page">

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          Signup
        </Link>
      </p>

    </div>
  );
}

export default Login;