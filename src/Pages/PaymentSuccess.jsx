import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { FaCheckCircle, FaHeart, FaShareAlt, FaArrowRight } from 'react-icons/fa';
import Confetti from 'react-confetti'; // Optional: npm install react-confetti

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if (sessionId) {
            axios
                .post(`https://assignment11-mocha-kappa.vercel.app/success-payment?session_id=${sessionId}`)
                .then((res) => {
                    console.log(res.data);
                    setIsProcessing(false);
                })
                .catch((err) => {
                    console.error(err);
                    setIsProcessing(false);
                });
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Celebration Confetti - Optional visual flair */}
            {!isProcessing && <Confetti numberOfPieces={150} recycle={false} gravity={0.1} />}

            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-gray-100 relative z-10">
                
                {/* Success Icon */}
                <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <FaCheckCircle className="text-6xl text-green-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white border-4 border-white animate-bounce">
                        <FaHeart className="text-sm" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Thank you for your generosity. Your contribution helps us keep the 
                    <span className="text-red-600 font-bold"> BLOODHERO </span> 
                    network running to save lives every day.
                </p>

                {/* Transaction Box */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-dashed border-gray-200">
                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Transaction ID</p>
                    <p className="text-xs font-mono text-gray-600 truncate">
                        {sessionId ? sessionId : "Processing reference..."}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link 
                        to="/dashboard" 
                        className="btn btn-error w-full h-14 text-white text-lg rounded-xl shadow-lg shadow-red-100 hover:shadow-red-200 border-none transition-all flex items-center justify-center gap-2"
                    >
                        Go to Dashboard <FaArrowRight />
                    </Link>
                    
                    <button className="btn btn-ghost w-full h-14 text-gray-500 hover:text-red-600 flex items-center justify-center gap-2 rounded-xl transition-all">
                        <FaShareAlt /> Share your impact
                    </button>
                </div>

                {/* Loading Overlay (Internal) */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center z-20">
                        <span className="loading loading-ring loading-lg text-red-600"></span>
                        <p className="mt-4 font-bold text-gray-600">Verifying Donation...</p>
                    </div>
                )}
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-50 -z-0"></div>
        </div>
    );
};

export default PaymentSuccess;