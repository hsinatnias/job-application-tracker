import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

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
          } else {
               const newJob = {
                    ...formData,
                    id: Date.now().toString(),
                    appliedDate: new Date().toISOString().split('T')[0],
               }
               setJobs((prev) => [newJob, ...prev])
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
                    <div>
                         <label className="block mb-1 text-sm font-medium">Company</label>
                         <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                              required
                         />
                    </div>
                    <div>
                         <label className="block mb-1 text-sm font-medium">Position</label>
                         <input
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                              required
                         />
                    </div>

                    <div>
                         <label className="block mb-1 text-sm font-medium">Location</label>
                         <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                         />
                    </div>

                    <div>
                         <label className="block mb-1 text-sm font-medium">Status</label>
                         <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                         >
                              <option value="wishlist">Wishlist</option>
                              <option value="applied">Applied</option>
                              <option value="interview">Interview</option>
                              <option value="offer">Offer</option>
                              <option value="rejected">Rejected</option>
                         </select>
                    </div>

                    <div>
                         <label className="block mb-1 text-sm font-medium">Notes</label>
                         <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleChange}
                              rows="4"
                              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
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