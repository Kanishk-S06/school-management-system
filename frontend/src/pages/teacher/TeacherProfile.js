// --- START OF FILE TeacherProfile.js ---

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// Outer container is removed. These styles are now for the content itself.
const StyledProfileCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    marginBottom: '30px',
    animation: 'slideUp 0.8s ease-out',
}));

// ... (All other styled components remain the same) ...
const StyledInfoCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out 0.2s both',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: '30px',
    color: '#ffffff'
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 800,
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
}));

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    color: '#a0aec0',
    fontSize: '1.2rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '1rem',
    animation: 'fadeInUp 0.8s ease-out 0.4s both'
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
}));

const StyledInfoText = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontSize: '1.1rem',
    marginBottom: '1rem',
    '& strong': {
        color: '#667eea',
        fontWeight: 600
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 150,
    height: 150,
    fontSize: '3rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    border: '3px solid rgba(255, 255, 255, 0.1)',
}));

const TeacherProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const sclassName = currentUser.teachSclass;
    const studentSchool = currentUser.school;

    return (
        // The outer container is now a simple Box with padding
        <Box sx={{ p: 3 }}>
            <Container maxWidth="md">
                <StyledProfileCard>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <StyledAvatar alt="Teacher Avatar">
                                    {String(currentUser.name).charAt(0)}
                                </StyledAvatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTitle variant="h3">
                                {currentUser.name}
                            </StyledTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSubTitle variant="h6">
                                Teacher
                            </StyledSubTitle>
                        </Grid>
                    </Grid>
                </StyledProfileCard>

                <StyledInfoCard>
                    <StyledCardContent>
                        <StyledSectionTitle variant="h4" gutterBottom>
                            Teaching Details
                        </StyledSectionTitle>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText>
                                    <strong>Class:</strong> {sclassName.sclassName}
                                </StyledInfoText>
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <StyledInfoText>
                                    <strong>Subject:</strong> {currentUser.teachSubject?.subName}
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledInfoText>
                                    <strong>School:</strong> {studentSchool.schoolName}
                                </StyledInfoText>
                            </Grid>
                        </Grid>
                    </StyledCardContent>
                </StyledInfoCard>
            </Container>
        </Box>
    );
};

export default TeacherProfile;