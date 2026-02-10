import React from "react";
import { FaHeart, FaSearch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Banner = () => {
  return (
   
    <div className="py-12 lg:py-20 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-red-100/50 border-l-4 border-red-600 mb-8 shadow-sm">
              <FaHeart className="text-red-600 animate-pulse text-sm" />
              <span className="text-xs font-black uppercase tracking-widest text-base-content/70">
                Urgent: Donors Needed Today
              </span>
            </div>

            {/* Heading */}
            {/* CHANGED: text-slate-900 -> text-base-content */}
            <h1 className="text-5xl md:text-6xl font-black text-base-content leading-[1.1] mb-6">
              Your Blood Can <br />
              <span className="text-red-600 italic underline decoration-base-300">Rewrite</span> a Life
            </h1>

            {/* Paragraph */}
            {/* CHANGED: text-slate-500 -> text-base-content/70 */}
            <p className="text-lg text-base-content/70 mb-10 leading-relaxed font-medium max-w-lg">
              Every drop counts. Join our network of heroes and help us bridge the gap 
              between blood donors and recipients across the country.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to='/auth/register' 
                className="group px-8 py-4 bg-red-600 hover:bg-neutral text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-red-200 dark:shadow-none"
              >
                Join as a Donor <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Button */}
              {/* CHANGED: bg-white -> bg-base-100, text-slate-700 -> text-base-content */}
              <Link 
                to='/search' 
                className="px-8 py-4 bg-base-100 border-2 border-base-300 text-base-content font-bold rounded-2xl hover:border-red-600 hover:text-red-600 transition-all flex items-center justify-center gap-3"
              >
                <FaSearch size={14} /> Search Donors
              </Link>
            </div>

            {/* Stats Summary */}
            {/* CHANGED: border-slate-100 -> border-base-300 */}
            <div className="mt-12 flex gap-10 border-t border-base-300 pt-10">
                <div>
                    <h4 className="text-2xl font-black text-base-content">10k+</h4>
                    <p className="text-[10px] font-black text-base-content/50 uppercase tracking-widest">Donations</p>
                </div>
                <div className="w-[1px] bg-base-300"></div>
                <div>
                    <h4 className="text-2xl font-black text-base-content">64</h4>
                    <p className="text-[10px] font-black text-base-content/50 uppercase tracking-widest">Districts</p>
                </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="order-1 lg:order-2 relative">
            {/* Background Accent Box */}
            <div className="absolute top-10 right-10 w-full h-full bg-base-300 rounded-[3rem] -z-10"></div>
            
            {/* Main Image Container */}
            {/* CHANGED: border-white -> border-base-100 */}
            <div className="relative rounded-[3rem] border-8 border-base-100 shadow-2xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img 
                    src="https://media.istockphoto.com/id/2222002202/photo/young-black-man-and-middle-aged-caucasian-man-donating-blood-in-clinic-setting.jpg?s=1024x1024&w=is&k=20&c=646G3mU8csfLXBg8leqxOjH-gsF0n5JUvoCzttUYF8w=" 
                    alt="Blood Donation Hero"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Overlay Card */}
                {/* CHANGED: bg-white/90 -> bg-base-100/90 */}
                <div className="absolute bottom-6 left-6 right-6 bg-base-100/90 backdrop-blur-md p-6 rounded-3xl border border-base-200 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">O+</div>
                        <div>
                            <p className="text-xs font-black text-base-content/50 uppercase tracking-widest">Most Requested</p>
                            <h4 className="text-lg font-bold text-base-content italic">"Save a life today"</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Element */}
            {/* CHANGED: bg-slate-900 -> bg-neutral */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-neutral rounded-3xl flex items-center justify-center rotate-12 shadow-2xl hidden md:flex">
                <FaHeart className="text-red-500 text-3xl animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;