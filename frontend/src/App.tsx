import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerHome from "./pages/ConsumerHome";
import FarmerSelection from "./pages/FarmerSelection";
import FarmerRegister from "./pages/FarmerRegister";
import FarmerAddProduct from "./pages/FarmerAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/farmer-select" element={<FarmerSelection />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/add-product" element={<FarmerAddProduct />} />
        <Route path="/consumer" element={<ConsumerHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/delivery" element={<DeliveryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
