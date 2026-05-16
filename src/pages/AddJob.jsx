import { useEffect, useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { toast } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'

const statusOptions = [
  { value: 'wishlist', label: 'Wishlist', color: 'text-purple-600' },
  { value: 'applied', label: 'Applied', color: 'text-yellow-600' },
  { value: 'interview', label: 'Interview', color: 'text-blue-600' },
  { value: 'offer', label: 'Offer', color: 'text-green-600' },
  { value: 'rejected', label: 'Rejected', color: 'text-red-600' },
]

const AddJob = ({ jobs, addJob, updateJob }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('id')
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    status: '',
    notes: '',
  })

  useEffect(() => {
    if (editId) {
      const jobToEdit = jobs.find((job) => job.id === editId)
      if (jobToEdit) setFormData(jobToEdit)
    }
  }, [editId, jobs])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
        await updateJob(editId, formData)
        toast.success('Job updated successfully')
    } else {
        await addJob({
            ...formData,
            appliedDate: new Date().toISOString().split('T')[0],
        })
        toast.success('Job added successfully')
    }
    navigate('/')
}

  return (
    <div className="max-w-xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">
          {editId ? 'Edit job' : 'Add new job'}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {editId ? 'Update the job details below' : 'Fill in the details of your job application'}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google, Spotify, SAP"
              required
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              required
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Berlin, Germany · Remote"
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition bg-white"
            >
              <option value="">-- Select status --</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add any notes about this application..."
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              {editId ? 'Update job' : 'Add job'}
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default AddJob