// --- START OF FILE SideBar.js ---

import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StyledListItemButton = styled(ListItemButton)`
    && {
        color: #bdbdbd;
        padding: 8px 16px;
        margin: 4px 8px;
        border-radius: 8px;
        transition: background-color 0.3s ease, color 0.3s ease;

        .MuiListItemIcon-root {
            color: #bdbdbd;
            transition: color 0.3s ease;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            .MuiListItemIcon-root {
                color: white;
            }
        }

        &.Mui-selected {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            color: white;
            border-left: 4px solid #7e57c2;
            .MuiListItemIcon-root {
                color: white;
            }
        }
    }
`;

const StyledListSubheader = styled(ListSubheader)`
    && {
        background-color: transparent;
        color: #757575;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;

const SideBar = () => {
    const location = useLocation();

    return (
        <>
            <React.Fragment>
                <StyledListItemButton component={Link} to="/" selected={location.pathname === "/" || location.pathname === "/Admin/dashboard"}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/classes" selected={location.pathname.startsWith('/Admin/classes')}>
                    <ListItemIcon><ClassOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Classes" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/subjects" selected={location.pathname.startsWith("/Admin/subjects")}>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText primary="Subjects" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/teachers" selected={location.pathname.startsWith("/Admin/teachers")}>
                    <ListItemIcon><SupervisorAccountOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Teachers" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/students" selected={location.pathname.startsWith("/Admin/students")}>
                    <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                    <ListItemText primary="Students" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/notices" selected={location.pathname.startsWith("/Admin/notices")}>
                    <ListItemIcon><AnnouncementOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Notices" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Admin/complains" selected={location.pathname.startsWith("/Admin/complains")}>
                    <ListItemIcon><ReportIcon /></ListItemIcon>
                    <ListItemText primary="Complains" />
                </StyledListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <React.Fragment>
                <StyledListSubheader component="div" inset>
                    User
                </StyledListSubheader>
                <StyledListItemButton component={Link} to="/Admin/profile" selected={location.pathname.startsWith("/Admin/profile")}>
                    <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/logout" selected={location.pathname.startsWith("/logout")}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </StyledListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar;