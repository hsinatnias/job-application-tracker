import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import StatusBadge from '../components/StatusBadge'
const statusColor = {
    wishlist: 'bg-yellow-100 text-yellow-800',
    applied: 'bg-blue-100 text-blue-800',
    interview: 'bg-indigo-100 text-indigo-800',
    offer: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
}

const statuses = ['all', 'wishlist', 'applied', 'interview', 'offer', 'rejected']


export default function Dashboard({ jobs, setJobs }) {
    const [filter, setFilter] = useState('all')

    const filteredJobs =
        filter === 'all' ? jobs : jobs.filter((job) => job.status === filter)
    const navigate = useNavigate()

    const handleEdit = (id) => {
        alert(`Edit Job ${id} (Yet to implement)`)
    }

    const handleDelete = (id) => {
        const confirmDelete = confirm('Are you sure you want to delete the job?')
        if (confirmDelete) {
            //alert(`Deleting job ${id} yet to implement`)
            setJobs((prevJobs)=> prevJobs.filter((job)=>job.id!==id))
            toast.success("Job deleted successfully")

        }
    }

    return (
        <div className="p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">📊 Job Applications</h2>

            {/* Filter Buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded text-sm border transition ${filter === status
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

                 <button 
                    onClick={()=>{
                        if(confirm('Are you sure you want to reset all job data?')){
                            localStorage.removeItem('jobs')
                        }
                    }}
                className="text-sm text-red-600 underline mt-4 mb-4">
                    Reset All Jobs
                </button>
            {/* Job Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               
                {filteredJobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white bg-gray-100 dark:bg-gray-900 border rounded-lg shadow-sm p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg text-gray-900 dark:text-gray-100 font-semibold">{job.position}</h3>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                        {/*
                        status display
                        */}
                        <div className="mt-4 flex justify-between items-center">

                            <StatusBadge status={job.status} />
                            <span className="text-xs text-gray-400">{job.appliedDate}</span>
                        </div>
                        {/*
                            view/Edit/Delete buttons
                        */}
                        <div className="mt-3 flex justify-between gap-2 text-sm">
                            <button
                                onClick={() => navigate(`/job/${job.id}`)}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </button>
                            <button
                                onClick={() => handleEdit(job.id)}
                                className="text-green-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(job.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
