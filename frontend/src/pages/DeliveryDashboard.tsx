import { Truck, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function DeliveryDashboard() {
  const [activeDelivery, setActiveDelivery] = useState(false);
  const [completedDeliveries, setCompletedDeliveries] = useState(6);

  const handleAcceptDelivery = () => {
      // In a real app, this would call an API to assign the delivery
      setActiveDelivery(true);
  };

  const handleCompleteDelivery = () => {
      // In a real app, this would call an API to mark as completed
      setActiveDelivery(false);
      setCompletedDeliveries(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 flex items-center">
            <Truck className="w-8 h-8 mr-3 text-blue-600" />
            Delivery Partner Dashboard
        </h1>
        <p className="text-slate-600 mt-2">Manage your pickups and deliveries in your local area.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Status</p>
          <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <p className="font-bold text-slate-800">Available for Delivery</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Today's Earnings</p>
          <p className="text-2xl font-bold text-green-600">₹450</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Completed Deliveries</p>
          <p className="text-2xl font-bold text-slate-800">{completedDeliveries}</p>
        </div>
      </div>

      {!activeDelivery ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Available Requests Near You</h2>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">New</span>
            </div>
            <div className="p-4 space-y-4">
            <div className="border border-blue-100 rounded-lg p-4 bg-blue-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <p className="font-bold text-slate-800 mb-1">Order #1029 • 5 kg Tomatoes</p>
                    <div className="flex items-start gap-2 text-sm text-slate-600 mb-1">
                        <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Pickup:</strong> Velmurugan Farm (2 km away)</p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p><strong>Dropoff:</strong> 124 Main St, Saravanampatti (4.5 km total)</p>
                    </div>
                </div>
                <div className="flex flex-col items-end w-full md:w-auto">
                    <p className="font-bold text-green-700 text-lg mb-2">Earn ₹45</p>
                    <button onClick={handleAcceptDelivery} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Accept Delivery
                    </button>
                </div>
            </div>
            </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-green-50 p-4 border-b border-green-200">
            <h2 className="text-lg font-bold text-green-800">Active Delivery In Progress</h2>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
                <MapPin className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-800">Order #1029</h3>
                <p className="text-slate-600 mb-6">Dropoff at: 124 Main St, Saravanampatti</p>
                <button onClick={handleCompleteDelivery} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors">
                    Mark as Delivered & Collect ₹45
                </button>
            </div>
        </div>
      )}

      {!activeDelivery && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Active Delivery</h2>
            </div>
            <div className="p-6 text-center text-slate-500">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>You have no active deliveries right now.</p>
            </div>
        </div>
      )}
    </div>
  );
}
