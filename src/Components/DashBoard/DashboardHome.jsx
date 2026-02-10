import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUserShield, FaHandHoldingHeart } from "react-icons/fa";
import DonorPage from "../ProfileBased/DonorPage";
import AdminPage from "../ProfileBased/AdminPage";

const DashboardHome = () => {
  const { user, role } = useContext(AuthContext);

  // Helper to render role badge with Tailwind colors
  const RoleBadge = () => {
    // CHANGED: Added dark mode classes (dark:bg-xxx/20) for better contrast
    const styles = {
      admin: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
      volunteer: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      donor: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
    };
    return (
      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border inline-block mb-4 ${styles[role] || styles.donor}`}>
        {role} Access
      </span>
    );
  };

  return (
    // CHANGED: bg-gray-50/50 -> bg-base-200 (Main page background)
    <div className="p-4 md:p-8 min-h-screen bg-base-200 transition-colors duration-300">
      
      {/* 1. Hero Banner Section */}
      {/* CHANGED: bg-slate-900 -> bg-base-100 (Card background) */}
      <div className="w-full bg-base-100 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-gray-200/50 dark:shadow-none mb-8 relative overflow-hidden group transition-all duration-500">
        
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-red-600/20 transition-colors duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <RoleBadge />
            
            {/* CHANGED: text-white -> text-base-content */}
            <h1 className="text-4xl md:text-6xl font-black text-base-content mb-4 tracking-tighter">
              Welcome back, <br />
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                {user?.displayName?.split(' ')[0] || "Hero"}!
              </span>
            </h1>
            
            {/* CHANGED: text-slate-400 -> text-base-content/60 */}
            <p className="text-base-content/60 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              "Every drop of blood is a gift of life." Your dedication as a <span className="text-base-content font-bold italic">{role}</span> keeps this community beating.
            </p>
          </div>

          {/* User Avatar "Squircle" Card */}
          <div className="relative group/avatar cursor-default">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] bg-gradient-to-br from-red-500 to-rose-600 p-1 shadow-2xl rotate-3 group-hover/avatar:rotate-0 transition-all duration-500">
                {/* CHANGED: bg-slate-900 -> bg-base-100 */}
                <div className="w-full h-full bg-base-100 rounded-[2.8rem] overflow-hidden relative">
                    <img 
                      src={user?.photoURL || "https://i.ibb.co/mJR7z9S/user.png"} 
                      alt="Profile" 
                      className="w-full h-full object-cover opacity-90 group-hover/avatar:opacity-100 transition-opacity duration-500"
                    />
                    {/* CHANGED: Gradient to match theme (optional, kept explicit for visual style) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Live Status Pill */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Active Now</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating Role Icon */}
            {/* CHANGED: bg-white -> bg-base-100 */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-base-100 rounded-2xl shadow-xl flex items-center justify-center text-red-600 text-2xl animate-bounce">
                {role === 'admin' ? <FaUserShield /> : <FaHandHoldingHeart />}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Management Section Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            {/* CHANGED: bg-gray-200 -> bg-base-300 */}
            <div className="h-[1px] flex-1 bg-base-300"></div>
            {/* CHANGED: text-gray-400 -> text-base-content/40 */}
            <h2 className="text-xs font-black text-base-content/40 uppercase tracking-[0.3em]">Management Console</h2>
            <div className="h-[1px] flex-1 bg-base-300"></div>
        </div>

        {/* 3. Role-Based Component Injection */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {role === 'donor' && <DonorPage />}
          {(role === 'admin' || role === 'volunteer') && <AdminPage />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;