import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    // Fixed: Added bg-base-100 for proper theme background
    <section className="py-24 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Info Side */}
          <div className="lg:w-1/3">
            {/* Fixed: text-gray-900 -> text-base-content */}
            <h2 className="text-4xl font-bold text-base-content mb-6">Let's Talk!</h2>
            {/* Fixed: text-gray-600 -> text-base-content/70 */}
            <p className="text-base-content/70 mb-10 leading-relaxed">
              Have questions about donating or need urgent assistance? Our team is here to help you 24/7.
            </p>

            <div className="space-y-8">
              {/* Contact Item 1 */}
              <div className="flex items-center gap-5">
                {/* Fixed: bg-white -> bg-base-200, Added dark mode text handling */}
                <div className="w-12 h-12 bg-base-200 shadow-sm flex items-center justify-center rounded-xl text-red-600">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-lg font-bold text-base-content">+880 123 456 789</p>
                </div>
              </div>

              {/* Contact Item 2 */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-base-200 shadow-sm flex items-center justify-center rounded-xl text-red-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-base-content">support@bloodhero.com</p>
                </div>
              </div>

              {/* Contact Item 3 */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-base-200 shadow-sm flex items-center justify-center rounded-xl text-red-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-bold tracking-widest">Location</p>
                  <p className="text-lg font-bold text-base-content">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form Side */}
          <div className="lg:w-2/3 w-full">
            {/* Fixed: bg-white -> bg-base-100, border-gray-50 -> border-base-200 */}
            <div className="bg-base-100 p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-base-200">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content">Full Name</span></label>
                  {/* Fixed: bg-gray-50 -> bg-base-200, focus:bg-white -> focus:bg-base-100 */}
                  <input type="text" placeholder="Your Name" className="input input-bordered bg-base-200 focus:bg-base-100 border-none h-14 rounded-xl text-base-content placeholder:text-base-content/40" />
                </div>
                
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content">Email Address</span></label>
                  <input type="email" placeholder="email@example.com" className="input input-bordered bg-base-200 focus:bg-base-100 border-none h-14 rounded-xl text-base-content placeholder:text-base-content/40" />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text font-bold text-base-content">Subject</span></label>
                  <input type="text" placeholder="How can we help?" className="input input-bordered bg-base-200 focus:bg-base-100 border-none h-14 rounded-xl text-base-content placeholder:text-base-content/40" />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text font-bold text-base-content">Message</span></label>
                  <textarea className="textarea textarea-bordered bg-base-200 focus:bg-base-100 border-none h-32 rounded-xl text-base-content placeholder:text-base-content/40" placeholder="Write your message here..."></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                  {/* Button kept as error (red) but shadow adjusted */}
                  <button className="btn btn-error w-full h-14 text-white text-lg rounded-xl shadow-lg shadow-red-200 dark:shadow-none group">
                    Send Message
                    <FaPaperPlane className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;