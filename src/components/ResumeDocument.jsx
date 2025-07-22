import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding:30,
        fontSize: 11,
        fontFamily: 'Helvetica',
        color: '#333'
    },
    section: { margin: 10 },
    header: { fontSize: 18, marginBottom: 5},
    subheader: { fontSize: 14, marginBottom: 4},
    listItem: { marginLeft: 10,  marginBottom: 2}
})
const ResumeDocument = ({profile}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>{ profile.name }</Text>
                    <Text>{ profile.email } | { profile.phone }</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subheader}>Summery</Text>
                    <Text>{ profile.summary }</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subheader}>Skills</Text>
                    {profile.skills.split(',').map((skill, index) => (
                        <Text key={index} style={styles.listItem}>{skill.trim()}</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subheader}>Experience</Text>
                    <Text>{ profile.experience }</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subheader}>Education</Text>
                    <Text>{ profile.education }</Text>
                </View>
            </Page>
        </Document>
    )
}
export default ResumeDocument;