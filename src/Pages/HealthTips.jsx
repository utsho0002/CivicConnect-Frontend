import React, { useState } from "react";
import { 
  FaAppleAlt, 
  FaRunning, 
  FaBed, 
  FaTint, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaGlassWhiskey, 
  FaInfoCircle,
  FaHeartbeat
} from "react-icons/fa";
import { Link } from "react-router";

const HealthTips = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Data for General Health
  const generalTips = [
    {
      id: 1,
      icon: <FaGlassWhiskey className="text-blue-500" />,
      title: "Hydration is Key",
      desc: "Drink at least 8-10 glasses of water daily. Hydration helps maintain blood volume and makes donation easier."
    },
    {
      id: 2,
      icon: <FaAppleAlt className="text-red-500" />,
      title: "Iron-Rich Diet",
      desc: "Consume foods rich in iron like spinach, red meat, and lentils to maintain healthy hemoglobin levels."
    },
    {
      id: 3,
      icon: <FaBed className="text-indigo-500" />,
      title: "Quality Sleep",
      desc: "Aim for 7-8 hours of sleep. A well-rested body regenerates blood cells faster and keeps immunity high."
    },
    {
      id: 4,
      icon: <FaRunning className="text-emerald-500" />,
      title: "Regular Exercise",
      desc: "Moderate exercise keeps your heart healthy and improves blood circulation, essential for donors."
    }
  ];

  // Data for Myths
  const myths = [
    {
      q: "Does donating blood make you weak?",
      a: "No. Your body replenishes the lost fluid within 24 hours and red blood cells within a few weeks. You can resume normal activities almost immediately."
    },
    {
      q: "Can I get an infection from donating?",
      a: "Impossible. Sterile, disposable needles are used for every single donor and then discarded safely."
    },
    {
      q: "I have a tattoo, so I can't donate.",
      a: "Not necessarily. In many regions, you only need to wait 6-12 months after getting a tattoo to donate safely."
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 pb-20 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <div className="bg-neutral text-neutral-content py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <FaHeartbeat className="text-red-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wider uppercase">Wellness Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Your Health, Our <span className="text-red-500">Priority</span>
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover simple habits to stay healthy and learn how your lifestyle impacts your ability to save lives through blood donation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* 2. Featured Cards (General Tips) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {generalTips.map((tip) => (
            <div key={tip.id} className="card bg-base-100 shadow-xl shadow-base-300/50 hover:-translate-y-2 transition-transform duration-300 border-b-4 border-transparent hover:border-red-500">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center text-3xl mb-4">
                  {tip.icon}
                </div>
                <h3 className="card-title font-bold text-base-content">{tip.title}</h3>
                <p className="text-sm text-base-content/70">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Donation Guide Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          
          {/* Before Donation */}
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2.5rem] p-8 md:p-12 border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden">
             <FaCheckCircle className="absolute -right-6 -bottom-6 text-9xl text-emerald-500/10" />
             <h2 className="text-2xl font-black text-emerald-800 dark:text-emerald-400 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-lg">01</span>
                Before Donation
             </h2>
             <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  <span className="text-emerald-900 dark:text-emerald-100 font-medium">Eat a healthy, iron-rich meal (avoid fatty foods).</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  <span className="text-emerald-900 dark:text-emerald-100 font-medium">Drink an extra 16 oz. of water.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  <span className="text-emerald-900 dark:text-emerald-100 font-medium">Get a good night's sleep (7+ hours).</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  <span className="text-emerald-900 dark:text-emerald-100 font-medium">Bring your ID and list of medications.</span>
                </li>
             </ul>
          </div>

          {/* After Donation */}
          <div className="bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] p-8 md:p-12 border border-red-100 dark:border-red-900/30 relative overflow-hidden">
             <FaTint className="absolute -right-6 -bottom-6 text-9xl text-red-500/10" />
             <h2 className="text-2xl font-black text-red-800 dark:text-red-400 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 text-lg">02</span>
                After Donation
             </h2>
             <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 mt-1 shrink-0" />
                  <span className="text-red-900 dark:text-red-100 font-medium">Drink extra fluids for the next 24 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaTimesCircle className="text-red-500 mt-1 shrink-0" />
                  <span className="text-red-900 dark:text-red-100 font-medium">Avoid strenuous physical activity or heavy lifting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 mt-1 shrink-0" />
                  <span className="text-red-900 dark:text-red-100 font-medium">Keep the bandage on for at least 4 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 mt-1 shrink-0" />
                  <span className="text-red-900 dark:text-red-100 font-medium">Eat foods rich in iron and Vitamin C.</span>
                </li>
             </ul>
          </div>
        </div>

        {/* 4. Myths vs Facts Accordion */}
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-base-content">Common Myths <span className="text-red-500">Busted</span></h2>
                <p className="text-base-content/60 mt-2">Get the facts straight about blood donation.</p>
            </div>

            <div className="space-y-4">
                {myths.map((myth, idx) => (
                    <div key={idx} className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl shadow-sm">
                        <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} /> 
                        <div className="collapse-title text-lg font-bold flex items-center gap-3">
                            <FaInfoCircle className="text-blue-500" />
                            {myth.q}
                        </div>
                        <div className="collapse-content"> 
                            <p className="text-base-content/70 pl-8 pb-4">{myth.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 5. Bottom CTA */}
        <div className="mt-24 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Save a Life?</h2>
                <p className="text-slate-300 max-w-xl mx-auto mb-8 text-lg">
                    Now that you know how to stay healthy, put that health to good use. Join our mission today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to='/auth/register' className="btn btn-error text-white h-14 px-8 rounded-xl font-bold shadow-lg shadow-red-500/30 border-none">
                        Register as Donor
                    </Link>
                    <Link to='/search' className="btn btn-outline btn-warning h-14 px-8 rounded-xl font-bold">
                        Search Donors
                    </Link>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HealthTips;