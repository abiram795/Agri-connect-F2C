import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FarmerRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get("fullName"),
          phone: formData.get("mobileNumber"),
          role: "farmer",
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate("/farmer", { state: { message: "Welcome to AgriConnect!" } });
    } catch (error) {
      console.error('Error registering farmer:', error);
      setErrorMsg("Registration failed. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-card p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-primary mb-2">Farmer Registration</h1>
        <p className="text-gray-600 mb-8">Join AgriConnect to sell directly to consumers.</p>

        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl border border-red-200">
             {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required name="fullName" type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input required name="mobileNumber" type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none" placeholder="10-digit number" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Village / Town</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your village" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your district" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none bg-white">
                <option value="">Select size...</option>
                <option value="small">Less than 2 acres</option>
                <option value="medium">2 - 5 acres</option>
                <option value="large">More than 5 acres</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none bg-white">
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">What do you usually grow? (Select multiple)</label>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Vegetables', 'Fruits', 'Grains', 'Millets', 'Spices', 'Other'].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 bg-gray-50 p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                        <span className="text-sm">{cat}</span>
                    </label>
                ))}
             </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link to="/farmer-select" className="text-gray-500 hover:text-gray-800 font-medium">Cancel</Link>
            <button type="submit" disabled={isLoading} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Registering..." : "Register Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
