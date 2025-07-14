import { Outlet, NavLink } from "react-router-dom"
const Layout = ()=>{
    return(
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
                <h1 className="text-2xl font-bold mb-6">Job Tracker</h1>
                <NavLink
                    to="/"
                    end
                    className={({isActive})=>
                    `py-2 px-4 rounded mb-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/add"
                    className={({isActive})=>
                    `py-2 px-4 rounded mb-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Add Job
                </NavLink>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet/>
            </main>
        </div>
    )
}
export default Layout