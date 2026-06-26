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
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {authStatus && userData && (
              <div
                className="relative group"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center cursor-pointer">
                  {userData?.name?.charAt(0)?.toUpperCase()}
                </div>

                {open && (
                  <div className="absolute right-0 w-64 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block z-50">
                    <h3 className="font-semibold">{userData.name}</h3>
                    <p className="text-sm text-gray-500 break-all">
                      {userData.email}
                    </p>

                    <hr className="my-3" />

                    <button
                      onClick={() => navigate("/user-posts")}
                      className="block w-full text-left py-2 hover:text-blue-600 cursor-pointer"
                    >
                      My Posts
                    </button>

                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full text-left py-2 hover:text-blue-600 cursor-pointer"
                    >
                      Profile
                    </button>

                    <div className="mt-2 border-t pt-2">
                      <LogoutBtn />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
