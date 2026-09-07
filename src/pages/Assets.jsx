import { useEffect, useState } from "react";

import api from "../services/Api";
import AssetCard from "../components/AssertCard";
// import AssetCard from "../components/AssetCard.jsx";

function Assets() {

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const getAssets = () => {
    api.get("/assets")
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssets();
  }, []);

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) {
      return;
    }

    api.delete(`/assets/${id}`)
      .then(() => {
        setAssets(
          assets.filter((asset) => asset.id !== id)
        );

        alert("Asset Deleted Successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredAssets = assets.filter((asset) => {

    const matchesSearch =
      asset.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      asset.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(assets.map((asset) => asset.category))
  ];

  return (
    <div className="assets-page">

      <h1>All Assets</h1>

      <div className="search-filter">

        <input
          type="text"
          placeholder="Search asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>
      
{/* <AssetCard/> */}
      <div className="asset-grid">

        {filteredAssets.length > 0 ? (

          filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onDelete={handleDelete}
            />
          ))

        ) : (

          <h2>No Assets Found</h2>

        )}

      </div>

    </div>
  );
}

export default Assets;