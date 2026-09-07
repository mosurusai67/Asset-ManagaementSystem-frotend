import { useSelector } from "react-redux";

function Favorites() {

  const favorites =
    useSelector(
      (state) =>
        state.favorites.items
    );

  return (
    <div className="assets-page">

      <h1>
        Favorite Assets
      </h1>

      {favorites.length === 0 ? (

        <h2>
          No Favorite Assets
        </h2>

      ) : (

        <div className="asset-grid">

          {favorites.map((asset) => (

            <div
              className="asset-card"
              key={asset.id}
            >

              <img
                src={asset.image}
                alt={asset.name}
              />

              <h2>
                {asset.name}
              </h2>

              <p>
                {asset.category}
              </p>

              <p>
                {asset.brand}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;