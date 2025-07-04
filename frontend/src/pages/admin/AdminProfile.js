import { useSelector } from 'react-redux';

// Simple SVG Icons for Email and School
const EmailIcon = ({ style }) => (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const SchoolIcon = ({ style }) => (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V15" />
    </svg>
);


const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    
    // Get the first initial of the user's name for the avatar
    const userInitial = currentUser.name ? currentUser.name[0].toUpperCase() : 'A';

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <div style={styles.avatar}>
                    {userInitial}
                </div>
                <h2 style={styles.name}>{currentUser.name}</h2>
                <p style={styles.role}>Administrator</p>

                <div style={styles.infoSection}>
                    <div style={styles.infoRow}>
                        <EmailIcon style={styles.icon} />
                        <span style={styles.infoText}>{currentUser.email}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <SchoolIcon style={styles.icon} />
                        <span style={styles.infoText}>{currentUser.schoolName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Styles object for a cleaner and more organized component
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px 20px',
        minHeight: 'calc(100vh - 64px)', // Adjust 64px to your header's height
        backgroundColor: '#f7f8fc', // A light background to make the card pop
    },
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#1976D2', // Matches the blue header from your screenshot
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    name: {
        margin: '0',
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
    },
    role: {
        margin: '4px 0 24px 0',
        fontSize: '16px',
        color: '#777',
        borderBottom: '1px solid #eee',
        paddingBottom: '24px',
        width: '100%',
    },
    infoSection: {
        textAlign: 'left',
        width: '100%',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',
    },
    icon: {
        width: '24px',
        height: '24px',
        color: '#555',
        marginRight: '15px',
    },
    infoText: {
        fontSize: '16px',
        color: '#333',
    }
};

export default AdminProfile;