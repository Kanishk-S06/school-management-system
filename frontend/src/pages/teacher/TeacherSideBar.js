import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box, Avatar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

// Styled Components for Modern Dark Theme
const StyledSidebarContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
            radial-gradient(circle at 50% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(120, 198, 255, 0.08) 0%, transparent 40%)
        `,
        zIndex: 0,
        animation: 'sidebarFlow 25s ease-in-out infinite'
    },
    '@keyframes sidebarFlow': {
        '0%, 100%': { 
            transform: 'translateY(0px)',
            opacity: 1
        },
        '50%': { 
            transform: 'translateY(-10px)',
            opacity: 0.8
        }
    }
}));

const StyledUserSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: '30px 20px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '0 0 20px 20px',
    marginBottom: '20px',
    animation: 'fadeInDown 0.8s ease-out'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0 auto 15px',
    fontSize: '2rem',
    fontWeight: 'bold',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    animation: 'pulse 3s ease-in-out infinite',
    '@keyframes pulse': {
        '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
        },
        '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 15px 35px rgba(102, 126, 234, 0.6)'
        }
    }
}));

const StyledUserName = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '1.3rem',
    marginBottom: '5px'
}));

const StyledUserRole = styled(Typography)(({ theme }) => ({
    color: '#a0aec0',
    fontSize: '0.9rem',
    fontWeight: 500
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
    position: 'relative',
    zIndex: 1,
    margin: '8px 16px',
    borderRadius: '15px',
    padding: '12px 20px',
    background: active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${active ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    animation: 'slideInLeft 0.6s ease-out',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: active ? '0' : '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        transition: 'left 0.3s ease',
        zIndex: -1
    },
    '&:hover': {
        background: active ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(102, 126, 234, 0.5)',
        transform: 'translateX(8px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        '&::before': {
            left: '0'
        }
    },
    '&:nth-of-type(1)': { animationDelay: '0.1s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.3s' },
    '&:nth-of-type(4)': { animationDelay: '0.4s' },
    '&:nth-of-type(5)': { animationDelay: '0.5s' },
    '@keyframes slideInLeft': {
        from: {
            opacity: 0,
            transform: 'translateX(-30px)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
    minWidth: '45px',
    padding: '8px',
    background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    '& .MuiSvgIcon-root': {
        fontSize: '1.4rem',
        color: active ? '#ffffff' : '#a0aec0',
        transition: 'all 0.3s ease'
    },
    '&:hover': {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '& .MuiSvgIcon-root': {
            color: '#ffffff',
            transform: 'scale(1.1)'
        }
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme, active }) => ({
    '& .MuiListItemText-primary': {
        fontSize: '1rem',
        fontWeight: active ? 600 : 500,
        color: active ? '#ffffff' : '#e2e8f0',
        transition: 'all 0.3s ease'
    }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: '20px 16px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
    height: '1px',
    border: 'none',
    animation: 'fadeIn 0.8s ease-out 0.6s both',
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    }
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    background: 'transparent',
    color: '#a0aec0',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '16px 32px 8px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    animation: 'fadeInUp 0.8s ease-out 0.4s both',
    '@keyframes fadeInUp': {
        from: {
            opacity: 0,
            transform: 'translateY(20px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

    const location = useLocation();
    
    // Get first letter of name for avatar
    const avatarLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'T';

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Teacher/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <StyledSidebarContainer>
            <StyledUserSection>
                <StyledAvatar>
                    {avatarLetter}
                </StyledAvatar>
                <StyledUserName variant="h6">
                    {currentUser.name}
                </StyledUserName>
                <StyledUserRole variant="body2">
                    Teacher
                </StyledUserRole>
            </StyledUserSection>

            <React.Fragment>
                <StyledListItemButton 
                    component={Link} 
                    to="/"
                    active={isActive('/')}
                >
                    <StyledListItemIcon active={isActive('/')}>
                        <HomeIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Home" active={isActive('/')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Teacher/class"
                    active={isActive('/Teacher/class')}
                >
                    <StyledListItemIcon active={isActive('/Teacher/class')}>
                        <ClassOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary={`Class ${sclassName.sclassName}`} active={isActive('/Teacher/class')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Teacher/complain"
                    active={isActive('/Teacher/complain')}
                >
                    <StyledListItemIcon active={isActive('/Teacher/complain')}>
                        <AnnouncementOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Complain" active={isActive('/Teacher/complain')} />
                </StyledListItemButton>
            </React.Fragment>
            
            <StyledDivider />
            
            <React.Fragment>
                <StyledListSubheader component="div">
                    User
                </StyledListSubheader>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Teacher/profile"
                    active={isActive('/Teacher/profile')}
                >
                    <StyledListItemIcon active={isActive('/Teacher/profile')}>
                        <AccountCircleOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Profile" active={isActive('/Teacher/profile')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/logout"
                    active={isActive('/logout')}
                >
                    <StyledListItemIcon active={isActive('/logout')}>
                        <ExitToAppIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Logout" active={isActive('/logout')} />
                </StyledListItemButton>
            </React.Fragment>
        </StyledSidebarContainer>
    )
}

export default TeacherSideBar