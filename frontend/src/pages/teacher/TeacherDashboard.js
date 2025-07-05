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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import { styled } from '@mui/material/styles';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

// Modern Dark Theme Styled Components
const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - 240px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    margin: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
    }
}));

const StyledDrawerToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '1.5rem',
    animation: 'fadeInUp 0.8s ease-out',
    '@keyframes fadeInUp': {
        from: {
            opacity: 0,
            transform: 'translateY(10px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

const StyledMainBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 198, 255, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0,
        animation: 'bgFlow 20s ease-in-out infinite'
    },
    '@keyframes bgFlow': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(180deg)' }
    }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
    }
}));

const StyledRouteContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    minHeight: 'calc(100vh - 64px)',
    animation: 'slideIn 0.6s ease-out',
    '@keyframes slideIn': {
        from: {
            opacity: 0,
            transform: 'translateX(20px)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
}));

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <StyledAppBar open={open} position='absolute'>
                    <StyledToolbar>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StyledIconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '20px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </StyledIconButton>
                            <StyledTitle
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                            >
                                Teacher Dashboard
                            </StyledTitle>
                        </Box>
                        <AccountMenu />
                    </StyledToolbar>
                </StyledAppBar>
                <StyledDrawer variant="permanent" open={open}>
                    <StyledDrawerToolbar>
                        <StyledIconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </StyledIconButton>
                    </StyledDrawerToolbar>
                    <Divider sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        margin: '0 16px',
                        borderRadius: '2px'
                    }} />
                    <List component="nav" sx={{ 
                        padding: '16px 8px',
                        '& .MuiListItem-root': {
                            borderRadius: '12px',
                            margin: '4px 0',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.1)',
                                transform: 'translateX(4px)'
                            }
                        }
                    }}>
                        <TeacherSideBar />
                    </List>
                </StyledDrawer>
                <StyledMainBox component="main">
                    <Toolbar />
                    <StyledRouteContainer>
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
                    </StyledRouteContainer>
                </StyledMainBox>
            </Box>
        </>
    );
}

export default TeacherDashboard