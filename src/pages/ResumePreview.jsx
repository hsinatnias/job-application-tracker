import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../components/ResumeDocument.jsx";
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Pencil } from 'lucide-react'

const ResumePreview = () => {
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

    const profile = JSON.parse(localStorage.getItem('resumeProfile')) || defaultProfile

    if (!profile) {
        return (
            <div className="text-center py-20">
                <p className="text-4xl mb-3">📄</p>
                <p className="text-gray-600 font-medium">No resume data found</p>
                <p className="text-gray-400 text-sm mt-1">Fill in your resume profile first</p>
                <button
                    onClick={() => navigate('/resume')}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                    Build resume
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-2"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Resume preview</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/resume')}
                        className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                    >
                        <Pencil size={13} /> Edit
                    </button>
                    <PDFDownloadLink
                        document={<ResumeDocument profile={profile} />}
                        fileName="resume.pdf"
                        className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                    >
                        {({ loading }) => (
                            <>
                                <Download size={13} />
                                {loading ? 'Preparing...' : 'Download PDF'}
                            </>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            {/* Resume preview card */}
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-sm leading-relaxed text-gray-800">

                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-4 mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">{profile.email} · {profile.phone}</p>
                </div>

                {/* Summary */}
                {profile.summary && (
                    <div className="mb-5">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1 mb-2">Summary</h2>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{profile.summary}</p>
                    </div>
                )}

                {/* Skills */}
                {profile.skills && (
                    <div className="mb-5">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1 mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.split(',').map((skill, index) => (
                                <span key={index} className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-xs text-gray-600 rounded-lg">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {profile.experience && (
                    <div className="mb-5">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1 mb-2">Experience</h2>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{profile.experience}</p>
                    </div>
                )}

                {/* Education */}
                {profile.education && (
                    <div className="mb-5">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1 mb-2">Education</h2>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{profile.education}</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ResumePreview