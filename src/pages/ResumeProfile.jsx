import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ArrowLeft, FileText } from 'lucide-react'

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

    useEffect(() => {
        const stored = localStorage.getItem('resumeProfile')
        if (stored) setFormData(JSON.parse(stored))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('resumeProfile', JSON.stringify(formData))
        toast.success('Resume saved successfully')
        navigate('/resume_preview')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const fields = [
        { name: 'name', label: 'Full name', type: 'input', placeholder: 'Anish Vattakunnel Mathew' },
        { name: 'email', label: 'Email', type: 'input', placeholder: 'you@example.com' },
        { name: 'phone', label: 'Phone', type: 'input', placeholder: '+91 8891088818' },
        { name: 'summary', label: 'Professional summary', type: 'textarea', placeholder: 'A brief summary of your experience and goals...' },
        { name: 'skills', label: 'Skills (comma separated)', type: 'textarea', placeholder: 'PHP, React, TypeScript, Python, FastAPI...' },
        { name: 'experience', label: 'Experience', type: 'textarea', placeholder: 'Describe your work experience...' },
        { name: 'education', label: 'Education', type: 'textarea', placeholder: 'Your educational background...' },
    ]

    return (
        <div className="max-w-2xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
                >
                    <ArrowLeft size={14} /> Back
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <FileText size={18} className="text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume builder</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Fill in your details to generate a PDF resume</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.type === 'input' ? (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                />
                            ) : (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder={field.placeholder}
                                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                        >
                            Save & preview
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ResumeProfile