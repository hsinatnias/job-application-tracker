import { useAuth } from "../contexts/AuthContext"
import { User, Mail, Shield } from 'lucide-react'

const Profile = () => {
    const { user } = useAuth()

    if (!user) return (
        <div className="text-center py-20">
            <p className="text-gray-500">Please login to view your profile.</p>
        </div>
    )

    return (
        <div className="max-w-xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                <p className="text-sm text-gray-400 mt-1">Your account information</p>
            </div>

            {/* Avatar card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                    {user?.email?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-400 mt-0.5">Job Tracker account</p>
                </div>
            </div>

            {/* Details card */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                    <Mail size={15} className="text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-400">Email address</p>
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                    <Shield size={15} className="text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-400">User ID</p>
                        <p className="text-sm font-medium text-gray-900 font-mono text-xs">{user.uid}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4">
                    <User size={15} className="text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-400">Account status</p>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                            Active
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile