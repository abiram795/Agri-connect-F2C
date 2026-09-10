import { Search, MapPin, Star, AlertTriangle, Users } from "lucide-react";
import { useState } from "react";

export default function ConsumerHome() {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBulkSubmit = async () => {
    setIsSubmittingBulk(true);
    setErrorMessage("");
    try {
      const response = await fetch('/api/bulk-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consumer_id: "00000000-0000-0000-0000-000000000001", // Will use authenticated user ID
          reason: "Community Event", // Value would come from form state
          required_quantity: 50,
          required_date: "2026-09-15",
          delivery_location: "Madurai"
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowBulkModal(false);
      setSuccessMessage("Bulk request submitted for admin review successfully.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error('Error submitting bulk request:', error);
      setErrorMessage("Failed to submit request. Please try again.");
    } finally {
      setIsSubmittingBulk(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative">
      <header className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Fresh & Local</h1>
          <p className="text-gray-600">Buy directly from farmers near you.</p>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <MapPin size={16} />
                <span>Current Location: Madurai (5km radius)</span>
            </div>
        </div>
      </header>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-sm">
        <div className="flex items-start gap-3 text-blue-900">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
                <p className="font-semibold text-sm">Direct Farmer Policy Active</p>
                <p className="text-xs mt-1">To prevent middlemen hoarding, normal purchases are limited to 10 kg per category per day.</p>
            </div>
        </div>
        <button onClick={() => setShowBulkModal(true)} className="flex items-center text-sm font-medium bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap">
            <Users className="w-4 h-4 mr-2" /> Request Larger Quantity
        </button>
      </div>

      {successMessage && (
        <div className="mb-8 bg-green-50 text-green-800 p-4 rounded-xl border border-green-200">
           {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-8 bg-red-50 text-red-800 p-4 rounded-xl border border-red-200">
           {errorMessage}
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="AI Search: 'I need 3 kg tomatoes near me at a fair price...'"
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-primary/20 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Nearby Recommended Farmers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Velmurugan Farm</h3>
                  <p className="text-sm text-gray-500">2.3 km away</p>
                </div>
                <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
                  <Star size={14} className="fill-current" />
                  <span>4.8</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>Fresh Tomatoes</span>
                  <span className="font-bold">₹35/kg</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>Onions</span>
                  <span className="font-bold">₹40/kg</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800 mb-4 border border-green-100">
                <span className="font-semibold block flex items-center">✨ 94% AI Match</span>
                <ul className="mt-1 space-y-0.5 text-xs">
                    <li>✓ 2.3 km away</li>
                    <li>✓ Required quantity available</li>
                    <li>✓ Verified Farmer Profile</li>
                    <li>✓ Farmer Delivery Available</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 mb-4 text-center border border-gray-200">
                  <span className="block font-semibold text-gray-800 mb-1">Transparent Pricing</span>
                  You pay: ₹35 | Farmer gets: ₹32 | Delivery: ₹3
              </div>

              <button onClick={async () => {
                try {
                  const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      consumer_id: "00000000-0000-0000-0000-000000000001",
                      total_amount: 35,
                      items: [{
                        product_id: "00000000-0000-0000-0000-000000000003",
                        quantity: 3,
                        price_at_time: 35
                      }]
                    })
                  });
                  if (!response.ok) {
                    const err = await response.json();
                    setErrorMessage(err.detail || "Failed to place order.");
                  } else {
                    setSuccessMessage("Order placed successfully!");
                    setTimeout(() => setSuccessMessage(""), 5000);
                  }
                } catch (e) {
                   setErrorMessage("Failed to place order due to network error.");
                }
              }} className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-lg transition-colors shadow-sm">
                Buy 3kg Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {showBulkModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Community / Bulk Request</h2>
                  <p className="text-sm text-gray-600 mb-6">Need more than 10kg? Submit a request for verification.</p>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Bulk Order</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg">
                              <option>Community Event / Function</option>
                              <option>Hostel / School</option>
                              <option>Temple / Local Organization</option>
                              <option>Other</option>
                          </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                              <input type="text" placeholder="e.g. Tomato" className="w-full p-2 border border-gray-300 rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
                              <input type="number" placeholder="50" className="w-full p-2 border border-gray-300 rounded-lg" />
                          </div>
                      </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                      <button onClick={() => setShowBulkModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                      <button onClick={handleBulkSubmit} disabled={isSubmittingBulk} className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-secondary disabled:opacity-50">
                        {isSubmittingBulk ? "Submitting..." : "Submit Request"}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
