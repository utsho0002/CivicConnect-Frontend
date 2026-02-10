import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../hook/UseAxiosSecure';
import { FaFileMedical, FaHandHoldingUsd, FaUsers, FaChartLine, FaArrowUp } from 'react-icons/fa';

const AdminPage = () => {
    const axiosSecure = UseAxiosSecure();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [donorsRes, requestsRes, paymentsRes] = await Promise.all([
                    axiosSecure.get("/users/donors"),
                    axiosSecure.get("/all-requests"),
                    axiosSecure.get("/all-payment")
                ]);
                setDonors(donorsRes.data);
                setRequests(requestsRes.data);
                setPayments(paymentsRes.data);
            } catch (err) {
                console.error("Data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const totalFunding = payments.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="pb-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 1. Total Donors */}
                <div className="relative group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <FaUsers size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                <FaArrowUp /> LIVE
                            </span>
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">Total Donors</p>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                                {donors.length.toLocaleString()}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 mt-4 italic">Active Community Members</p>
                        </div>
                    </div>
                </div>

                {/* 2. Total Funding */}
                <div className="relative group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <FaHandHoldingUsd size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                SECURE
                            </span>
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">Total Funding</p>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                                <span className="text-emerald-500 text-3xl mr-1 font-medium">$</span>
                                {totalFunding.toLocaleString()}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 mt-4 italic">Funds for Operations</p>
                        </div>
                    </div>
                </div>

                {/* 3. Blood Requests */}
                <div className="relative group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                <FaFileMedical size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                                URGENT
                            </span>
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">Blood Requests</p>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                                {requests.length.toLocaleString()}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 mt-4 italic">Missions Awaiting Help</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Utility Bar */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status: Optimal</span>
                </div>
               
            </div>
        </div>
    );
};

export default AdminPage;