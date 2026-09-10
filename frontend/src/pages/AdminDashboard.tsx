import { ShieldCheck, Users, PhoneCall, Check, X, FileText } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (targetId: string, action: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: "00000000-0000-0000-0000-000000000002", // Mock admin UUID
          target_id: targetId,
          action: action,
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      alert(`Target marked as ${action}`);
    } catch (error) {
      console.error('Error during verification:', error);
      alert("Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <ShieldCheck className="w-8 h-8 mr-3 text-slate-600" />
            Government & Program Administration Portal
        </h1>
        <p className="text-slate-600 mt-2">AgriConnect F2C Ecosystem Monitoring</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-slate-600"><Users className="w-5 h-5"/> Verified Farmers</div>
          <p className="text-2xl font-bold text-slate-800">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-blue-600"><PhoneCall className="w-5 h-5"/> IVR Listings Today</div>
          <p className="text-2xl font-bold text-slate-800">42</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-amber-600"><FileText className="w-5 h-5"/> Pending Bulk Requests</div>
          <p className="text-2xl font-bold text-slate-800">7</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2 text-green-600"><ShieldCheck className="w-5 h-5"/> Policy Violations</div>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">IVR Farmer Verification Queue</h2>
          </div>
          <div className="p-4 space-y-4">
             <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                 <div className="flex justify-between items-start mb-3">
                     <div>
                         <p className="font-bold text-slate-800">Murugan K.</p>
                         <p className="text-sm text-slate-600">+91 98765 43210 • Madurai District</p>
                     </div>
                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">IVR Submitted</span>
                 </div>
                 <div className="text-sm text-slate-700 mb-4 bg-white p-2 rounded border border-slate-200">
                     Listed: <strong>20 kg Onion</strong> at 10:45 AM today via IVR.
                 </div>
                 <div className="flex gap-2">
                     <button onClick={() => handleVerify("mock-ivr-farmer-uuid", "Approve")} disabled={isVerifying} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50">
                         <Check className="w-4 h-4 mr-1" /> Approve
                     </button>
                     <button onClick={() => handleVerify("mock-ivr-farmer-uuid", "Reject")} disabled={isVerifying} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50">
                         <X className="w-4 h-4 mr-1" /> Reject
                     </button>
                 </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Community / Bulk Order Requests</h2>
          </div>
          <div className="p-4 space-y-4">
             <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                 <div className="flex justify-between items-start mb-3">
                     <div>
                         <p className="font-bold text-slate-800">Local Temple Trust</p>
                         <p className="text-sm text-slate-600">Reason: Community Event / Function</p>
                     </div>
                     <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">Pending Review</span>
                 </div>
                 <div className="text-sm text-slate-700 mb-4 bg-white p-2 rounded border border-slate-200">
                     Requested: <strong>50 kg Tomato</strong> for 15 Sep 2026.
                 </div>
                 <div className="flex gap-2">
                     <button onClick={() => handleVerify("mock-bulk-order-uuid", "Approve")} disabled={isVerifying} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50">
                         <Check className="w-4 h-4 mr-1" /> Verify & Approve
                     </button>
                     <button onClick={() => handleVerify("mock-bulk-order-uuid", "Reject")} disabled={isVerifying} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50">
                         <X className="w-4 h-4 mr-1" /> Reject
                     </button>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
