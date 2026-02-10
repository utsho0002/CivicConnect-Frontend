import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { 
  FaUser, FaEnvelope, FaEdit, FaTint, FaMapMarkerAlt, 
  FaHospital, FaCalendarAlt, FaClock, FaInfoCircle 
} from "react-icons/fa";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State (Logic preserved exactly)
  const [formData, setFormData] = useState({
    recipientName: "",
    blood_grp: "",
    upzila: "",
    district: "",
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    requesterName: "",
    requesterEmail: "",
  });

  useEffect(() => {
    axios.get("/upzila.json").then((res) => setUpzilas(res.data.upazilas));
    axios.get("/distric.json").then((res) => setDistricts(res.data.districts));

    axiosSecure.get(`/dashboard/request/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire("Error", "Could not find request", "error");
      });
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axiosSecure.patch(`/dashboard/request/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Changes Saved!",
            text: "The donation request has been updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        }
      });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <span className="loading loading-ring loading-lg text-red-600"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
              <FaEdit className="text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Edit Request</h1>
              <p className="text-gray-400 text-sm">Update the details for this blood donation mission.</p>
            </div>
          </div>
        </div>

        <form className="p-8 md:p-12 space-y-8" onSubmit={handleUpdate}>
          
          {/* Section 1: Read-Only Info */}
          <section className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <FaInfoCircle /> Primary Requester (Fixed)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-xs font-bold text-gray-500">Your Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="text" 
                    value={formData.requesterName} 
                    className="input w-full pl-12 bg-gray-200/50 border-none rounded-xl text-gray-500 cursor-not-allowed h-12" 
                    readOnly 
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold text-gray-500">Your Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="email" 
                    value={formData.requesterEmail} 
                    className="input w-full pl-12 bg-gray-200/50 border-none rounded-xl text-gray-500 cursor-not-allowed h-12" 
                    readOnly 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Patient Details */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-black text-gray-700 text-sm">Recipient Name</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-50 border-gray-200 rounded-xl focus:border-red-500 focus:ring-0 h-12"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-black text-gray-700 text-sm">Blood Group</label>
                <div className="relative">
                   <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                   <select
                    className="select select-bordered w-full pl-12 bg-gray-50 border-gray-200 rounded-xl h-12"
                    value={formData.blood_grp}
                    onChange={(e) => setFormData({...formData, blood_grp: e.target.value})}
                   >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                   </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-black text-gray-700 text-sm">District</label>
                <select
                  className="select select-bordered bg-gray-50 border-gray-200 rounded-xl h-12"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                >
                  {districts?.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label font-black text-gray-700 text-sm">Upzilla</label>
                <select
                  className="select select-bordered bg-gray-50 border-gray-200 rounded-xl h-12"
                  value={formData.upzila}
                  onChange={(e) => setFormData({...formData, upzila: e.target.value})}
                >
                  {upzilas?.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label font-black text-gray-700 text-sm">Hospital Name</label>
              <div className="relative">
                <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-12 bg-gray-50 border-gray-200 rounded-xl h-12"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="form-control">
                  <label className="label font-black text-gray-700 text-sm">Donation Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="date" 
                        className="input input-bordered w-full pl-12 bg-gray-50 border-gray-200 rounded-xl h-12" 
                        value={formData.donationDate} 
                        onChange={(e) => setFormData({...formData, donationDate: e.target.value})} 
                    />
                  </div>
               </div>
               <div className="form-control">
                  <label className="label font-black text-gray-700 text-sm">Donation Time</label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="time" 
                        className="input input-bordered w-full pl-12 bg-gray-50 border-gray-200 rounded-xl h-12" 
                        value={formData.donationTime} 
                        onChange={(e) => setFormData({...formData, donationTime: e.target.value})} 
                    />
                  </div>
               </div>
            </div>
          </section>

          {/* Action Button */}
          <div className="pt-6">
            <button 
                type="submit" 
                className="btn btn-error w-full h-14 text-white text-lg font-bold rounded-2xl shadow-xl shadow-red-100 border-none transition-transform active:scale-95"
            >
              Update Donation Request
            </button>
            <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="btn btn-ghost w-full mt-2 text-gray-400 font-bold"
            >
              Cancel Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;