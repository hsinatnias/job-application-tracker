import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: '#333',
        lineHeight: 1.5,
        backgroundColor: '#ffffff',
    },
    // Header
    header: {
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: '#4F46E5',
    },
    name: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        color: '#111827',
        marginBottom: 4,
    },
    contact: {
        fontSize: 9,
        color: '#6B7280',
    },
    // Section
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#4F46E5',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
        paddingBottom: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E7EB',
    },
    // Summary
    paragraph: {
        fontSize: 10,
        color: '#4B5563',
        lineHeight: 1.6,
    },
    // Skills
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    skillPill: {
        fontSize: 9,
        color: '#374151',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
    },
    // Experience
    jobTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#111827',
        marginBottom: 1,
    },
    jobMeta: {
        fontSize: 9,
        color: '#6B7280',
        marginBottom: 4,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 8,
    },
    bullet: {
        fontSize: 10,
        color: '#4F46E5',
        marginRight: 5,
        marginTop: 1,
    },
    bulletText: {
        fontSize: 9.5,
        color: '#4B5563',
        flex: 1,
        lineHeight: 1.5,
    },
    // Education
    eduTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#111827',
        marginBottom: 1,
    },
    eduMeta: {
        fontSize: 9,
        color: '#6B7280',
        marginBottom: 2,
    },
    eduDetail: {
        fontSize: 9.5,
        color: '#4B5563',
    },
    jobBlock: {
        marginBottom: 10,
    },
    eduBlock: {
        marginBottom: 8,
    },
})

const experiences = [
    {
        title: 'PHP System Engineer / Full Stack Developer',
        company: 'Eastgate Infotech Pvt Ltd',
        period: 'June 2022 – Present',
        bullets: [
            'Built and maintained enterprise SaaS platforms serving 10,000+ monthly active users across Japan',
            'Implemented passkey authentication with WebAuthn, SAML SSO, and OAuth with Google',
            'Integrated Microsoft Azure AD and Google IDP for enterprise identity management',
            'Built bilingual AI RAG chatbot in Python and FastAPI with Qdrant vector database and Ollama LLM',
            'Led CodeIgniter 3 to 4 migration on a live multi-tenant SaaS platform',
            'Automated scheduled operations across 300 client websites using PowerShell scripts',
            'Deployed and managed AWS EC2 and S3 infrastructure',
        ],
    },
    {
        title: 'Process Engineer – VBA & Automation Developer',
        company: 'Sutherland Global Services (Argo Group)',
        period: 'May 2018 – April 2019',
        bullets: [
            'Led a 3-member team coordinating with North American stakeholders on Excel/VBA automation tools',
            'Built Chrome extensions for automated data collection — reduced manual research time by 60%',
            'Upgraded insurance risk rating tools — improved reliability and reduced assessment time by 40%',
        ],
    },
]

const educations = [
    {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'Periyar University Salem',
        period: '2019 – 2022',
        detail: 'Software development, web technologies, OOP, databases, cloud computing. EQF Level 6.',
    },
    {
        degree: 'Higher Secondary Certificate (Class XII)',
        institution: 'Board of Higher Secondary Education, Kerala',
        period: '2002 – 2004',
        detail: 'Physics, Chemistry, Computer Science, Mathematics.',
    },
]

const ResumeDocument = ({ profile }) => {
    const skills = profile.skills
        ? profile.skills.split(',').map(s => s.trim()).filter(Boolean)
        : []

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.contact}>
                        {profile.email}  ·  {profile.phone}
                    </Text>
                </View>

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.paragraph}>{profile.summary}</Text>
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsRow}>
                        {skills.map((skill, index) => (
                            <Text key={index} style={styles.skillPill}>{skill}</Text>
                        ))}
                    </View>
                </View>

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {experiences.map((exp, index) => (
                        <View key={index} style={styles.jobBlock}>
                            <Text style={styles.jobTitle}>{exp.title}</Text>
                            <Text style={styles.jobMeta}>{exp.company}  ·  {exp.period}</Text>
                            {exp.bullets.map((bullet, i) => (
                                <View key={i} style={styles.bulletItem}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{bullet}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {educations.map((edu, index) => (
                        <View key={index} style={styles.eduBlock}>
                            <Text style={styles.eduTitle}>{edu.degree}</Text>
                            <Text style={styles.eduMeta}>{edu.institution}  ·  {edu.period}</Text>
                            <Text style={styles.eduDetail}>{edu.detail}</Text>
                        </View>
                    ))}
                </View>

            </Page>
        </Document>
    )
}

export default ResumeDocument