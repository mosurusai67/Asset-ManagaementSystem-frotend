import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/apilink";

function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);

  useEffect(() => {
    api.get(`/assets/${id}`)
      .then((response) => {
        setAsset(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/assets/${id}`, {
      ...asset,
      quantity: Number(asset.quantity),
      price: Number(asset.price)
    })
      .then(() => {
        alert("Asset Updated Successfully!");
        navigate("/assets");
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating asset");
      });
  };

  if (!asset) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="form-page">
      <h1>Edit Asset</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={asset.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          value={asset.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
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
          value={asset.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          value={asset.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          value={asset.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={asset.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Asset
        </button>

      </form>
    </div>
  );
}

export default EditAsset;