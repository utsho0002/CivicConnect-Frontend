import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import { FaTint, FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- THEME LOGIC ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  // -------------------

  const handleLogout = () => {
    const auth = getAuth();
    Swal.fire({
      title: "Sign Out?",
      text: "Ready to leave your hero post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sign Out",
      // Adaptive colors for SweetAlert
      background: theme === "dark" ? "#1d232a" : "#fff",
      color: theme === "dark" ? "#a6adbb" : "#000",
      customClass: { popup: 'rounded-[2rem]' }
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          Swal.fire({ 
            title: "Signed Out!", 
            icon: "success", 
            timer: 1000, 
            showConfirmButton: false,
            background: theme === "dark" ? "#1d232a" : "#fff",
            color: theme === "dark" ? "#a6adbb" : "#000",
          });
        });
      }
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/all-request" 
          className={({ isActive }) => 
            `px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              isActive 
                ? "bg-red-50 text-red-600 shadow-sm border border-red-100 dark:bg-red-900/30 dark:border-red-900 dark:text-red-400" 
                : "text-base-content/70 hover:text-red-500 hover:bg-base-200"
            }`
          }
        >
          <FaSearch className="text-xs" /> All Requests
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/donate" 
          className={({ isActive }) => 
            `px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              isActive 
                ? "bg-red-50 text-red-600 shadow-sm border border-red-100 dark:bg-red-900/30 dark:border-red-900 dark:text-red-400" 
                : "text-base-content/70 hover:text-red-500 hover:bg-base-200"
            }`
          }
        >
          <FaHandHoldingHeart className="text-xs" /> Donate
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-[100] px-4 py-4 md:py-6">
      {/* Floating Capsule Container */}
      {/* bg-base-100 ensures the background adapts to the theme automatically */}
      <div className="navbar max-w-7xl mx-auto bg-base-100/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] border border-base-200 px-6 py-2 transition-all duration-300">
        
        <div className="navbar-start">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 transition-transform group-hover:scale-110 ">
              <FaTint className="text-white text-lg" />
            </div>
            <span className="lg:flex font-black text-xl lg:text-2xl tracking-tighter text-base-content hidden">
              BLOOD<span className="text-red-600">HERO</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 p-0">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-1">
          
          <label className="swap swap-rotate btn btn-ghost btn-circle text-base-content hover:bg-base-200">
            {/* this hidden checkbox controls the state */}
            <input 
              onChange={handleThemeToggle} 
              type="checkbox" 
              checked={theme === "dark"}
              className="theme-controller" 
              value="synthwave" 
            />
            
            {/* sun icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            
            {/* moon icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>
          {/* ------------------------------- */}

          {user ? (
            <div className="flex items-center gap-4">
              {/* Dashboard CTA (Desktop) */}
              <Link 
                to="/dashboard" 
                className="hidden md:flex btn btn-ghost bg-neutral text-neutral-content hover:bg-neutral-focus rounded-2xl px-6 gap-2 border-none transition-all shadow-lg"
              >
                <MdDashboard size={18} /> Dashboard
              </Link>

              {/* User Menu Dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="relative group">
                  <div className="w-11 h-11 rounded-2xl p-[2px] bg-gradient-to-tr from-red-500 to-pink-500 transition-transform active:scale-95">
                    <div className="w-full h-full bg-base-100 rounded-[calc(1rem-1px)] p-[2px]">
                        <img className="w-full h-full object-cover rounded-[calc(1rem-2px)] shadow-inner" src={user.photoURL || "https://i.ibb.co/mJR7z9S/user.png"} alt="User" />
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-base-100 rounded-full"></div>
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-2xl bg-base-100 rounded-3xl w-64 mt-6 border border-base-200 animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="px-4 py-3 mb-2 bg-base-200 rounded-2xl">
                    <p className="text-xs font-black text-base-content/50 uppercase tracking-widest">Signed in as</p>
                    <p className="font-bold text-base-content truncate">{user.displayName || "Hero User"}</p>
                    <p className="text-[10px] text-base-content/60 truncate">{user.email}</p>
                  </div>
                  
                  <div className="h-[1px] bg-base-200 my-2 mx-2"></div>
                  
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="rounded-xl py-3 font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 group"
                    >
                      Logout <IoLogOut className="text-2xl ml-auto transition-transform group-hover:translate-x-1" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-error text-white rounded-2xl px-8 border-none shadow-xl shadow-red-100 hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden btn btn-ghost btn-circle text-base-content"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`lg:hidden fixed left-4 right-4 mt-2 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
          <ul className="menu bg-base-100/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-base-200 gap-2">
            {navLinks}
            {user && (
               <Link to="/dashboard" className="btn btn-neutral rounded-2xl mt-2 w-full">Go to Dashboard</Link>
            )}
          </ul>
      </div>
    </div>
  );
};

export default Navbar;