import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, User, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useTheme  from "../hooks/useTheme.js";


export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut(auth)
    navigate("/login")
  }
  const [darkMode, setDarkMode] = useTheme()

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800 text-white flex justify-between items-center px-4 py-3 relative z-40">
        <h1 className="text-xl font-bold">Job Tracker</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="focus:outline-none"
          >
            {user?.photoURL ? (
                <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
            ) : (
                <div className="w-8 h-8 bg-neutral-600 text-white rounded-full flex items-center justify-center font-bold">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </div>
            )}

          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-14 right-4 bg-white text-black rounded shadow-md w-40 z-10"
          >
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:w-72 bg-gray-900 text-white flex flex-col p-4 space-y-2
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          z-40 md:translate-x-0 md:flex h-full md:h-auto
        `}
      >
        <div className="flex items-center gap-2 mb-4">
          {user?.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
          ) : (
              <div className="w-8 h-8 bg-neutral-600 text-white rounded-full flex items-center justify-center font-bold">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </div>
          )}
          <span className="text-sm text-gray-300">{user?.email}</span>
        </div>

        <h1 className="text-2xl font-bold mb-6 hidden md:block">Job Tracker</h1>
        <NavLink
          to="/"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/add"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
            }`
          }
        >
          Add Job
        </NavLink>
        <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
                `py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
            }
                 >
          Profile
        </NavLink>
        <NavLink
          to="/resume"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
              `py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
          }
              >
          Resume

        </NavLink>
        <NavLink
            to="/resume_preview"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
                `py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
            }
        >
          Resume Preview

        </NavLink>
        <NavLink
          onClick={handleLogout}
          className="py-2 px-4 rounded hover:bg-gray-600 text-left"
        >
          Logout
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gray-100">
        <Outlet />
      </main>
{/*<button*/}
{/*    onClick={() => setDarkMode(!darkMode)}*/}
{/*    className="text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded"*/}
{/*>*/}
{/*    {darkMode ? '🌙 Dark' : '☀️ Light'}*/}
{/*</button>*/}
    </div>
  );
}
