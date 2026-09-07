import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddAsset() {
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    name: "",
    category: "",
    brand: "",
    status: "Available",
    quantity: "",
    price: "",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/assets", {
      ...asset,
      quantity: Number(asset.quantity),
      price: Number(asset.price)
    })
      .then(() => {
        alert("Asset Added Successfully!");
        navigate("/assets");
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding asset");
      });
  };

  return (
    <div className="form-page">
      <h1>Add New Asset</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={asset.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={asset.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={asset.brand}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={asset.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={asset.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={asset.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={asset.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={asset.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Asset
        </button>

      </form>
    </div>
  );
}

export default AddAsset;