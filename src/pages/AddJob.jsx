import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from 'react-hot-toast'

const AddJob = ({ setJobs, jobs }) => {
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

     const handleChange = (e) => {
          const { name, value } = e.target
          setFormData({ ...formData, [name]: value })
     }

     const handleSubmit = (e) => {
          e.preventDefault()

          if (editId) {
               const updatedJob = { ...formData, id: editId }
               setJobs((prev) =>prev.map((job) => job.id === editId ? updatedJob : job))
               toast.success('Job updated successfully')
          } else {
               const newJob = {
                    ...formData,
                    id: Date.now().toString(),
                    appliedDate: new Date().toISOString().split('T')[0],
               }
               setJobs((prev) => [newJob, ...prev])
               toast.success('Job added successfully')
          }

          navigate('/')
     }
     useEffect(() => {
          if (editId) {
               const jobToEdit = jobs.find((job) => job.id === editId)
               if (jobToEdit) {
                    setFormData(jobToEdit)
               }
          }
     }, [editId, jobs])
     return (
          <div className="max-w-xl mx-auto p-4">
               <h2 className="text-2xl font-semibold mb-6">
                    {editId ? 'Edit Job' : 'Add New Job'}     
               </h2>

               <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                         <label htmlFor="company" className="text-sm font-medium text-gray-700">Company<spand className="text-red-500">*</spand></label>
                         <input
                             id="company"
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white"

                              required
                         />
                    </div>
                    <div className="space-y-1">
                         <label htmlFor="position" className="text-sm font-medium text-gray-700">Position<spand className="text-red-500">*</spand></label>
                         <input
                             id="position"
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleChange}
                             className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white"
                              required
                         />
                    </div>

                    <div className="space-y-1">
                         <label htmlFor="location" className="text-sm font-medium text-gray-700">Location<spand className="text-red-500">*</spand></label>
                         <input
                             id="location"
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                             className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white"
                         />
                    </div>

                    <div className="space-y-1">
                         <label htmlFor="status" className="text-sm font-medium text-gray-700">Status<spand className="text-red-500">*</spand></label>
                         <select
                             id="status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white"
                              required
                         >
                              <option value="">-- Select Status --</option>
                              <option value="wishlist">Wishlist</option>
                              <option value="applied">Applied</option>
                              <option value="interview">Interview</option>
                              <option value="offer">Offer</option>
                              <option value="rejected">Rejected</option>
                         </select>
                    </div>

                    <div className="space-y-1">
                         <label className="text-sm font-medium text-gray-700">Notes<spand className="text-red-500">*</spand></label>
                         <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleChange}
                              rows="4"
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white"
                         ></textarea>
                    </div>

                    <div>
                         <button
                              type="submit"
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                         >
                              {editId ? 'Update Job' : 'Add Job'}
                         </button>
                    </div>
               </form>
          </div>
     )
}
export default AddJob