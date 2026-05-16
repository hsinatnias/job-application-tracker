import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import StatusBadge from '../components/StatusBadge'
import mockJobs from '../data/mockJobs'
import { Briefcase, MapPin, Calendar, Eye, Pencil, Trash2 } from 'lucide-react'

const statuses = ['all', 'wishlist', 'applied', 'interview', 'offer', 'rejected']

const summaryStats = [
  { label: 'Wishlist', status: 'wishlist', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { label: 'Applied', status: 'applied', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { label: 'Interview', status: 'interview', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { label: 'Offer', status: 'offer', color: 'bg-green-50 text-green-700 border-green-100' },
  { label: 'Rejected', status: 'rejected', color: 'bg-red-50 text-red-700 border-red-100' },
]

export default function Dashboard({ jobs, setJobs }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredJobs = jobs
    .filter((job) => filter === 'all' || job.status === filter)
    .filter((job) =>
      search === '' ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
    )

  const handleEdit = (id) => navigate(`/add?id=${id}`)

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      setJobs((prev) => prev.filter((job) => job.id !== id))
      toast.success('Job deleted successfully')
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Applications</h2>
          <p className="text-sm text-gray-400 mt-0.5">{jobs.length} total applications</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors w-fit"
        >
          + Add new job
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {summaryStats.map((stat) => (
          <button
            key={stat.status}
            onClick={() => setFilter(stat.status)}
            className={`${stat.color} border rounded-xl p-3 text-left transition-all hover:shadow-sm ${
              filter === stat.status ? 'ring-2 ring-offset-1 ring-indigo-400' : ''
            }`}
          >
            <p className="text-2xl font-bold">
              {jobs.filter((j) => j.status === stat.status).length}
            </p>
            <p className="text-xs font-medium mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by company, position or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition bg-white"
        />
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                filter === status
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {' '}({status === 'all' ? jobs.length : jobs.filter(j => j.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Job cards */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-600 font-medium">No jobs found</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter === 'all'
              ? 'Add your first job application to get started'
              : `No jobs with status "${filter}"`}
          </p>
          <button
            onClick={() => navigate('/add')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            + Add job
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between hover:border-gray-200 hover:shadow-sm transition-all"
            >
              {/* Top */}
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">{job.position}</h3>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Briefcase size={12} />
                  {job.company}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={12} />
                  {job.location || '—'}
                </div>
                {job.appliedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={12} />
                    {new Date(job.appliedDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                )}
              </div>

              {/* Notes preview */}
              {job.notes && (
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2 border-t border-gray-50 pt-3">
                  {job.notes}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <button
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  <Eye size={13} /> View
                </button>
                <button
                  onClick={() => handleEdit(job.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={() => {
            if (confirm('Reset all job data to defaults?')) {
              localStorage.removeItem('jobs')
              setJobs(mockJobs)
              toast.success('Jobs reset to default')
            }
          }}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
        >
          Reset all jobs
        </button>
      </div>

    </div>
  )
}