// --- START OF FILE ChooseUser.js ---

import { AccountCircle, Group, School } from '@mui/icons-material';
import { Backdrop, Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Popup from '../components/Popup';
import { loginUser } from '../redux/userRelated/userHandle';

// --- Styled Components ---

const bgFlow = keyframes`
    from { transform: translateY(0px) rotate(0deg) scale(1.2); }
    to { transform: translateY(-20px) rotate(10deg) scale(1.3); }
`;

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #0a0a0a;
        color: white;
        margin: 0;
        padding: 0;
    }
`;

const BgAnimation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 80% 30%, rgba(255, 119, 198, 0.2) 0%, transparent 40%);
    animation: ${bgFlow} 25s ease-in-out infinite alternate;
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SectionTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #ffffff 50%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const StyledCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    color: #a0aec0;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        color: white;
        border-color: rgba(102, 126, 234, 0.5);
    }
`;

const CardIcon = styled(Box)`
    font-size: 4rem;
    color: #667eea;
    transition: color 0.3s;

    ${StyledCard}:hover & {
        color: #764ba2;
    }
`;

const CardTitle = styled.h2`
    margin-bottom: 10px;
    font-size: 1.75rem;
    font-weight: 700;
`;

const ChooseUser = ({ visitor }) => {
    // --- NO LOGIC CHANGES HERE ---
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const password = "zxc";
    const { status, currentUser, currentRole } = useSelector(state => state.user);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const navigateHandler = (user) => {
        if (user === "Admin") {
            if (visitor === "guest") {
                const email = "yogendra@12";
                const fields = { email, password };
                setLoader(true);
                dispatch(loginUser(fields, user));
            } else { navigate('/Adminlogin'); }
        } else if (user === "Student") {
            if (visitor === "guest") {
                const rollNum = "1";
                const studentName = "Dipesh Awasthi";
                const fields = { rollNum, studentName, password };
                setLoader(true);
                dispatch(loginUser(fields, user));
            } else { navigate('/Studentlogin'); }
        } else if (user === "Teacher") {
            if (visitor === "guest") {
                const email = "tony@12";
                const fields = { email, password };
                setLoader(true);
                dispatch(loginUser(fields, user));
            } else { navigate('/Teacherlogin'); }
        }
    };
    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') { navigate('/Admin/dashboard'); }
            else if (currentRole === 'Student') { navigate('/Student/dashboard'); }
            else if (currentRole === 'Teacher') { navigate('/Teacher/dashboard'); }
        } else if (status === 'error') {
            setLoader(false);
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, currentRole, navigate, currentUser]);

    return (
        <PageContainer>
            <GlobalStyle />
            <BgAnimation />
            <SectionTitle>Choose Your Role</SectionTitle>
            <Grid container spacing={4} justifyContent="center" maxWidth="lg">
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigateHandler("Admin")}>
                        <CardIcon mb={2}><AccountCircle fontSize="inherit" /></CardIcon>
                        <CardTitle>Admin</CardTitle>
                        Login as an administrator to access the dashboard to manage app data.
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigateHandler("Student")}>
                        <CardIcon mb={2}><School fontSize="inherit" /></CardIcon>
                        <CardTitle>Student</CardTitle>
                        Login as a student to explore course materials and assignments.
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => navigateHandler("Teacher")}>
                        <CardIcon mb={2}><Group fontSize="inherit" /></CardIcon>
                        <CardTitle>Teacher</CardTitle>
                        Login as a teacher to create courses, assignments, and track student progress.
                    </StyledCard>
                </Grid>
            </Grid>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
                <CircularProgress color="inherit" /> Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default ChooseUser;