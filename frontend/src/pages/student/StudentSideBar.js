// --- START OF FILE StudentSideBar.js ---

import * as React from 'react';
import { Collapse, Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, List, Toolbar, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const StyledListItemButton = styled(ListItemButton)(({ theme, isActive, isSidebarOpen }) => ({
    position: 'relative',
    zIndex: 1,
    margin: '4px 12px',
    padding: '12px',
    borderRadius: '12px',
    // Always center the content horizontally. The icon and text will then align themselves.
    justifyContent: 'center',
    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
    border: isActive ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
    color: '#ffffff',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '15%',
        width: isActive ? '4px' : '0',
        height: '70%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0 4px 4px 0',
        transition: 'width 0.3s ease'
    },
    // When open, align content to the left
    ...(isSidebarOpen && {
        justifyContent: 'flex-start',
    }),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, isActive }) => ({
    color: isActive ? '#667eea' : '#a0aec0',
    minWidth: 'auto', // Allow the icon to size itself naturally
    justifyContent: 'center',
    transition: 'color 0.3s ease',
    '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
        filter: isActive ? 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.6))' : 'none',
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme, isActive }) => ({
    marginLeft: theme.spacing(2), // Add space between icon and text
    color: isActive ? '#ffffff' : '#a0aec0',
    '& .MuiListItemText-primary': {
        fontWeight: isActive ? 600 : 500,
        fontSize: '1rem',
        whiteSpace: 'nowrap',
    }
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    background: 'transparent',
    color: '#667eea',
    fontSize: '0.9rem',
    fontWeight: 700,
    padding: '16px 20px 8px 28px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
}));

const StudentSideBar = ({ isSidebarOpen, toggleDrawer }) => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Student/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
                <IconButton onClick={toggleDrawer} sx={{ visibility: isSidebarOpen ? 'visible' : 'hidden' }}>
                    <ChevronLeftIcon sx={{ color: 'white' }} />
                </IconButton>
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <List component="nav">
                <StyledListItemButton component={Link} to="/" isActive={isActive('/')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/')}> <HomeIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Home" isActive={isActive('/')} />
                    </Collapse>
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Student/subjects" isActive={isActive('/Student/subjects')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/Student/subjects')}> <AssignmentIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Subjects" isActive={isActive('/Student/subjects')} />
                    </Collapse>
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Student/attendance" isActive={isActive('/Student/attendance')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/Student/attendance')}> <ClassOutlinedIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Attendance" isActive={isActive('/Student/attendance')} />
                    </Collapse>
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Student/complain" isActive={isActive('/Student/complain')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/Student/complain')}> <AnnouncementOutlinedIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Complain" isActive={isActive('/Student/complain')} />
                    </Collapse>
                </StyledListItemButton>

                <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                
                <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                    <StyledListSubheader component="div">User</StyledListSubheader>
                </Collapse>

                <StyledListItemButton component={Link} to="/Student/profile" isActive={isActive('/Student/profile')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/Student/profile')}> <AccountCircleOutlinedIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Profile" isActive={isActive('/Student/profile')} />
                    </Collapse>
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/logout" isActive={isActive('/logout')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon isActive={isActive('/logout')}> <ExitToAppIcon /> </StyledListItemIcon>
                    <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                        <StyledListItemText primary="Logout" isActive={isActive('/logout')} />
                    </Collapse>
                </StyledListItemButton>
            </List>
        </>
    );
};

export default StudentSideBar;