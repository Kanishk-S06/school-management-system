// --- START OF FILE TeacherDashboard.js ---

import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

// Styled Components to match the Student Dashboard Theme
const StyledContainer = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
});

const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
    background: 'rgba(26, 26, 46, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        background: 'rgba(10, 10, 10, 0.9)',
        border: 'none',
        color: '#ffffff',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const StyledMainContent = styled(Box)({
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
});

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <StyledContainer>
            <CssBaseline />
            <StyledAppBar open={open} position="absolute">
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
                        Teacher Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Toolbar>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }}/>
                <List component="nav">
                    <TeacherSideBar isSidebarOpen={open} />
                </List>
            </StyledDrawer>
            <StyledMainContent>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    <Route path="/Teacher/complain" element={<TeacherComplain />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                    <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </StyledMainContent>
        </StyledContainer>
    );
};

export default TeacherDashboard;