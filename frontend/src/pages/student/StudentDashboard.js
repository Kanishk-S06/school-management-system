// --- START OF FILE StudentDashboard.js ---

import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 198, 255, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0,
        animation: 'bgFlow 20s ease-in-out infinite'
    },
    '@keyframes bgFlow': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(180deg)' }
    }
}));

const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    zIndex: 1201, // Increased z-index
    color: '#ffffff',
    '& .MuiToolbar-root': {
        background: 'transparent',
    },
    '& .MuiTypography-root': {
        background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        fontSize: '1.5rem'
    },
    '& .MuiIconButton-root': {
        color: '#ffffff',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            color: '#667eea'
        }
    }
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        background: 'rgba(26, 26, 46, 0.9)',
        backdropFilter: 'blur(20px)',
        border: 'none',
        color: '#ffffff',
        width: open ? 240 : 72,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    }
}));

const StyledMainContent = styled(Box)({
    flexGrow: 1,
    minHeight: '100vh',
    background: 'transparent',
    position: 'relative',
    zIndex: 1,
    overflow: 'auto',
});

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <StyledContainer>
            <CssBaseline />
            <StyledAppBar open={open} position='absolute'>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Student Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" open={open}>
                {/* Passing the state AND the function to control it */}
                <StudentSideBar isSidebarOpen={open} toggleDrawer={toggleDrawer} />
            </StyledDrawer>
            <StyledMainContent component="main">
                <Toolbar />
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </StyledMainContent>
        </StyledContainer>
    );
};

export default StudentDashboard;