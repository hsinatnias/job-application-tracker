import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ArrowLeft, FileText } from 'lucide-react'

const ResumeProfile = () => {
    const navigate = useNavigate()
    const defaultProfile = {
        name: 'Anish Vattakunnel Mathew',
        email: 'anish.v.mathew1986@gmail.com',
        phone: '+91 8891088818',
        summary: 'Full Stack Developer with 3 years of enterprise SaaS development experience at a Japanese software company. Specialized in backend systems, secure authentication, and AI integration. Built and maintained platforms serving 10,000+ monthly active users. Currently expanding into modern frontend development with React and TypeScript, and actively exploring opportunities in Europe.',
        skills: 'PHP, CodeIgniter, MySQL, PostgreSQL, JavaScript, React, TypeScript, Tailwind CSS, Python, FastAPI, RAG Pipelines, Qdrant, Ollama, Claude API, WebAuthn, SAML SSO, OAuth 2.0, Microsoft Azure AD, Google APIs, AWS EC2/S3, Git, GitHub Actions, CI/CD, Vercel, Docker, REST APIs',
        experience: `PHP System Engineer / Full Stack Developer — Eastgate Infotech Pvt Ltd (June 2022 – Present)
    - Built and maintained enterprise SaaS platforms serving 10,000+ monthly active users across Japan
    - Implemented passkey authentication with WebAuthn, SAML SSO, and OAuth with Google
    - Integrated Microsoft Azure AD and Google IDP for enterprise identity management
    - Built bilingual AI RAG chatbot in Python and FastAPI with Qdrant vector database and Ollama LLM
    - Led CodeIgniter 3 to 4 migration on a live multi-tenant SaaS platform
    - Automated scheduled operations across 300 client websites using PowerShell scripts
    - Deployed and managed AWS EC2 and S3 infrastructure

    Process Engineer – VBA & Automation Developer — Sutherland Global Services (May 2018 – April 2019)
    - Led a 3-member team coordinating with North American stakeholders on Excel/VBA automation tools
    - Built Chrome extensions for automated data collection — reduced manual research time by 60%
    - Upgraded insurance risk rating tools — improved reliability and reduced assessment time by 40%`,
        education: `Bachelor of Computer Applications (BCA) — Periyar University Salem (2019 – 2022)
    Focus: Software development, web technologies, OOP, databases, cloud computing. EQF Level 6.

    Higher Secondary Certificate (Class XII) — Board of Higher Secondary Education, Kerala (2002 – 2004)
    Subjects: Physics, Chemistry, Computer Science, Mathematics.`,
    }

    const [formData, setFormData] = useState(() => {
        const stored = localStorage.getItem('resumeProfile')
        return stored ? JSON.parse(stored) : defaultProfile
    })

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