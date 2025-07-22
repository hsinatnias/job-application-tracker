import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../components/ResumeDocument.jsx";

const ResumePreview = () => {
    const profile = JSON.parse(localStorage.getItem('resumeProfile'))


    if(!profile){
        return <p className="text-center text-gray-500">No profile data found</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded text-gray-800">
            <div id="resume-content">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-sm">{profile.email} | {profile.phone}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-1">Summery</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{profile.summary}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-1">Skills</h2>
                    <ul className="list-disc list-inside">
                        {profile.skills.split(',').map((skill, index) => (
                            <li key={index}>{skill.trim()}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-1">Experience</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{profile.experience}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-1">Education</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{profile.education}</p>
                </div>
            </div>
            { profile && (
                <div className="mt-6 text-center">
                    <PDFDownloadLink
                        document={<ResumeDocument profile={profile} />}
                        fileName="resume.pdf"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        style={{ cursor: 'pointer' }}
                    >
                        {({ loading }) => (loading ? 'Loading...' : 'Download Resume')}
                    </PDFDownloadLink>
                </div>
            )}




        </div>
    )
}
export default ResumePreview