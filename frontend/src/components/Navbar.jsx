import React from "react";
import { Link, useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-neutral-900 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Title */}
        <Link to={user ? "/tasks" : "/"}>
          <h1 className="text-2xl font-bold text-green-500">Task Manager</h1>
        </Link>

        {/* Right side */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-3xl bg-green-600 text-black font-semibold hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-3xl bg-gray-200 text-black font-semibold hover:bg-gray-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/create">
                <button className="flex items-center font-semibold gap-2 bg-green-600 text-black px-4 py-2 rounded-3xl hover:bg-green-700 transition-colors">
                  <PlusIcon className="h-5 w-5" />
                  <span>New Task</span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-3xl bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
