import { useState } from 'react'


const statusColor = {
  wishlist: 'bg-yellow-100 text-yellow-800',
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-indigo-100 text-indigo-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const statuses = ['all', 'wishlist', 'applied', 'interview', 'offer', 'rejected']

export default function Dashboard({jobs}) {
  const [filter, setFilter] = useState('all')

  const filteredJobs =
    filter === 'all' ? jobs : jobs.filter((job) => job.status === filter)

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">📊 Job Applications</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded text-sm border transition ${
              filter === status
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{job.position}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  statusColor[job.status] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <span className="text-xs text-gray-400">{job.appliedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
