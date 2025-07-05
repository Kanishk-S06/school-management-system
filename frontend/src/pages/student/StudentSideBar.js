import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Styled Components for Modern Dark Theme
const StyledSidebarContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
            radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 90%, rgba(120, 198, 255, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0,
        animation: 'bgFlow 20s ease-in-out infinite'
    },
    '@keyframes bgFlow': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(180deg)' }
    }
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, isActive }) => ({
    position: 'relative',
    zIndex: 1,
    margin: '8px 16px',
    borderRadius: '15px',
    padding: '16px 20px',
    background: isActive 
        ? 'rgba(102, 126, 234, 0.2)' 
        : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: isActive 
        ? '1px solid rgba(102, 126, 234, 0.4)' 
        : '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    animation: 'slideIn 0.6s ease-out',
    '&:hover': {
        background: isActive 
            ? 'rgba(102, 126, 234, 0.3)' 
            : 'rgba(255, 255, 255, 0.1)',
        transform: 'translateX(5px)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: isActive ? '4px' : '0',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0 4px 4px 0',
        transition: 'width 0.3s ease'
    },
    '@keyframes slideIn': {
        from: {
            opacity: 0,
            transform: 'translateX(-20px)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, isActive }) => ({
    color: isActive ? '#667eea' : '#a0aec0',
    minWidth: '40px',
    transition: 'all 0.3s ease',
    '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
        filter: isActive ? 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.6))' : 'none'
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme, isActive }) => ({
    '& .MuiListItemText-primary': {
        color: isActive ? '#ffffff' : '#a0aec0',
        fontWeight: isActive ? 600 : 400,
        fontSize: '1.1rem',
        transition: 'all 0.3s ease'
    }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: '20px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    height: '1px',
    position: 'relative',
    zIndex: 1,
    '&::before': {
        content: '""',
        position: 'absolute',
        left: '20%',
        top: 0,
        width: '60%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
        animation: 'shimmer 3s ease-in-out infinite'
    },
    '@keyframes shimmer': {
        '0%, 100%': { opacity: 0.3 },
        '50%': { opacity: 1 }
    }
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    background: 'transparent',
    color: '#667eea',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '16px 20px 8px 20px',
    margin: '0 16px',
    borderRadius: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.8s ease-out',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
        borderRadius: '1px'
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    }
}));

const StudentSideBar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Student/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <StyledSidebarContainer>
            <React.Fragment>
                <StyledListItemButton 
                    component={Link} 
                    to="/"
                    isActive={isActive('/')}
                >
                    <StyledListItemIcon isActive={isActive('/')}>
                        <HomeIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Home" isActive={isActive('/')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/subjects"
                    isActive={isActive('/Student/subjects')}
                >
                    <StyledListItemIcon isActive={isActive('/Student/subjects')}>
                        <AssignmentIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Subjects" isActive={isActive('/Student/subjects')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/attendance"
                    isActive={isActive('/Student/attendance')}
                >
                    <StyledListItemIcon isActive={isActive('/Student/attendance')}>
                        <ClassOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Attendance" isActive={isActive('/Student/attendance')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/complain"
                    isActive={isActive('/Student/complain')}
                >
                    <StyledListItemIcon isActive={isActive('/Student/complain')}>
                        <AnnouncementOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Complain" isActive={isActive('/Student/complain')} />
                </StyledListItemButton>
            </React.Fragment>
            
            <StyledDivider />
            
            <React.Fragment>
                <StyledListSubheader component="div" inset>
                    User
                </StyledListSubheader>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/profile"
                    isActive={isActive('/Student/profile')}
                >
                    <StyledListItemIcon isActive={isActive('/Student/profile')}>
                        <AccountCircleOutlinedIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Profile" isActive={isActive('/Student/profile')} />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/logout"
                    isActive={isActive('/logout')}
                >
                    <StyledListItemIcon isActive={isActive('/logout')}>
                        <ExitToAppIcon />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Logout" isActive={isActive('/logout')} />
                </StyledListItemButton>
            </React.Fragment>
        </StyledSidebarContainer>
    );
};

export default StudentSideBar;