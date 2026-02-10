import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaTint, FaHospital, FaCalendarAlt, FaArrowRight, FaFilter } from "react-icons/fa";
import { Link } from "react-router"; 

const Search = () => {
  const [upzilas, setUpzilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upzila, setUpzila] = useState("");

  useEffect(() => {
    // Ideally, replace these with your actual API endpoints
    axios.get("/upzila.json").then((res) => setUpzilas(res.data.upazilas));
    axios.get("/distric.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    const params = new URLSearchParams();
    if (bloodGroup) params.append("blood_grp", bloodGroup);
    if (district) params.append("district", district);
    if (upzila) params.append("upzila", upzila);

    // Using the URL provided in your snippet
    axios
      .get(`https://assignment11-mocha-kappa.vercel.app/search-request?${params.toString()}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 pb-20 transition-colors duration-300">
      
      {/* 1. Header Hero Section */}
      <div className="bg-neutral text-neutral-content pt-20 pb-32 px-4 text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="bg-red-600/20 text-red-500 font-bold text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block border border-red-600/20">
            Emergency Network
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Find a <span className="text-red-500 underline decoration-4 underline-offset-8">Mission</span> to Help
          </h1>
          <p className="text-neutral-content/60 font-medium text-lg">
            Search across our entire network for active blood requests in your area.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20">
        {/* 2. Search Bar Card */}
        <div className="bg-base-100 p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-base-300/50 dark:shadow-black/50 border border-base-200 relative z-20">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end" onSubmit={handleSearch}>
            
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/50 uppercase tracking-widest">Blood Type</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="select select-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-2xl h-14"
                >
                  <option value="">Any Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/50 uppercase tracking-widest">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="select select-bordered w-full bg-base-200/50 focus:border-red-500 rounded-2xl h-14"
              >
                <option value="">All Districts</option>
                {districts?.map((data) => <option key={data.id} value={data.name}>{data.name}</option>)}
              </select>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/50 uppercase tracking-widest">Upazila</label>
              <select
                value={upzila}
                onChange={(e) => setUpzila(e.target.value)}
                className="select select-bordered w-full bg-base-200/50 focus:border-red-500 rounded-2xl h-14"
              >
                <option value="">All Upazilas</option>
                {upzilas.map((data) => <option key={data.id} value={data.name}>{data.name}</option>)}
              </select>
            </div>

            <button
              className="btn btn-error text-white w-full h-14 shadow-lg shadow-red-500/40 rounded-2xl border-none text-lg font-bold group transition-all hover:scale-[1.02]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaSearch /> Search <FaArrowRight className="hidden group-hover:block transition-all" />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* 3. Results Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-xl font-black text-base-content uppercase tracking-tighter flex items-center gap-2">
              {hasSearched ? (
                 <>Found <span className="text-red-500">({results.length})</span> Missions</>
              ) : (
                 <><FaFilter className="text-red-500" /> Start your search</>
              )}
            </h2>
            <div className="h-[2px] flex-1 bg-base-300 ml-6 hidden md:block rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.length > 0 ? (
              results.map((req) => (
                <div
                  key={req._id}
                  className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 rounded-[2rem] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex flex-col items-center justify-center text-red-600 dark:text-red-400 font-black text-xl shadow-inner border border-red-100 dark:border-red-900/30">
                        {req.blood_grp || req.bloodGroup}
                        <FaTint className="text-[10px] opacity-40" />
                      </div>
                      <div className={`badge badge-lg gap-2 font-bold uppercase tracking-widest text-[10px] py-4 border-none ${
                        req.donationStatus === "pending"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      }`}>
                        {req.donationStatus}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-base-content mb-4 line-clamp-1">
                      {req.recipientName}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-base-content/70 font-medium">
                        <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/40">
                           <FaMapMarkerAlt />
                        </div>
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-base-content/70 font-medium">
                        <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/40">
                           <FaCalendarAlt />
                        </div>
                        {req.donationDate}
                        <span className="text-xs opacity-50 ml-auto">{req.donationTime}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-base-content/70 font-medium">
                        <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/40">
                           <FaHospital />
                        </div>
                        <span className="truncate">{req.hospitalName}</span>
                      </div>
                    </div>
                  </div>

                  <Link  
                    to={`/dashboard/view-details/${req._id}`} 
                    className="btn btn-neutral w-full mt-8 rounded-xl h-12 border-none font-bold group-hover:bg-red-600 group-hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              !loading && (
                <div className="col-span-full py-24 text-center">
                  <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="text-3xl text-base-content/20" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-2">
                    {hasSearched ? "No matching requests" : "Find who needs help"}
                  </h3>
                  <p className="text-base-content/50 max-w-xs mx-auto">
                    {hasSearched 
                      ? "Try broadening your search by selecting 'All Districts' or a different blood type." 
                      : "Adjust the filters above to browse active blood donation missions."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;