import { Package, TrendingUp, PhoneCall, ImagePlus } from "lucide-react";

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Farmer Dashboard</h1>
        <p className="text-gray-600">Manage your farm, inventory, and sales.</p>
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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-xl shadow-sm">
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
