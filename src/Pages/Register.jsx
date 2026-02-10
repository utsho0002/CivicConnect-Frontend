import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaImage, FaMapMarkerAlt, FaTint, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const { CreateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);

  const [upzilas, setUpzilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upzila, setUpzila] = useState("");

  useEffect(() => {
    // Ensure these JSON files exist in your public folder
    axios.get("/upzila.json").then((res) => setUpzilas(res.data.upazilas));
    axios.get("/distric.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const blood_grp = form.blood_grp.value;
    const file = form.photo.files[0];

    // --- Validation ---
    if (name.length < 5) return setNameError("Name must be at least 5 characters");
    if (password.length < 6) return setPassError("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return setPassError("Password needs uppercase & lowercase letters");
    }

    setNameError("");
    setPassError("");
    setLoading(true);

    try {
      // 1. Upload to ImgBB
      const formData = new FormData();
      formData.append("image", file);
      
      // Note: Ideally, move this key to .env file (VITE_IMGBB_KEY)
      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=ee8ecd5f85ee03fcb1c927a9e037229a",
        formData
      );
      const photoURL = imgRes.data.data.display_url;

      // 2. Create Firebase User
      const result = await CreateUser(email, password);
      
      // 3. Update Profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // 4. Save to MongoDB
      const userInfo = {
        name,
        email,
        photoURL,
        blood_grp,
        district,
        upzila,
        role: 'donor',
        status: 'active'
      };
      
      const dbRes = await axios.post("https://assignment11-mocha-kappa.vercel.app/users", userInfo);

      if (dbRes.data.insertedId || dbRes.status === 200) {
        // 5. Update local context manually for instant UI update
        setUser({ ...result.user, displayName: name, photoURL: photoURL });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Welcome to the Hero Network!",
          showConfirmButton: false,
          timer: 2000,
          customClass: { popup: 'bg-base-100 text-base-content' }
        });

        // 6. Final Redirect
        setLoading(false);
        navigate("/"); 
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
        confirmButtonColor: "#dc2626"
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl w-full bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-300/50 dark:shadow-black/50 overflow-hidden border border-base-200">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-700 to-rose-600 p-10 text-white text-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <FaTint className="text-3xl animate-bounce" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tight">Join the Mission</h1>
                <p className="text-red-100 opacity-90 mt-2 font-medium">Create an account to donate blood & save lives</p>
            </div>
        </div>

        {/* Form Section */}
        <form className="p-8 md:p-12" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Name */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" 
                    required 
                />
              </div>
              {nameError && <p className="text-red-500 text-xs mt-1 font-bold">{nameError}</p>}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" 
                    required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••"
                    className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" 
                    required 
                />
              </div>
              {passError && <p className="text-red-500 text-xs mt-1 font-bold">{passError}</p>}
            </div>

            {/* Photo Upload */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Profile Picture</label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input 
                    type="file" 
                    name="photo" 
                    className="file-input file-input-bordered file-input-ghost w-full pl-12 bg-base-200/50 rounded-xl h-12 text-sm pt-2" 
                    required 
                />
              </div>
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Blood Group</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                <select name="blood_grp" className="select select-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" required defaultValue="">
                  <option value="" disabled>Pick a Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Location Group (Split in 2 on mobile, spans 1 on desktop if needed, but here we keep grid flow) */}
            <div className="form-control">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">District</label>
              <div className="relative">
                 <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                 <select value={district} onChange={(e) => setDistrict(e.target.value)} name="district" className="select select-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" required>
                    <option value="" disabled>Select District</option>
                    {districts?.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                 </select>
              </div>
            </div>

            <div className="form-control md:col-span-2 lg:col-span-1">
              <label className="label font-bold text-base-content/60 text-xs uppercase tracking-wider">Upazila</label>
               <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <select value={upzila} onChange={(e) => setUpzila(e.target.value)} name="upzila" className="select select-bordered w-full pl-12 bg-base-200/50 focus:border-red-500 rounded-xl h-12" required>
                    <option value="" disabled>Select Upazila</option>
                    {upzilas?.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                  </select>
               </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button 
                type="submit" 
                disabled={loading} 
                className="btn btn-error w-full h-14 text-white text-lg rounded-xl shadow-xl shadow-red-500/30 border-none hover:scale-[1.01] transition-transform"
            >
                {loading ? <span className="loading loading-spinner loading-md"></span> : "Create Account"}
            </button>
            
            <p className="text-center text-sm text-base-content/60">
                Already a hero? <Link to="/login" className="text-red-500 font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;