import { Routes, Route } from "react-router-dom";

import Assets from "../pages/Assets";
import AssetDetails from "../pages/AssetDetails";
import AddAsset from "../pages/AddAsset";
import EditAsset from "../pages/EditAsset";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home ";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/assets/:id" element={<AssetDetails />} />
      <Route path="/add-asset" element={<AddAsset />} />
      <Route path="/edit-asset/:id" element={<EditAsset />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


  
    </Routes>
  );
}

export default AppRoutes;