import { Link } from "react-router-dom";
import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addFavorite,
  removeFavorite
} from "../features/favoriteSlice";

function AssetCard({ asset, onDelete }) {

  const dispatch = useDispatch();

  const favorites =
    useSelector(
      (state) =>
        state.favorites.items
    );

  const isFavorite =
    favorites.some(
      (item) =>
        item.id === asset.id
    );

  const handleFavorite = () => {

    if (isFavorite) {

      dispatch(
        removeFavorite(asset.id)
      );

    } else {

      dispatch(
        addFavorite(asset)
      );

    }

  };

  return (
    <div className="asset-card">

    <div>
        <img
      width='100%'
        src={asset.image}
        alt={asset.name}
      />
    </div>

      <h2>{asset.name}</h2>

      <p>
        <strong>Category:</strong>
        {" "}
        {asset.category}
      </p>

      <p>
        <strong>Brand:</strong>
        {" "}
        {asset.brand}
      </p>

      <p>
        <strong>Status:</strong>
        {" "}
        {asset.status}
      </p>

      <div className="card-buttons">

        <Link
          to={`/assets/${asset.id}`}
        >
          Details
        </Link>

        <Link
          to={`/edit-asset/${asset.id}`}
        >
          Edit
        </Link>

        <button
          onClick={() =>
            onDelete(asset.id)
          }
        >
          Delete
        </button>

        <button
          onClick={handleFavorite}
        >
          {isFavorite
            ? "Remove Favorite"
            : "Add Favorite"}
        </button>

      </div>

    </div>
  );
}

export default AssetCard;