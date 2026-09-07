import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  isLoggedIn,
  logout
} from "../utils/auth";

function Navbar() {

  const navigate = useNavigate();

  const loggedIn =
    isLoggedIn();

  const favoriteCount =
    useSelector(
      (state) =>
        state.favorites.items.length
    );

  const handleLogout = () => {

    logout();

    alert("Logout Successful!");

    navigate("/login");

    window.location.reload();

  };

  return (
    <nav className="navbar">

      <h2>
        Asset Manager
      </h2>

      <div>

        <Link to="/">
          Home
        </Link>

        {loggedIn ? (

          <>

            <Link to="/assets">
              Assets
            </Link>

            <Link to="/add-asset">
              Add Asset
            </Link>

            <Link to="/favorites">
              Favorites ({favoriteCount})
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;