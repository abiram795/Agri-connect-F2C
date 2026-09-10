import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, MapPin, Info, RefreshCw, CheckCircle2 } from "lucide-react";

export default function FarmerAddProduct() {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please allow camera permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setImageSrc(canvasRef.current.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retakePhoto = () => {
    setImageSrc(null);
    startCamera();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!imageSrc) {
        setErrorMsg("Please capture a live photo of your product first.");
        return;
    }
    stopCamera();
    setIsLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: new FormData(e.currentTarget as HTMLFormElement).get("productName"),
          description: "No description", // Defaulting for now
          price: parseFloat(new FormData(e.currentTarget as HTMLFormElement).get("price") as string),
          unit: new FormData(e.currentTarget as HTMLFormElement).get("unit"),
          quantity_available: parseFloat(new FormData(e.currentTarget as HTMLFormElement).get("quantity") as string),
          farmer_id: "00000000-0000-0000-0000-000000000000", // Mock UUID
          delivery_preference: deliveryMethod,
          image_url: imageSrc
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate("/farmer", { state: { message: "Product listed successfully with AI Verification!" } });
    } catch (error) {
      console.error('Error submitting product:', error);
      setErrorMsg("Failed to submit product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-primary">Add New Product</h1>
            <p className="text-gray-600 mt-1">List your produce directly to nearby consumers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {errorMsg && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
               {errorMsg}
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary"/> 1. Product Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required name="productName" type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary/50" placeholder="e.g., Fresh Tomatoes" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required name="category" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary/50 bg-white">
                    <option value="">Select category...</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="millets">Millets / Small Grains</option>
                </select>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
                <input required name="quantity" type="number" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary/50" placeholder="e.g., 50" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select required name="unit" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary/50 bg-white">
                    <option value="kg">Kilograms (kg)</option>
                    <option value="grams">Grams (g)</option>
                    <option value="pieces">Pieces / Count</option>
                    <option value="bunches">Bunches</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹ per unit)</label>
                <input required name="price" type="number" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary/50" placeholder="e.g., 35" />
                </div>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
             <h2 className="text-xl font-semibold text-gray-800 flex items-center"><Camera className="w-5 h-5 mr-2 text-blue-500"/> 2. Live Verification</h2>
             <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>To ensure trust and freshness, you must capture a live photo of your produce now. Gallery uploads are not permitted.</p>
             </div>

             {/* Live Camera Implementation */}
             <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center min-h-[300px] overflow-hidden relative">
                {!stream && !imageSrc && (
                    <button type="button" onClick={startCamera} className="flex flex-col items-center justify-center text-primary hover:text-secondary p-6">
                        <div className="bg-green-100 p-4 rounded-full mb-3"><Camera className="w-8 h-8" /></div>
                        <span className="font-semibold">Open Camera to Verify</span>
                    </button>
                )}

                {stream && !imageSrc && (
                    <div className="w-full flex flex-col items-center">
                        <video ref={videoRef} autoPlay playsInline className="max-w-full rounded-lg shadow-sm mb-4" />
                        <button type="button" onClick={captureImage} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full flex items-center shadow-md">
                            <Camera className="w-5 h-5 mr-2" /> Capture Image
                        </button>
                    </div>
                )}

                {imageSrc && (
                    <div className="w-full flex flex-col items-center">
                        <div className="relative mb-4 inline-block">
                            <img src={imageSrc} alt="Captured product" className="max-w-full max-h-[300px] rounded-lg shadow-sm" />
                            <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full flex items-center text-green-700 font-bold text-sm shadow">
                                <CheckCircle2 className="w-4 h-4 mr-1"/> Captured Live
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={retakePhoto} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full flex items-center">
                                <RefreshCw className="w-5 h-5 mr-2" /> Retake
                            </button>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
             </div>
          </div>

          <div className="border-t pt-8 space-y-6">
             <h2 className="text-xl font-semibold text-gray-800">3. Delivery Preferences</h2>
             <div className="grid md:grid-cols-3 gap-4">
                <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'border-primary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input type="radio" name="delivery" value="pickup" checked={deliveryMethod === 'pickup'} onChange={(e) => setDeliveryMethod(e.target.value)} className="hidden" />
                    <span className="block font-bold text-gray-800 mb-1">Self Pickup</span>
                    <span className="text-sm text-gray-600">Customer comes to your farm.</span>
                </label>
                <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'farmer' ? 'border-primary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input type="radio" name="delivery" value="farmer" checked={deliveryMethod === 'farmer'} onChange={(e) => setDeliveryMethod(e.target.value)} className="hidden" />
                    <span className="block font-bold text-gray-800 mb-1">I will Deliver</span>
                    <span className="text-sm text-gray-600">You deliver to nearby customers.</span>
                </label>
                <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'partner' ? 'border-primary bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input type="radio" name="delivery" value="partner" checked={deliveryMethod === 'partner'} onChange={(e) => setDeliveryMethod(e.target.value)} className="hidden" />
                    <span className="block font-bold text-gray-800 mb-1">Delivery Partner</span>
                    <span className="text-sm text-gray-600">Use AgriConnect delivery network.</span>
                </label>
             </div>

             {deliveryMethod === 'farmer' && (
                 <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center justify-between">
                     <span className="font-medium text-green-900">Maximum delivery radius (km):</span>
                     <input type="number" defaultValue="5" min="1" className="w-24 p-2 border border-green-300 rounded focus:ring-primary outline-none" />
                 </div>
             )}
          </div>

          <div className="border-t pt-6 flex items-center justify-between">
            <Link to="/farmer" className="text-gray-500 hover:text-gray-800 font-medium px-4 py-2">Cancel</Link>
            <button type="submit" disabled={isLoading} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
