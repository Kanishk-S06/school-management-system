import React from 'react'
import { Card, CardContent, Typography, Grid, Box, Avatar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// Styled Components for Modern Dark Theme
const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '40px',
    paddingBottom: '40px',
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

const StyledProfileCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out',
    marginBottom: '30px',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    },
    '@keyframes slideUp': {
        from: {
            opacity: 0,
            transform: 'translateY(60px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

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
    '@keyframes fadeInUp': {
        from: {
            opacity: 0,
            transform: 'translateY(30px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
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
    transition: 'all 0.3s ease',
    animation: 'avatarGlow 2s ease-in-out infinite alternate',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)'
    },
    '@keyframes avatarGlow': {
        from: {
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
        },
        to: {
            boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)'
        }
    }
}));

const StudentProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);
    
    if (response) { console.log(response) }
    else if (error) { console.log(error) }
    
    const sclassName = currentUser.sclassName
    const studentSchool = currentUser.school
    
    return (
        <StyledContainer>
            <Container maxWidth="md">
                <StyledProfileCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <StyledAvatar alt="Student Avatar">
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
                                Student Roll No: {currentUser.rollNum}
                            </StyledSubTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSubTitle variant="h6">
                                Class: {sclassName.sclassName}
                            </StyledSubTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSubTitle variant="h6">
                                School: {studentSchool.schoolName}
                            </StyledSubTitle>
                        </Grid>
                    </Grid>
                </StyledProfileCard>
                
                <StyledInfoCard>
                    <StyledCardContent>
                        <StyledSectionTitle variant="h4" gutterBottom>
                            Personal Information
                        </StyledSectionTitle>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Date of Birth:</strong> January 1, 2000
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Gender:</strong> Male
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Email:</strong> john.doe@example.com
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Phone:</strong> (123) 456-7890
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Address:</strong> 123 Main Street, City, Country
                                </StyledInfoText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledInfoText variant="body1">
                                    <strong>Emergency Contact:</strong> (987) 654-3210
                                </StyledInfoText>
                            </Grid>
                        </Grid>
                    </StyledCardContent>
                </StyledInfoCard>
            </Container>
        </StyledContainer>
    )
}

export default StudentProfile