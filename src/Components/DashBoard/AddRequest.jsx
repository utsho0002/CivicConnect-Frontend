import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { 
  FaUser, FaEnvelope, FaUserEdit, FaTint, FaMapMarkerAlt, 
  FaHospital, FaCalendarAlt, FaClock, FaCommentDots, FaHeart 
} from "react-icons/fa";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [district, setDistrict] = useState('');
  const [upzila, setUpzila] = useState('');

  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    fetch("/distric.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts));

    fetch("/upzila.json")
      .then((res) => res.json())
      .then((data) => setUpzilas(data.upazilas));
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const recipientName = form.recipient_name.value;
    const recipientDistrict = district;
    const recipientUpazila = upzila;
    const hospitalName = form.hospital_name.value;
    const fullAddress = form.full_address.value;
    const bloodGroup = form.blood_group.value;
    const donationDate = form.donation_date.value;
    const donationTime = form.donation_time.value;
    const requestMessage = form.message.value;

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      donationStatus: "pending",
    };

    axiosSecure.post('/request', donationRequest)
      .then(res => {
        Swal.fire({
          title: 'Request Submitted!',
          text: 'Your blood donation request is pending.',
          icon: 'success',
          confirmButtonColor: '#dc2626',
          confirmButtonText: 'Ok'
        });
        form.reset();
        setDistrict('');
        setUpzila('');
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl w-full bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <FaHeart className="animate-pulse" /> Create Blood Request
            </h2>
            <p className="text-red-100 opacity-80 mt-1">Provide the details below to find a life-saving donor.</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        </div>

        <form onSubmit={handleRequest} className="p-8 md:p-12 space-y-10">
          
          {/* Section 1: The Requester (Automated) */}
          <section>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center text-sm font-bold">01</div>
                <h3 className="font-bold text-base-content/40 uppercase tracking-widest text-xs">Requester Identity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-base-content/70">Your Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="input w-full pl-12 bg-base-200 border-none rounded-xl h-12 text-base-content/50 font-medium cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label font-bold text-base-content/70">Your Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="input w-full pl-12 bg-base-200 border-none rounded-xl h-12 text-base-content/50 font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: The Patient */}
          <section>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center text-sm font-bold">02</div>
                <h3 className="font-bold text-base-content/40 uppercase tracking-widest text-xs">Patient & Requirement</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-base-content/70">Recipient Name</label>
                <div className="relative">
                  <FaUserEdit className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="text"
                    name="recipient_name"
                    placeholder="Enter patient full name"
                    className="input w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 text-base-content"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Blood Group Needed</label>
                <div className="relative">
                  <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                  <select
                    name="blood_group"
                    defaultValue=""
                    className="select w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 font-medium text-base-content"
                    required
                  >
                    <option value="" disabled>Select Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Logistics */}
          <section>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center text-sm font-bold">03</div>
                <h3 className="font-bold text-base-content/40 uppercase tracking-widest text-xs">Location & Timing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-base-content/70">District</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <select
                    name="district"
                    className="select w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 font-medium text-base-content"
                    required
                    value={district}
                    onChange={(e)=>setDistrict(e.target.value)}
                  >
                    <option value="" disabled>Select District</option>
                    {districts.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Upazila</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <select
                    name="upzila"
                    className="select w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 font-medium text-base-content"
                    required
                    value={upzila}
                    onChange={(e)=>setUpzila(e.target.value)}
                  >
                    <option value="" disabled>Select Upazila</option>
                    {upzilas.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Hospital Name</label>
                <div className="relative">
                  <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="text"
                    name="hospital_name"
                    placeholder="e.g. Apollo Hospital"
                    className="input w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 text-base-content"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Full Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="text"
                    name="full_address"
                    placeholder="Street, Floor, Ward No..."
                    className="input w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 text-base-content"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Need Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="date"
                    name="donation_date"
                    className="input w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 text-base-content"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Need Time</label>
                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                  <input
                    type="time"
                    name="donation_time"
                    className="input w-full pl-12 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-xl h-12 text-base-content"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Message */}
          <section>
            <div className="form-control">
                <label className="label font-bold text-base-content/70">Case Details & Message</label>
                <div className="relative">
                    <FaCommentDots className="absolute left-4 top-4 text-base-content/30" />
                    <textarea
                        name="message"
                        className="textarea w-full pl-12 pt-3 bg-base-200/50 border-none focus:ring-2 ring-red-100 dark:ring-red-900/30 rounded-2xl h-32 text-base text-base-content"
                        placeholder="Please describe the patient's condition and how many bags are needed..."
                        required
                    ></textarea>
                </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
                className="btn btn-error w-full h-16 text-white text-lg rounded-2xl shadow-xl shadow-red-200 dark:shadow-none border-none hover:scale-[1.01] transition-all flex gap-3" 
                type="submit"
            >
              <FaHeart className="text-xl" /> Broadcast Blood Request
            </button>
            <p className="text-center text-base-content/40 text-xs font-medium mt-4">
              Your request will be visible to all eligible donors in your area immediately.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;