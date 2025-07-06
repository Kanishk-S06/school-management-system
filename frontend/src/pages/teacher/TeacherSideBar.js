// --- START OF FILE TeacherSideBar.js ---

import * as React from 'react';
// Corrected: Added 'List' to the import line
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box, Avatar, Typography, Collapse, List } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

// Reusing the modern styles from the Student Sidebar
const StyledListItemButton = styled(ListItemButton)(({ theme, active, isSidebarOpen }) => ({
    position: 'relative',
    margin: '4px 12px',
    padding: '12px',
    borderRadius: '12px',
    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
    background: active ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
    border: active ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid transparent',
    color: '#ffffff',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
    color: active ? '#667eea' : '#a0aec0',
    minWidth: 'auto',
    justifyContent: 'center',
    '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme, active }) => ({
    marginLeft: theme.spacing(2),
    color: active ? '#ffffff' : '#a0aec0',
    '& .MuiListItemText-primary': {
        fontWeight: active ? 600 : 500,
        fontSize: '1rem',
        whiteSpace: 'nowrap',
    }
}));

const StyledUserSection = styled(Box)({
    padding: '16px',
    textAlign: 'center',
});

const StyledAvatar = styled(Avatar)({
    width: '60px',
    height: '60px',
    margin: '0 auto 10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
});

const TeacherSideBar = ({ isSidebarOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;
    const location = useLocation();

    const avatarLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'T';

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Teacher/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                <StyledUserSection>
                    <StyledAvatar>{avatarLetter}</StyledAvatar>
                    <Typography variant="h6" sx={{ color: 'white' }}>{currentUser.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#a0aec0' }}>Teacher</Typography>
                </StyledUserSection>
            </Collapse>
            
            <List>
                <StyledListItemButton component={Link} to="/" active={isActive('/')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon active={isActive('/')}><HomeIcon /></StyledListItemIcon>
                    {isSidebarOpen && <StyledListItemText primary="Home" active={isActive('/')} />}
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Teacher/class" active={isActive('/Teacher/class')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon active={isActive('/Teacher/class')}><ClassOutlinedIcon /></StyledListItemIcon>
                    {isSidebarOpen && <StyledListItemText primary={`Class ${sclassName.sclassName}`} active={isActive('/Teacher/class')} />}
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Teacher/complain" active={isActive('/Teacher/complain')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon active={isActive('/Teacher/complain')}><AnnouncementOutlinedIcon /></StyledListItemIcon>
                    {isSidebarOpen && <StyledListItemText primary="Complain" active={isActive('/Teacher/complain')} />}
                </StyledListItemButton>
            </List>
            
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

            <List>
                <Collapse in={isSidebarOpen} timeout="auto" unmountOnExit>
                    <ListSubheader component="div" sx={{ bgcolor: 'transparent', color: '#a0aec0' }}>
                        User
                    </ListSubheader>
                </Collapse>

                <StyledListItemButton component={Link} to="/Teacher/profile" active={isActive('/Teacher/profile')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon active={isActive('/Teacher/profile')}><AccountCircleOutlinedIcon /></StyledListItemIcon>
                    {isSidebarOpen && <StyledListItemText primary="Profile" active={isActive('/Teacher/profile')} />}
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/logout" active={isActive('/logout')} isSidebarOpen={isSidebarOpen}>
                    <StyledListItemIcon active={isActive('/logout')}><ExitToAppIcon /></StyledListItemIcon>
                    {isSidebarOpen && <StyledListItemText primary="Logout" active={isActive('/logout')} />}
                </StyledListItemButton>
            </List>
        </>
    );
};

export default TeacherSideBar;