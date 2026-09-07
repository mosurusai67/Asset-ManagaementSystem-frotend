import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../services/apilink";

function AssetDetails() {

  const { id } = useParams();

  const [asset, setAsset] = useState(null);

  useEffect(() => {

    api.get(`/assets/${id}`)
      .then((response) => {
        setAsset(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  if (!asset) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="details-page">

      <img
        src={asset.image}
        alt={asset.name}
      />

      <div className="details-content">

        <h1>{asset.name}</h1>

        <p>
          <strong>Category:</strong> {asset.category}
        </p>

        <p>
          <strong>Brand:</strong> {asset.brand}
        </p>

        <p>
          <strong>Status:</strong> {asset.status}
        </p>

        <p>
          <strong>Quantity:</strong> {asset.quantity}
        </p>

        <p>
          <strong>Price:</strong> ₹{asset.price}
        </p>

        <p>
          <strong>Description:</strong>
          {" "}
          {asset.description}
        </p>

        <Link
          className="back-btn"
          to="/assets"
        >
          Back to Assets
        </Link>

      </div>

    </div>
  );
}

export default AssetDetails;