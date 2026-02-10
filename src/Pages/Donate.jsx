import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaHeart, FaDonate, FaShieldAlt } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";

const Donate = () => {
  const { user } = useContext(AuthContext);
  const [selectedAmount, setSelectedAmount] = useState("");

  const quickAmounts = ["10", "20", "50", "100"];

  const handleCheckout = (e) => {
    e.preventDefault();
    const donatedAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    if (!donatedAmount || donatedAmount <= 0) {
      return alert("Please enter a valid amount");
    }

    const formdata = {
      donatedAmount,
      donorEmail,
      donorName,
    };

    axios
      .post("https://assignment11-mocha-kappa.vercel.app/create-payment-checkout", formdata)
      .then((res) => {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.error("Payment error:", err);
      });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Impact Info */}
        <div className="md:w-5/12 bg-gradient-to-br from-red-600 to-rose-700 p-10 text-white flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8">
              <FaHeart className="text-3xl text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-black mb-4">Support the Cause</h1>
            <p className="text-red-50 opacity-90 leading-relaxed mb-6">
              Your donation helps us maintain the platform, verify donors, and save lives 24/7. Every cent counts.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium bg-white/10 p-3 rounded-xl border border-white/10">
                <FaShieldAlt className="text-green-300" /> Secure Encryption
              </div>
              <div className="flex items-center gap-3 text-sm font-medium bg-white/10 p-3 rounded-xl border border-white/10">
                <FaDonate className="text-amber-300" /> Direct Impact
              </div>
            </div>
          </div>
          
          <p className="text-xs text-red-200 mt-10 italic">
            * All transactions are processed securely via Stripe.
          </p>
        </div>

        {/* Right Side: Donation Form */}
        <div className="md:w-7/12 p-8 md:p-14">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Make a Donation</h2>
            <p className="text-gray-500">Choose an amount or enter your own.</p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Quick Select Amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 rounded-xl font-bold transition-all border-2 ${
                    selectedAmount === amt
                      ? "bg-red-50 border-red-500 text-red-600 shadow-md shadow-red-50"
                      : "bg-gray-50 border-transparent text-gray-600 hover:border-gray-200"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Manual Amount Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">Custom Amount (USD)</span>
              </label>
              <div className="relative">
                <BiDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                <input
                  type="number"
                  name="donateAmount"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  placeholder="0.00"
                  className="input input-bordered w-full pl-12 h-16 bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-red-100 transition-all rounded-2xl text-xl font-bold text-gray-800"
                  required
                />
              </div>
            </div>

            {/* User Info (Confirmation) */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center gap-4">
                <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Donating As</p>
                    <p className="text-sm font-bold text-blue-900">{user?.displayName}</p>
                </div>
            </div>

            <button className="btn btn-error w-full h-16 text-white text-lg rounded-2xl shadow-xl shadow-red-100 hover:shadow-red-200 border-none transition-all flex items-center justify-center gap-3">
              <FaDonate className="text-xl" />
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;