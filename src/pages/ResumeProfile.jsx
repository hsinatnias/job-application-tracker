import {useState, useEffect} from 'react';
import{useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import ResumePreview from "./ResumePreview.jsx";
const ResumeProfile = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        summary: '',
        skills: '',
        experience: '',
        education: '',
    })
    useEffect(()=>{
        const stored = localStorage.getItem('resumeProfile')
        if(stored){
            setFormData(JSON.parse(stored))
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        localStorage.setItem('resumeProfile', JSON.stringify(formData))
        toast.success('Resume saved successfully')
        navigate('/resume_preview')
    }

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    return(

            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">Resume Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="summary" className="text-sm font-medium text-gray-700">Summary</label>
                        <textarea
                            id="summary"
                            name="summary"
                            rows="4"
                            onChange={handleChange}
                            value={formData.summary}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills</label>
                        <textarea
                            id="skills"
                            name="skills"
                            rows="4"
                            onChange={handleChange}
                            value={formData.skills}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="experience" className="text-sm font-medium text-gray-700">Experience</label>
                        <textarea
                            id="experience"
                            name="experience"
                            rows="4"
                            onChange={handleChange}
                            value={formData.experience}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        ></textarea>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="education" className="text-sm font-medium text-gray-700">Education</label>
                        <textarea
                            id="education"
                            name="education"
                            rows="4"
                            onChange={handleChange}
                            value={formData.education}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                        Save Resume
                        </button>
                    </div>
                </form>
            </div>


    )
}
export default ResumeProfile;