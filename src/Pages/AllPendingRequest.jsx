import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaTint, FaRegCalendarAlt, FaHospital, FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";

const AllPendingRequest = () => {
  // We only use 'user' to change the button text/link, NOT to block the page
  const { user } = useContext(AuthContext); 
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      try {
        // NO HEADERS, NO TOKENS. Just a straight public request.
        const res = await axios.get("https://assignment11-mocha-kappa.vercel.app/requests/pending");
        setPendingRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []); // Runs once on mount, regardless of login status

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <span className="loading loading-ring loading-lg text-red-600"></span>
        <p className="text-gray-500 font-bold mt-4 animate-pulse">Scanning for help requests...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
            <span className="text-red-600 font-black tracking-[0.2em] uppercase text-xs">Emergency Feed</span>
            <h2 className="text-4xl font-black text-gray-900 mt-1">
              Pending <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Requests</span>
            </h2>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <span className="text-sm font-bold text-gray-600">{pendingRequests.length} Active Requests</span>
        </div>
      </div>

      {pendingRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingRequests.map((req) => (
            <div 
                key={req._id} 
                className="group relative bg-white rounded-[2rem] border border-gray-100 p-1 hover:border-red-100 transition-all duration-300 hover:shadow-2xl hover:shadow-red-100 hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
                        {req.blood_grp || req.bloodGroup}
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-50 text-yellow-600 border border-yellow-100">
                        {req.donationStatus}
                    </span>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Patient Name</p>
                    <h3 className="text-xl font-bold text-gray-800">{req.recipientName}</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 py-4 border-y border-gray-50 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-sm font-medium">{req.recipientDistrict}, {req.recipientUpazila}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaRegCalendarAlt className="text-gray-400" />
                        <span className="text-sm font-medium">{req.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <FaHospital className="text-gray-400" />
                        <span className="text-sm font-medium">{req.hospitalName || "General Hospital"}</span>
                    </div>
                </div>

                {/* If user is logged in, show Details. If not, ask to Login */}
                <Link 
                    to={user ? `/dashboard/view-details/${req._id}` : "/login"} 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg"
                >
                    {user ? "View Full Details" : "Login to Help"} <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center px-4">
          <FaTint className="text-6xl text-gray-200 mb-6" />
          <h3 className="text-2xl font-bold text-gray-800">Everything is Quiet</h3>
          <p className="text-gray-500 mt-2">No pending blood requests found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AllPendingRequest;