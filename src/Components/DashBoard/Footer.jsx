import React from "react";
import { Link } from "react-router";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaHeart, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaTint
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section: Branding & Links */}
      <div className="max-w-7xl mx-auto pt-16 pb-10 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <FaTint className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                Blood<span className="text-red-600">Hero</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting heroes with those in need. Our platform streamlines blood donation requests to save lives faster through community and technology.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/search" className="hover:text-red-500 transition-colors">Search Donors</Link></li>
              <li><Link to="/dashboard/add-request" className="hover:text-red-500 transition-colors">Donation Requests</Link></li>
              <li><Link to="/tips" className="hover:text-red-500 transition-colors">Health Tips</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-red-600" />
                <span>123 Medical Plaza, <br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-600" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-red-600" />
                <span>support@bloodhero.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} RedHope. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-red-600 animate-pulse" /> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;