import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
    const { user } = useAuth()

    if (!user) return <p className="p-4">Please login to view your profile.</p>

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>UID:</strong> {user.uid}</p>
                {/* Add more fields if needed */}
            </div>
        </div>
    )
}

export default Profile