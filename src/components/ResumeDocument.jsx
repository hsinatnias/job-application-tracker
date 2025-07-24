import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
        color: '#333',
        lineHeight: 1.5,
    },
    section: {
        marginBottom: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 4,
    },
    contact: {
        fontSize: 11,
        marginBottom: 8,
    },
    subheader: {
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 6,
        textDecoration: 'underline',
    },
    paragraph: {
        fontSize: 11,
        marginBottom: 4,
    },
    listItem: {
        marginLeft: 10,
        marginBottom: 2,
        fontSize: 11,
    },
    divider: {
        height: 1,
        width: '60%',
        backgroundColor: '#ccc',
        marginTop: 6,
        marginBottom: 10,
    },
})

const ResumeDocument = ({ profile }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={[styles.header, { textAlign: 'center' }]}>{profile.name}</Text>
                    <Text style={[styles.contact, { textAlign: 'center' }]}>
                        {profile.email} | {profile.phone}
                    </Text>
                    <View style={styles.divider} />
                </View>

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.subheader}>Summary</Text>
                    <Text style={styles.paragraph}>{profile.summary}</Text>
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.subheader}>Skills</Text>
                    {profile.skills.split(',').map((skill, index) => (
                        <Text key={index} style={styles.listItem}>• {skill.trim()}</Text>
                    ))}
                </View>

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.subheader}>Experience</Text>
                    <Text style={styles.paragraph}>{profile.experience}</Text>
                </View>

                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.subheader}>Education</Text>
                    <Text style={styles.paragraph}>{profile.education}</Text>
                </View>

            </Page>
        </Document>
    )
}

export default ResumeDocument
