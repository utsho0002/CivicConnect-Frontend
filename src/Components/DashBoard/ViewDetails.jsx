import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { 
  FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
  FaQuoteLeft, FaHeart, FaUserCircle, FaEnvelope 
} from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const ViewDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get(`/dashboard/request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    try {
      const updateInfo = {
        donationStatus: "done",
        donorName: user?.displayName,
        donorEmail: user?.email
      };

      const res = await axiosSecure.patch(`/dashboard/request/${id}`, updateInfo);
      
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Hero Status Confirmed!',
          text: 'Thank you for your life-saving contribution.',
          confirmButtonColor: '#dc2626',
          customClass: {
            popup: 'bg-base-100 text-base-content rounded-3xl',
            confirmButton: 'rounded-xl'
          }
        });
        setRequest({ ...request, donationStatus: "done" });
        document.getElementById("confirm_modal").close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="loading loading-ring loading-lg text-red-600"></span>
    </div>
  );

  if (!request) return (
    <div className="text-center my-20">
      <h2 className="text-2xl font-bold text-base-content/50">Request not found.</h2>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 transition-colors duration-300">
      <div className="bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-300/50 dark:shadow-none overflow-hidden border border-base-200">
        
        {/* Top Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-8 md:p-12 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl font-black shadow-inner border border-white/30 text-white">
                    {request.blood_grp || request.bloodGroup}
                </div>
                <div>
                    <span className="bg-white/20 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold text-white/90">Patient Profile</span>
                    <h1 className="text-3xl md:text-4xl font-black mt-2 uppercase tracking-tight text-white">
                    {request.recipientName}
                    </h1>
                </div>
                </div>
                
                <div className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest border-2 ${
                request.donationStatus === 'done' 
                ? 'bg-green-500/20 border-green-400 text-green-50' 
                : 'bg-amber-400/20 border-amber-300 text-amber-50 animate-pulse'
                }`}>
                {request.donationStatus}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Essential Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xs font-black text-base-content/40 uppercase tracking-[0.2em] mb-6">Mission Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                
                <DetailItem 
                  icon={<FaHospital className="text-red-500" />} 
                  label="Medical Center" 
                  value={request.hospitalName} 
                />
                <DetailItem 
                  icon={<FaMapMarkerAlt className="text-red-500" />} 
                  label="Specific Address" 
                  value={request.fullAddress} 
                />
                <DetailItem 
                  icon={<FaCalendarAlt className="text-red-500" />} 
                  label="Scheduled Date" 
                  value={request.donationDate} 
                />
                <DetailItem 
                  icon={<FaClock className="text-red-500" />} 
                  label="Preferred Time" 
                  value={request.donationTime} 
                />
              </div>
            </div>

            {/* Requester Message */}
            <div className="bg-base-200 rounded-[2rem] p-8 relative">
              <FaQuoteLeft className="text-base-content/10 text-4xl absolute top-6 left-6" />
              <div className="relative z-10">
                <p className="text-base-content/50 text-xs font-bold uppercase tracking-widest mb-3 ml-8">Message from Requester</p>
                <p className="text-lg text-base-content italic leading-relaxed ml-8">
                  {request.requestMessage || "I am in urgent need of blood. Your help would be a blessing to my family."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Location Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/10 rounded-[2rem] p-8 border border-red-100 dark:border-red-900/20">
               <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-red-600/20">
                  <FaMapMarkerAlt className="text-xl" />
               </div>
               <h4 className="font-bold text-base-content text-xl mb-2">Location</h4>
               <p className="text-red-600 dark:text-red-400 font-medium">
                  {request.recipientUpazila}, {request.recipientDistrict}
               </p>
               <div className="mt-6 pt-6 border-t border-red-200/50 dark:border-red-900/20">
                  <p className="text-xs text-red-500 dark:text-red-400 font-bold uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    This request is currently <span className="font-bold text-base-content">waiting for a hero.</span>
                  </p>
               </div>
            </div>

            {request.donationStatus !== "done" ? (
              <button 
                className="btn btn-error w-full h-16 text-white text-lg rounded-2xl shadow-xl shadow-red-500/30 border-none transition-all group hover:scale-[1.02]"
                onClick={() => document.getElementById("confirm_modal").showModal()}
              >
                <FaHeart className="group-hover:scale-125 transition-transform" /> 
                Confirm Donation
              </button>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6 rounded-2xl text-center">
                <FaHeart className="text-green-500 text-3xl mx-auto mb-2" />
                <p className="font-bold text-green-700 dark:text-green-400 uppercase tracking-widest text-xs">Donation Completed</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- PREMIUM MODAL --- */}
      <dialog id="confirm_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box p-0 rounded-[2.5rem] overflow-hidden max-w-md border-none bg-base-100">
          <div className="bg-red-600 p-8 text-white text-center">
            <BiSolidDonateBlood className="text-6xl mx-auto mb-4 animate-bounce" />
            <h3 className="font-black text-2xl uppercase italic tracking-tighter">The Final Step</h3>
            <p className="text-red-100 text-sm opacity-80">Please confirm your hero details</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
              <FaUserCircle className="text-3xl text-base-content/30" />
              <div>
                <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Donor Name</p>
                <p className="font-bold text-base-content">{user?.displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
              <FaEnvelope className="text-3xl text-base-content/30" />
              <div>
                <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Donor Email</p>
                <p className="font-bold text-base-content">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <form method="dialog" className="flex-1">
                <button className="btn btn-ghost hover:bg-base-200 w-full rounded-xl text-base-content/70">Cancel</button>
              </form>
              <button 
                onClick={handleConfirmDonation} 
                className="btn btn-error flex-[2] text-white rounded-xl shadow-lg shadow-red-500/30 border-none"
              >
                I'm Ready to Donate
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-base-content font-bold leading-tight">{value}</p>
    </div>
  </div>
);

export default ViewDetails;