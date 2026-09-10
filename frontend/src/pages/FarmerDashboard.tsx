import { Package, TrendingUp, PhoneCall, ImagePlus, Plus, ShieldCheck, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FarmerDashboard() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after some time so it doesn't stay forever if they navigate away and back
      const timer = setTimeout(() => {
          setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center shadow-sm">
           <CheckCircle className="w-5 h-5 mr-2" />
           {successMessage}
        </div>
      )}

      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center">
             Farmer Dashboard
             <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <ShieldCheck className="w-4 h-4 mr-1" /> Verified Farmer
             </span>
          </h1>
          <p className="text-gray-600 mt-2">Manage your farm, inventory, and sales.</p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/farmer/add-product" className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition-colors">
                <Plus className="w-5 h-5 mr-1" /> Add Product
            </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full text-primary"><Package /></div>
          <div>
            <p className="text-sm text-gray-500">Active Products</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full text-accent"><TrendingUp /></div>
          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold">4</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600"><ImagePlus /></div>
          <div>
            <p className="text-sm text-gray-500">AI Quality Check</p>
            <p className="text-2xl font-bold text-blue-600">Scan</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full text-purple-600"><PhoneCall /></div>
          <div>
            <p className="text-sm text-gray-500">IVR Support</p>
            <p className="text-xl font-bold text-purple-600">Call Now</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
         <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex justify-between">
                Your Inventory
                <span className="text-sm text-primary font-normal cursor-pointer hover:underline">View All</span>
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                    <div>
                        <p className="font-bold text-gray-800">Tomato (Local)</p>
                        <p className="text-sm text-gray-500">Available: 5 kg • ₹35/kg</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs mb-1">Farmer Delivery (5km)</span>
                        <p className="text-xs text-green-600 font-medium">AI Verified</p>
                    </div>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                    <div>
                        <p className="font-bold text-gray-800">Onion (Small)</p>
                        <p className="text-sm text-gray-500">Available: 20 kg • ₹40/kg</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs mb-1">Self Pickup</span>
                        <p className="text-xs text-purple-600 font-medium">IVR Added</p>
                    </div>
                </div>
            </div>
         </div>

         <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">IVR Call Logs</h2>
            <div className="space-y-4">
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <PhoneCall className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                        <p className="font-medium text-gray-800">Added Product via IVR</p>
                        <p className="text-sm text-gray-600">Added 20 kg Onion (Small)</p>
                        <p className="text-xs text-gray-400 mt-1">Today, 10:45 AM</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <PhoneCall className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                        <p className="font-medium text-gray-800">Checked Pending Orders</p>
                        <p className="text-sm text-gray-600">IVR confirmed 2 pending orders.</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday, 6:30 PM</p>
                    </div>
                </div>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
          <div className="space-y-4">
             <div className="border-b pb-2">
                <p className="font-medium">Order #1024</p>
                <p className="text-sm text-gray-500">3 kg Tomatoes • ₹105</p>
             </div>
             <div className="border-b pb-2">
                <p className="font-medium">Order #1025</p>
                <p className="text-sm text-gray-500">5 kg Onions • ₹200</p>
             </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border-l-4 border-accent">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Price Recommendation</h2>
          <p className="text-gray-600 mb-2">Based on local demand:</p>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <span className="font-medium">Tomatoes</span>
            <div className="text-right">
              <span className="block text-lg font-bold text-primary">₹35/kg</span>
              <span className="text-xs text-gray-500">Suggested Range: ₹30 - ₹40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
