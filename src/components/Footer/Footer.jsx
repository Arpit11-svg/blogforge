import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaGlobe,
  FaLaptopCode,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-gray-300">
      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Logo */}
          <div>
            <div className="mb-6">
              <Logo width="120px" />
            </div>

            <p className="text-gray-400 leading-7 mb-6">
              BlogForge is a modern blogging platform where ideas meet
              creativity. Discover articles, share knowledge and connect with
              amazing writers.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/Arpit11-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com/ChoudharyArpit_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Company</h3>

            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className="hover:text-blue-400 transition"
                >
                  All Blogs
                </Link>
              </li>

              <li>
                <Link to="/category" className="hover:text-blue-400 transition">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Support</h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/support?type=contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/support?type=issue"
                  className="hover:text-blue-400 transition"
                >
                  Report Issue
                </Link>
              </li>

              <li>
                <Link
                  to="/support?type=feedback"
                  className="hover:text-blue-400 transition"
                >
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>

            <div className="space-y-5">
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-blue-400" />
                <span>support@blogforge.com</span>
              </div>

              <div className="flex gap-3 items-center">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Ghaziabad, Uttar Pradesh</span>
              </div>

              <a
                href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 items-center hover:text-blue-400 transition"
              >
                <FaLaptopCode className="text-blue-400" />

                <span className="group-hover:translate-x-1 transition">
                  Developed by Arpit Choudhary
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BlogForge. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-white cursor-pointer transition">
              Built with React
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Appwrite
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
