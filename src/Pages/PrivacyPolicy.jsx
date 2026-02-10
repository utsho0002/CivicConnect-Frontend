import React, { useEffect } from "react";
import { FaShieldAlt, FaDatabase, FaUserSecret, FaLock, FaEnvelopeOpenText } from "react-icons/fa";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 text-base-content pb-20 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/security.png')]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FaUserSecret className="text-5xl mx-auto mb-4 text-emerald-400" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We value your trust. We are committed to protecting your personal and medical information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* Introduction Card */}
        <div className="card bg-base-100 shadow-xl p-8 md:p-10 mb-8 border-t-8 border-emerald-500">
          <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
          <p className="opacity-70 leading-relaxed">
            At BloodHero, we understand that your health data is sensitive. This Privacy Policy outlines what information we collect, how we use it, and the steps we take to ensure it stays secure. By using our platform, you consent to the practices described below.
          </p>
        </div>

        {/* Data Collection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200">
                <FaDatabase className="text-3xl text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Information We Collect</h3>
                <ul className="space-y-2 opacity-70 text-sm">
                    <li>• Personal ID (Name, Email)</li>
                    <li>• Medical Info (Blood Group, Eligibility)</li>
                    <li>• Location Data (District, Upazila)</li>
                    <li>• Communication History</li>
                </ul>
            </div>
            <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200">
                <FaEnvelopeOpenText className="text-3xl text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">How We Use It</h3>
                <ul className="space-y-2 opacity-70 text-sm">
                    <li>• Connecting Donors to Recipients</li>
                    <li>• Verifying User Authenticity</li>
                    <li>• Sending Emergency Alerts</li>
                    <li>• Improving Platform Service</li>
                </ul>
            </div>
        </div>

        {/* Visibility & Sharing */}
        <div className="bg-base-100 p-8 md:p-10 rounded-3xl shadow-sm mb-8 border border-base-200">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl text-red-500 text-2xl shrink-0">
                    <FaLock />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-3">Who sees your data?</h3>
                    <p className="opacity-70 mb-4 leading-relaxed">
                        We practice <strong>Data Minimization</strong>. Your exact location is never shown publicly. Only your District and Upazila are visible to help searchers find nearby donors.
                    </p>
                    <div className="alert bg-base-200 border-none text-sm">
                        <span>
                            <strong>Note:</strong> Your phone number is only revealed to a registered user when they initiate a "Request for Blood" and you accept it.
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Security Measures */}
        <div className="bg-base-100 p-8 md:p-10 rounded-3xl shadow-sm mb-8 border border-base-200">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaShieldAlt className="text-emerald-500" />
                Security Measures
            </h2>
            <p className="opacity-70 mb-6">
                We implement a variety of security measures to maintain the safety of your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-medium">SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-medium">Firebase Authentication</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-medium">JWT Token Verification</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-medium">Regular Security Audits</span>
                </div>
            </div>
        </div>


      </div>
    </div>
  );
};

export default PrivacyPolicy;