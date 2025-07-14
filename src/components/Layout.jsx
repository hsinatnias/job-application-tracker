import { Outlet, NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Menu, User } from 'lucide-react'

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const dropdownRef = useRef()

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-gray-800 text-white flex justify-between items-center px-4 py-3 relative">
                <h1 className="text-xl font-bold">Job Tracker</h1>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
                        <User />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <Menu />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-14 right-4 bg-white text-black rounded shadow-md w-40 z-10"
                    >
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Profile</button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Logout</button>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-gray-800 text-white flex-col p-4 space-y-2 md:flex ${isOpen ? 'flex' : 'hidden'
                    } md:w-64 md:block`}
            >
                <h1 className="text-2xl font-bold mb-6 hidden md:block">Job Tracker</h1>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Add Job
                </NavLink>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 bg-gray-100">
                <Outlet />
            </main>
        </div>
    )
}
