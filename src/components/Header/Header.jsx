import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Categories",
      slug: "/category",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
      <Container>
        <nav className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
              <Logo width="60px" />
            </div>

            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800">BlogForge</h1>
              <p className="text-xs text-gray-500">Share • Learn • Inspire</p>
            </div>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-5 py-2 rounded-full text-gray-700 font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {/* Profile */}
            {authStatus && userData && (
              <li
                className="relative ml-3"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg hover:scale-105 transition duration-300">
                  {userData?.name?.charAt(0)?.toUpperCase()}
                </div>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                    open
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-3"
                  }`}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-3">
                      {userData?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <h3 className="font-semibold text-lg">{userData.name}</h3>

                    <p className="text-sm text-blue-100 break-all">
                      {userData.email}
                    </p>
                  </div>

                  {/* Menu */}
                  <div className="p-3">
                    <button
                      onClick={() => navigate("/user-posts")}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                      📝 My Posts
                    </button>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                      👤 Profile
                    </button>

                    <div className="my-3 border-t"></div>

                    <div className="px-2">
                      <LogoutBtn />
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
