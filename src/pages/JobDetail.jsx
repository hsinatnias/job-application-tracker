import { useParams, useNavigate } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"
import { ArrowLeft, Briefcase, MapPin, Calendar, FileText, Pencil } from 'lucide-react'

const JobDetail = ({ jobs }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const job = jobs.find((job) => job.id === id)

    if (!job) {
        return (
            <div className="text-center py-20">
                <p className="text-4xl mb-3">😢</p>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Job not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm text-indigo-600 hover:underline"
                >
                    Back to Dashboard
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto">

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
            >
                <ArrowLeft size={14} /> Back
            </button>

            {/* Header card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{job.position}</h2>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
                            <Briefcase size={13} />
                            {job.company}
                        </div>
                        {job.location && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                <MapPin size={13} />
                                {job.location}
                            </div>
                        )}
                    </div>
                    <StatusBadge status={job.status} />
                </div>

                {job.appliedDate && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-4 border-t border-gray-50">
                        <Calendar size={12} />
                        Applied on {new Date(job.appliedDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </div>
                )}
            </div>

            {/* Notes card */}
            {job.notes && (
                <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText size={14} className="text-gray-400" />
                        <h3 className="text-sm font-medium text-gray-700">Notes</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {job.notes}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={() => navigate(`/add?id=${job.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                    <Pencil size={14} /> Edit job
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                >
                    Back to dashboard
                </button>
            </div>

        </div>
    )
}

export default JobDetail