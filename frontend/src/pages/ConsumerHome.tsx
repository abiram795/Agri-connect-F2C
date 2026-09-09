import { Search, MapPin, Star } from "lucide-react";

export default function ConsumerHome() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Fresh & Local</h1>
          <p className="text-gray-600">Buy directly from farmers near you.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin size={16} />
          <span>Current Location: Madurai (5km radius)</span>
        </div>
      </header>

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

              <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800 mb-4">
                <span className="font-semibold block">94% AI Match</span>
                Required quantity available, fair price.
              </div>

              <button className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-lg transition-colors">
                View Shop
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
