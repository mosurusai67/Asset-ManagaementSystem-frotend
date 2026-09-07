import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <h1>Asset Management System</h1>

      <p>
        Manage and track all your company assets in one place.
      </p>

      <Link
        className="home-btn"
        to="/assets"
      >
        View All Assets
      </Link>

    </div>
  );
}

export default Home;