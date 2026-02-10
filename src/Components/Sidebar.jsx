import { NavLink, useNavigate } from "react-router";
import { FaUsers, FaSignOutAlt, FaHeartbeat } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdAdminPanelSettings, MdSpaceDashboard } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { RiHome3Line } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaTableCellsRowUnlock } from "react-icons/fa6";
import logo from '../assets/image.png';
import Swal from "sweetalert2";

export default function Sidebar() {
  const { role, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // Helper function for cleaner NavLink classes
  // CHANGED: Added dark mode logic for shadows and hover backgrounds
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive 
        ? "bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none" 
        : "text-base-content/70 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
    }`;

  return (
    // CHANGED: bg-white -> bg-base-100, border-gray-100 -> border-base-200
    <aside className="w-72 lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4 lg:ml-4 my-4 bg-base-100 shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[2rem] border border-base-200 flex flex-col justify-between overflow-hidden transition-all duration-300">
      
      {/* Top Branding & User Profile */}
      <div>
        {/* CHANGED: border-gray-50 -> border-base-200 */}
        <div className="p-6 border-b border-base-200 mb-4">
            <div className="flex items-center gap-2 mb-6 justify-center">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                {/* CHANGED: text-gray-800 -> text-base-content */}
                <span className="font-black text-xl tracking-tighter text-base-content uppercase">
                    Admin<span className="text-red-600">Panel</span>
                </span>
            </div>

            {/* User Profile Card */}
            {/* CHANGED: bg-gray-50 -> bg-base-200 */}
            <div className="bg-base-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="relative">
                    {/* CHANGED: ring-white -> ring-base-100 */}
                    <img src={user?.photoURL} alt="User" className="w-12 h-12 rounded-xl object-cover ring-2 ring-base-100 shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-base-100 rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                    {/* CHANGED: text-gray-800 -> text-base-content */}
                    <p className="font-bold text-base-content truncate text-sm">{user?.displayName}</p>
                    {/* CHANGED: bg-red-50 -> dark:bg-red-900/30 */}
                    <span className="text-[10px] uppercase tracking-widest font-black text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-md">
                        {role}
                    </span>
                </div>
            </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4">
          {/* CHANGED: text-gray-400 -> text-base-content/40 */}
          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={linkClass}>
                <RiHome3Line className="text-xl" /> 
                <span className="font-semibold">Main Home</span>
              </NavLink>
            </li>

            {/* Manager/Admin Only */}
            {role !== "donor" && (
              <li>
                <NavLink to="/dashboard/all-request" className={linkClass}>
                  <FaTableCellsRowUnlock className="text-xl" /> 
                  <span className="font-semibold">All Requests</span>
                </NavLink>
              </li>
            )}

            {/* Admin Only */}
            {role === "admin" && (
              <li>
                <NavLink to="/dashboard/all-users" className={linkClass}>
                  <FaUsers className="text-xl" />
                  <span className="font-semibold">All Users</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/dashboard/my-request" className={linkClass}>
                <VscGitPullRequestNewChanges className="text-xl" /> 
                <span className="font-semibold">My Requests</span>
              </NavLink>
            </li>

            {/* Donor/Admin Only */}
            {(role === "donor" || role === "admin") && (
              <li>
                <NavLink to="/dashboard/add-request" className={linkClass}>
                  <IoIosAddCircle className="text-xl" /> 
                  <span className="font-semibold">Create Request</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Support & Logout */}
      {/* CHANGED: border-gray-50 -> border-base-200 */}
      <div className="p-4 border-t border-base-200">
        {/* CHANGED: bg-red-50 -> bg-red-50 dark:bg-red-900/20 */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 mb-4 relative overflow-hidden group cursor-pointer">
            <FaHeartbeat className="absolute -right-2 -bottom-2 text-5xl text-red-100 dark:text-red-900/40 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-red-600 relative z-10">Need Help?</p>
            <p className="text-[10px] text-red-400 relative z-10">Contact Support 24/7</p>
        </div>

        <button
          // CHANGED: text-gray-500 -> text-base-content/60, hover:bg-red-50 -> dark:hover:bg-red-900/20
          className="btn btn-ghost w-full flex items-center justify-start gap-3 text-base-content/60 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-lg" /> 
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}