import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaLaptopCode,
} from "react-icons/fa";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright {new Date().getFullYear()}. All Rights
                  Reserved by BlogForge.
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://github.com/Arpit11-svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black text-2xl"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-700 text-2xl"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://x.com/ChoudharyArpit_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-sky-500 text-2xl"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/all-posts"
                  >
                    All Blogs
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/category"
                  >
                    All Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/support?type=contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/support?type=issue"
                  >
                    Report Issue
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/support?type=feedback"
                  >
                    Submit Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <FaEnvelope />
                <span>support@blogforge.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-900">
                <FaMapMarkerAlt />
                <span>Ghaziabad, Uttar Pradesh</span>
              </div>

              <a
                href="https://www.linkedin.com/in/arpit-choudhary-092706328/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 underline"
              >
                <div className="flex items-center gap-3 text-gray-900">
                  <FaLaptopCode className="text-lg" />
                  <span>Developed by Arpit Choudhary</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
