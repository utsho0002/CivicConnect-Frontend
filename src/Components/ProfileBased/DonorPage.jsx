import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../hook/UseAxiosSecure';
import { Link } from 'react-router';
import { MdDelete, MdEditDocument, MdVisibility,  } from 'react-icons/md';
import { FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';

const DonorPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get("/dashboard/home-requests")
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
        });
    }
  }, [axiosSecure, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      customClass: { popup: 'rounded-[1.5rem]' }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/dashboard/request/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setRequests((prev) => prev.filter((item) => item._id !== id));
              Swal.fire('Deleted!', 'Request has been removed.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Welcome Hero Section */}
      <div className="max-w-7xl mx-auto mb-10">
        
      </div>

      {/* Recent Requests Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            Recent Requests
          </h2>
          <Link 
            to="my-request" 
            className="group flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="py-6 pl-8 text-gray-400 uppercase text-[10px] font-black tracking-widest">Recipient</th>
                  <th className="py-6 text-gray-400 uppercase text-[10px] font-black tracking-widest">Location</th>
                  <th className="py-6 text-gray-400 uppercase text-[10px] font-black tracking-widest text-center">Group</th>
                  <th className="py-6 text-gray-400 uppercase text-[10px] font-black tracking-widest">Schedule</th>
                  <th className="py-6 text-gray-400 uppercase text-[10px] font-black tracking-widest text-center">Status</th>
                  <th className="py-6 pr-8 text-gray-400 uppercase text-[10px] font-black tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                    <tr><td colSpan="6" className="py-20 text-center"><span className="loading loading-spinner text-red-600"></span></td></tr>
                ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <md assignment size={40} className="opacity-20" />
                          <p className="font-bold">No recent requests found</p>
                          <Link to="/dashboard/create-request" className="text-red-500 text-sm hover:underline">Create your first request</Link>
                        </div>
                      </td>
                    </tr>
                ) : (
                  requests.map((data) => (
                    <tr key={data._id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-5 pl-8">
                        <div className="font-black text-gray-800">{data.recipientName}</div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                          <FaMapMarkerAlt className="text-red-400" />
                          {data.recipientUpazila}, {data.recipientDistrict}
                        </div>
                      </td>
                      <td className="py-5 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-xs">
                          <FaTint size={10} /> {data.bloodGroup}
                        </span>
                      </td>
                      <td className="py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                            <FaCalendarAlt size={10} className="text-gray-400" /> {data.donationDate}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <FaClock size={10} /> {data.donationTime}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 text-center">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          data.donationStatus === 'done' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {data.donationStatus}
                        </span>
                      </td>
                      <td className="py-5 pr-8 text-right">
                        <div className="flex justify-end gap-1">
                          <Link 
                            to={`view-details/${data._id}`}
                            className="p-2 hover:bg-blue-50 text-blue-500 rounded-xl transition-all"
                            title="View"
                          >
                            <MdVisibility size={20} />
                          </Link>
                          <Link 
                            to={`edit-request/${data._id}`}
                            className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-all"
                            title="Edit"
                          >
                            <MdEditDocument size={20} />
                          </Link>
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all"
                            title="Delete"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* See More Footer Button */}
        <div className="mt-8 flex justify-center">
           <Link 
            to="my-request" 
            className="btn btn-wide bg-white hover:bg-gray-900 hover:text-white border-gray-200 rounded-2xl shadow-sm font-black uppercase tracking-widest text-xs h-14"
           >
            Explore All Requests
           </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorPage;