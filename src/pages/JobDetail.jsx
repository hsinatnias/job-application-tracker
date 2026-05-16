import { useParams, Link, useNavigate } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"

const JobDetail = ({ jobs }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-red-500">Job not found 😢</h2>
                <Link to="/" className="text-sm sm:text-base text-blue-600 underline">Back to Dashboard</Link>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 shadow rounded-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">{job.position}</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">{job.company}</p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">{job.location}</p>

            <div className="mb-2 flex items-center gap-2">
                <strong className="text-gray-700 dark:text-gray-300">Status:</strong>
                <StatusBadge status={job.status} />
            </div>

            <div className="mb-2">
                <span className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Applied On:</span>
                <span className="text-sm text-gray-800 dark:text-gray-400">
                    {job.appliedDate
                        ? new Date(job.appliedDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })
                        : '—'}
                </span>
            </div>

            <div className="mb-4">
                <span className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                <p className="text-sm text-gray-700 dark:text-gray-400 whitespace-pre-wrap mt-1">
                    {job.notes || 'No notes added.'}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full sm:w-auto text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                    ← Back
                </button>
                <Link
                    to={`/add?id=${job.id}`}
                    className="w-full sm:w-auto text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
                >
                    Edit
                </Link>
            </div>
        </div>
    )

}
export default JobDetail