import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { MdDelete, MdEditDocument, MdVisibility } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaPlus, FaTint } from "react-icons/fa";

const MyRequest = () => {
  const [myRequest, setMyRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    setIsLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalReq);
        setIsLoading(false);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numOfPages = Math.ceil(totalRequest / itemsPerPage) || 0;
  const pages = [...Array(numOfPages).keys()].map((e) => e + 1);
  
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < pages.length && setCurrentPage(currentPage + 1);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: "You won't be able to revert this mission!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      customClass: { container: 'rounded-3xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/dashboard/request/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setMyRequest(myRequest.filter((item) => item._id !== id));
              setTotalRequest(prev => prev - 1);
              Swal.fire('Deleted!', 'Your request has been removed.', 'success');
            }
          })
      }
    });
  };

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-base-content tracking-tight">My Donation Requests</h1>
          <p className="text-base-content/60 font-medium">Manage and track your active blood requests.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="bg-base-100 px-5 py-2 rounded-2xl shadow-sm border border-base-300 hidden sm:block">
                <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest block">Total Filed</span>
                <span className="text-xl font-black text-red-600">{totalRequest}</span>
            </div>
            <Link to="/dashboard/create-request" className="btn btn-error text-white rounded-2xl px-6 border-none shadow-lg shadow-red-500/30">
                <FaPlus /> New Request
            </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto bg-base-100 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-200">
                <th className="py-6 pl-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">No.</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Recipient & Location</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Medical Center</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Group</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Schedule</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Status</th>
                <th className="py-6 pr-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {isLoading ? (
                  <tr><td colSpan="7" className="py-20 text-center"><span className="loading loading-spinner text-red-600"></span></td></tr>
              ) : myRequest.map((req, index) => (
                <tr key={req._id} className="hover:bg-base-200/50 transition-colors group">
                  <td className="py-5 pl-8 text-center font-bold text-base-content/30">
                    {((currentPage - 1) * 10) + (index + 1)}
                  </td>
                  <td className="py-5">
                    <div className="font-bold text-base-content">{req.recipientName}</div>
                    <div className="text-[11px] text-base-content/50 font-medium uppercase tracking-tighter">
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="text-sm font-semibold text-base-content/70 truncate max-w-[150px]">
                      {req.hospitalName}
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 rounded-lg font-black text-xs">
                        <FaTint size={10} /> {req.bloodGroup}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="text-xs font-bold text-base-content/80">{req.donationDate}</div>
                    <div className="text-[10px] text-base-content/50">{req.donationTime}</div>
                  </td>
                  <td className="py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      req.donationStatus === 'done' 
                      ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                      : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                    }`}>
                      {req.donationStatus}
                    </span>
                  </td>
                  <td className="py-5 pr-8 text-right">
                    <div className="flex justify-end gap-1">
                      <Link 
                        to={`../view-details/${req._id}`}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-500 rounded-xl transition-all"
                        title="View Details"
                      >
                        <MdVisibility size={20} />
                      </Link>
                      <Link 
                        to={`../edit-request/${req._id}`}
                        className="p-2 hover:bg-base-200 text-base-content/70 rounded-xl transition-all"
                        title="Edit Request"
                      >
                        <MdEditDocument size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 rounded-xl transition-all"
                        title="Delete"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
        <p className="text-sm text-base-content/60 font-medium">
          Showing <span className="text-base-content font-bold">{myRequest.length}</span> of {totalRequest} entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-sm bg-base-100 border-base-300 hover:border-red-400 text-base-content rounded-xl disabled:opacity-30" 
            onClick={handlePrev} 
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={10} />
          </button>
          
          <div className="flex gap-1">
            {pages.map(page => (
              <button 
                key={page}
                className={`btn btn-sm border-none rounded-xl w-10 ${
                  page === currentPage 
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/30" 
                  : "bg-base-100 text-base-content/70 hover:bg-base-200"
                }`} 
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            className="btn btn-sm bg-base-100 border-base-300 hover:border-red-400 text-base-content rounded-xl disabled:opacity-30" 
            onClick={handleNext} 
            disabled={currentPage === pages.length}
          >
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;