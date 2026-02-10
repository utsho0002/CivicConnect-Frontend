import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { MdDelete, MdEditDocument, MdVisibility } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllRequest = () => {
  const [myRequest, setMyRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    setIsLoading(true);
    axiosSecure
      .get(`/all-requests-admin?page=${currentPage - 1}&size=${itemsPerPage}`)
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
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      customClass: {
        container: 'rounded-[2rem]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/dashboard/request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setMyRequest(myRequest.filter((item) => item._id !== id));
            setTotalRequest(prev => prev - 1);
            Swal.fire('Deleted!', 'The record has been removed.', 'success');
          }
        });
      }
    });
  };

  return (
  
    <div className="p-6 md:p-10 bg-base-200 min-h-screen transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
    
          <h1 className="text-3xl font-black text-base-content">Request Management</h1>
  
          <p className="text-base-content/60 font-medium">Manage and monitor all blood donation activities.</p>
        </div>
        <div className="flex items-center gap-3">
       
          <div className="bg-base-100 px-4 py-2 rounded-xl shadow-sm border border-base-300 flex items-center gap-3">
        
            <span className="text-sm font-bold text-base-content/40 uppercase tracking-widest">Total</span>
            <span className="text-xl font-black text-red-600">{totalRequest}</span>
          </div>
        </div>
      </div>

      {/* Table Card */}

      <div className="max-w-7xl mx-auto bg-base-100 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* head */}
      
            <thead className="bg-base-200/50">

              <tr className="border-b border-base-200">
    
                <th className="py-5 pl-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">No.</th>
                <th className="py-5 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Recipient</th>
                <th className="py-5 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Medical Center</th>
                <th className="py-5 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Group</th>
                <th className="py-5 text-base-content/40 uppercase text-[10px] font-black tracking-widest">Schedule</th>
                <th className="py-5 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Status</th>
                <th className="py-5 pr-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <span className="loading loading-spinner loading-lg text-red-600"></span>
                  </td>
                </tr>
              ) : myRequest.map((req, index) => (
      
                <tr key={req._id} className="hover:bg-base-200/50 transition-colors group">
                  <td className="py-5 pl-8 text-center font-bold text-base-content/40">
                    {((currentPage - 1) * itemsPerPage) + (index + 1)}
                  </td>
                  <td className="py-5">
              
                    <div className="font-bold text-base-content">{req.recipientName}</div>
             
                    <div className="text-xs text-base-content/50">{req.recipientUpazila}, {req.recipientDistrict}</div>
                  </td>
         
                  <td className="py-5 font-medium text-base-content/70">{req.hospitalName}</td>
                  <td className="py-5 text-center">
                 
                    <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg font-black text-sm">
                      {req.bloodGroup || req.blood_grp}
                    </span>
                  </td>
                  <td className="py-5">
                   
                    <div className="text-sm font-bold text-base-content/80">{req.donationDate}</div>
                    <div className="text-xs text-base-content/50">{req.donationTime}</div>
                  </td>
                  <td className="py-5 text-center">
                
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      req.donationStatus === 'done' 
                      ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {req.donationStatus}
                    </span>
                  </td>
                  <td className="py-5 pr-8">
                    <div className="flex justify-end items-center gap-2">
                      <Link 
                        to={`../view-details/${req._id}`}
                    
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <MdVisibility size={20} />
                      </Link>
                      <Link 
                        to={`../edit-request/${req._id}`}
                      
                        className="p-2 hover:bg-base-200 text-base-content/70 rounded-lg transition-colors"
                        title="Edit Request"
                      >
                        <MdEditDocument size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                       
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
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

      {/* Pagination Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-8 gap-4 px-4">
     
        <p className="text-sm text-base-content/60 font-medium">

          Showing <span className="text-base-content font-bold">{myRequest.length}</span> of {totalRequest} requests
        </p>
        
        <div className="flex items-center gap-2">
         
          <button 
            className="btn btn-sm bg-base-100 border-base-300 hover:border-red-400 disabled:opacity-30 rounded-lg text-base-content" 
            onClick={handlePrev} 
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={10} />
          </button>
          
          <div className="flex items-center gap-1">
            {pages.map(page => (
              <button 
                key={page}
                
                className={`btn btn-sm border-none rounded-lg w-10 ${
                  page === currentPage 
                  ? "bg-red-600 text-white hover:bg-red-700" 
                  : "bg-base-100 text-base-content hover:bg-base-200"
                }`} 
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            className="btn btn-sm bg-base-100 border-base-300 hover:border-red-400 disabled:opacity-30 rounded-lg text-base-content" 
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

export default AllRequest;