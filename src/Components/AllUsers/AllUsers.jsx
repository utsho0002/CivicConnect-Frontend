import { useCallback, useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdAssignmentAdd, MdSecurity, MdPeopleAlt } from "react-icons/md";
import { FaUserShield, FaTint } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const { role } = useContext(AuthContext);

  const fetchUsers = useCallback(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => {});
  };

  const handleVoluteer = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => {});
  };

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-base-content flex items-center gap-3">
            <MdPeopleAlt className="text-red-600" /> User Management
          </h1>
          <p className="text-base-content/60 font-medium">Monitor user activity and manage system permissions.</p>
        </div>
        <div className="bg-base-100 px-6 py-3 rounded-2xl shadow-sm border border-base-200 flex items-center gap-4">
          <div className="flex flex-col border-r pr-4 border-base-200">
            <span className="text-[10px] font-black uppercase text-base-content/40">Total Users</span>
            <span className="text-xl font-black text-base-content">{users.length}</span>
          </div>
          <MdSecurity className="text-2xl text-base-content/30" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-base-100 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-200">
                <th className="py-6 pl-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest">User Profile</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Identity</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Status</th>
                <th className="py-6 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-center">Moderation</th>
                <th className="py-6 pr-8 text-base-content/40 uppercase text-[10px] font-black tracking-widest text-right">Promotions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {users?.map((data) => (
                <tr key={data._id} className="hover:bg-base-200/50 transition-colors group">
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 ring-2 ring-base-200 ring-offset-2 ring-offset-base-100">
                          <img src={data?.photoURL || "https://i.ibb.co/mR67mms/user.png"} alt="Profile" />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-base-content">{data?.name}</div>
                        <div className="text-xs text-base-content/50 font-medium tracking-tight">{data?.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        data?.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' : 
                        data?.role === 'volunteer' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-base-200 text-base-content/70'
                      }`}>
                        {data?.role}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-md">
                        <FaTint size={10} /> {data?.blood_grp}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      data?.status === "active" 
                      ? "bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30" 
                      : "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30"
                    }`}>
                      {data?.status}
                    </span>
                  </td>

                  <td className="py-5 text-center">
                    {data?.role !== 'admin' ? (
                      data?.status !== "active" ? (
                        <button
                          onClick={() => handleStatusChange(data?.email, "active")}
                          className="btn btn-sm bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400 border-none rounded-xl font-bold flex gap-2 mx-auto"
                        >
                          <AiFillCheckCircle className="text-lg" />
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(data?.email, "block")}
                          className="btn btn-sm bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border-none rounded-xl font-bold flex gap-2 mx-auto"
                        >
                          <AiFillCloseCircle className="text-lg" />
                          Block User
                        </button>
                      )
                    ) : (
                      <span className="flex items-center justify-center gap-1 text-base-content/30 font-bold text-xs uppercase tracking-tighter">
                        <FaUserShield /> System Protected
                      </span>
                    )}
                  </td>

                  <td className="py-5 pr-8 text-right">
                    <div className="flex justify-end gap-2">
                      {data?.role !== 'volunteer' && data?.role !== 'admin' && (
                        <button 
                          className="btn btn-sm bg-indigo-50 hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/20 dark:hover:bg-indigo-600 text-indigo-600 dark:text-indigo-300 border-none rounded-xl font-bold transition-all" 
                          onClick={() => handleVoluteer(data?.email, "volunteer")}
                        >
                          <MdAssignmentAdd /> Make Volunteer
                        </button>
                      )}
                      {data?.role === 'volunteer' && (
                        <button 
                          className="btn btn-sm bg-neutral hover:bg-neutral-focus text-neutral-content border-none rounded-xl font-bold transition-all" 
                          onClick={() => handleVoluteer(data?.email, "admin")}
                        >
                          <FaUserShield /> Promote to Admin
                        </button>
                      )}
                      {data?.role === 'admin' && (
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-xl">
                           <MdSecurity size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-6 px-4 flex items-center gap-2 text-base-content/40 text-sm font-medium">
         <FaInfoCircle className="text-blue-400" />
         <span>Admins cannot be blocked or downgraded directly from this panel for security reasons.</span>
      </div>
    </div>
  );
};

const FaInfoCircle = ({className}) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
    </svg>
)

export default AllUsers;