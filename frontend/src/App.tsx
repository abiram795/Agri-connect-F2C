import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerHome from "./pages/ConsumerHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/consumer" element={<ConsumerHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
