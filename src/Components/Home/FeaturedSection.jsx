import React from 'react';
import { FaUserShield, FaHandHoldingHeart, FaBolt, FaAward } from 'react-icons/fa';

const FeaturedSection = () => {
  const features = [
    {
      icon: <FaUserShield className="text-3xl" />,
      title: "Verified Donors",
      desc: "Every donor is verified through a strict process to ensure the highest safety standards.",
      // Fixed: Added dark mode classes for background and text
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      icon: <FaBolt className="text-3xl" />,
      title: "Quick Matching",
      desc: "Our smart algorithm finds the nearest matching blood group in seconds during emergencies.",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    },
    {
      icon: <FaHandHoldingHeart className="text-3xl" />,
      title: "Free of Cost",
      desc: "A 100% community-driven platform. No middleman fees, just pure humanity.",
      color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Donor Rewards",
      desc: "Earn badges and recognition for every life you save to showcase your contribution.",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    }
  ];

  return (
    // Fixed: Added bg-base-100 for proper theme background
    <section className="py-20 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Why Choose Us</h2>
          {/* Fixed: text-gray-900 -> text-base-content */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-content">
            Making Blood Donation <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Simple & Efficient</span>
          </h1>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <div key={index} className="group p-8 rounded-3xl border border-base-200 bg-base-100 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-2">
              {/* Icon Container: Uses the dynamic color string from the array */}
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              {/* Fixed: text-gray-800 -> text-base-content */}
              <h3 className="text-xl font-bold text-base-content mb-3">{f.title}</h3>
              {/* Fixed: text-gray-500 -> text-base-content/60 */}
              <p className="text-base-content/60 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Flowchart Placeholder */}
        {/* Fixed: bg-gray-900 -> bg-neutral (DaisyUI dark shade) */}
        <div className="mt-20 p-10 bg-neutral rounded-[3rem] text-neutral-content overflow-hidden relative shadow-xl">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-10">
              <div className="text-center">
                <div className="text-5xl font-black text-red-500 mb-2">10k+</div>
                <div className="text-neutral-content/60 uppercase tracking-tighter text-xs">Lives Saved</div>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block h-12 w-[1px] bg-neutral-content/20"></div>
              
              <div className="text-center">
                <div className="text-5xl font-black text-red-500 mb-2">50+</div>
                <div className="text-neutral-content/60 uppercase tracking-tighter text-xs">Districts Covered</div>
              </div>

              {/* Divider */}
              <div className="hidden md:block h-12 w-[1px] bg-neutral-content/20"></div>

              <div className="text-center">
                <div className="text-5xl font-black text-red-500 mb-2">24/7</div>
                <div className="text-neutral-content/60 uppercase tracking-tighter text-xs">Support Response</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;