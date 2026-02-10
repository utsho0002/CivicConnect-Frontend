import React, { useEffect } from "react";
import { FaFileContract, FaGavel, FaExclamationTriangle, FaUserShield, FaBan } from "react-icons/fa";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content pb-20 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <FaFileContract className="text-5xl mx-auto mb-4 text-red-500 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
          <p className="opacity-70 text-lg">Last Updated: October 24, 2024</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sticky Sidebar (Table of Contents) */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
            <h3 className="font-bold text-lg mb-4 uppercase tracking-widest text-base-content/50">Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-base-content/70">
              {['acceptance', 'medical-disclaimer', 'eligibility', 'user-conduct', 'termination'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item)}
                    className="hover:text-red-500 hover:translate-x-1 transition-all capitalize text-left w-full"
                  >
                    {item.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* 1. Acceptance */}
          <section id="acceptance" className="bg-base-100 p-8 md:p-12 rounded-[2rem] shadow-sm border border-base-200">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-lg">01</span>
              Acceptance of Terms
            </h2>
            <p className="leading-relaxed opacity-80 mb-4">
              By accessing and using <strong>BloodHero</strong> ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p className="leading-relaxed opacity-80">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* 2. Medical Disclaimer (CRITICAL) */}
          <section id="medical-disclaimer" className="bg-amber-50 dark:bg-amber-900/10 p-8 md:p-12 rounded-[2rem] border border-amber-100 dark:border-amber-900/30">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-3 text-amber-800 dark:text-amber-500">
              <FaExclamationTriangle />
              Important Medical Disclaimer
            </h2>
            <div className="prose prose-amber dark:prose-invert max-w-none">
              <p className="font-bold">
                BloodHero is a platform to connect donors with recipients. We are NOT a medical organization, hospital, or emergency service.
              </p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>We do not guarantee the quality, safety, or compatibility of blood donated.</li>
                <li>Screening of donors and recipients is the sole responsibility of the medical facility conducting the transfusion.</li>
                <li>In case of a life-threatening emergency, please call your local emergency services immediately. Do not rely solely on this app.</li>
              </ul>
            </div>
          </section>

          {/* 3. Eligibility */}
          <section id="eligibility" className="bg-base-100 p-8 md:p-12 rounded-[2rem] shadow-sm border border-base-200">
             <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center text-lg">02</span>
              User Eligibility
            </h2>
            <p className="leading-relaxed opacity-80 mb-4">
              To use our services, you must be at least 18 years old. By creating an account, you represent and warrant that:
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex gap-3 items-start">
                <FaGavel className="text-base-content/40 mt-1 shrink-0" />
                <span className="opacity-80">You have the right, authority, and capacity to enter into this Agreement.</span>
              </li>
              <li className="flex gap-3 items-start">
                <FaUserShield className="text-base-content/40 mt-1 shrink-0" />
                <span className="opacity-80">You are providing truthful and accurate information regarding your health status and blood type.</span>
              </li>
            </ul>
          </section>

          {/* 4. User Conduct */}
          <section id="user-conduct" className="bg-base-100 p-8 md:p-12 rounded-[2rem] shadow-sm border border-base-200">
             <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center text-lg">03</span>
              Prohibited Activities
            </h2>
            <p className="opacity-80 mb-4">You agree not to engage in any of the following prohibited activities:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaBan className="text-red-500" />
                <span className="font-medium">Posting false blood requests</span>
              </div>
              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaBan className="text-red-500" />
                <span className="font-medium">Harassing donors/recipients</span>
              </div>
              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaBan className="text-red-500" />
                <span className="font-medium">Selling blood for money</span>
              </div>
              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaBan className="text-red-500" />
                <span className="font-medium">Data mining user info</span>
              </div>
            </div>
          </section>

          {/* 5. Termination */}
          <section id="termination" className="bg-base-100 p-8 md:p-12 rounded-[2rem] shadow-sm border border-base-200">
             <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-lg">04</span>
              Termination
            </h2>
            <p className="leading-relaxed opacity-80">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;