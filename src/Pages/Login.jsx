import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router"; 
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaHeartbeat } from "react-icons/fa";
import Swal from "sweetalert2";


const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const EmailRef = useRef();
  const auth = getAuth();

  // Forgot Password
  const forgetPass = () => {
    const email = EmailRef.current.value;
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first to reset password.",
        confirmButtonColor: "#dc2626"
      });
    }
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Reset link sent to your email!",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        const errorMessage = err.code === 'auth/user-not-found' 
            ? "No account found with this email." 
            : err.message;
        setError(errorMessage);
      });
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Get Firebase ID Token
        const token = await user.getIdToken(true); 
        localStorage.setItem("fb_token", token); // save token

    

        const from = location.state?.from?.pathname || "/";
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 2000,
          customClass: { popup: 'bg-base-100 text-base-content' }
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setError("Invalid email or password. Please try again.");
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-base-200 transition-colors duration-300">
      <div className="max-w-5xl w-full bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-300/50 dark:shadow-black/50 overflow-hidden flex flex-col md:flex-row border border-base-200">
        
        {/* Left Side: Branding/Hero */}
        <div className="md:w-1/2 bg-gradient-to-br from-red-900 to-red-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FaHeartbeat className="text-3xl" />
                </div>
                <span className="font-black text-2xl tracking-tighter">BLOODHERO</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Welcome <br /> Back, Hero.
            </h1>
            <p className="text-red-100 text-lg leading-relaxed mb-8 font-medium opacity-90">
              "Your droplets of blood are the ocean of hope for someone in need. Log in to manage your donations."
            </p>
            
            <div className="flex gap-4 items-center">
                <div className="w-12 h-[2px] bg-white/50"></div>
                <span className="font-bold tracking-widest uppercase text-xs opacity-80">Secure Login System</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-base-content mb-2">Login</h2>
            <p className="text-base-content/60 font-medium">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-12 h-14 bg-base-200/50 focus:border-red-500 rounded-xl transition-all"
                  required
                  ref={EmailRef}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 pr-12 h-14 bg-base-200/50 focus:border-red-500 rounded-xl transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40 hover:text-red-500 transition-colors"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Forgot Password Link */}
              <label className="label">
                <span className="label-text-alt"></span>
                <button 
                    type="button"
                    onClick={forgetPass} 
                    className="label-text-alt link link-hover text-red-500 font-bold text-sm"
                >
                    Forgot password?
                </button>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error rounded-xl bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading}
                className="btn btn-error w-full h-14 text-white text-lg rounded-xl shadow-xl shadow-red-500/20 hover:scale-[1.02] transition-transform border-none font-bold"
            >
              {loading ? <span className="loading loading-spinner loading-md"></span> : "Login Now"}
            </button>

            {/* Register Link */}
            <div className="text-center pt-2">
                <p className="text-base-content/60 font-medium">
                Don’t have an account?{" "}
                <Link to="/auth/register" className="text-red-500 font-bold hover:underline ml-1">
                    Register
                </Link>
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
