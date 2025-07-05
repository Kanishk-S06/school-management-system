import React from 'react';
import { Box, Typography, Avatar, Card, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

// Styled Components for Modern Dark Theme
const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out',
    overflow: 'hidden',
    color: '#ffffff',
    padding: '3rem',
    maxWidth: '600px',
    width: '100%',
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

const StyledTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 800,
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '120px',
    height: '120px',
    margin: '0 auto 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontSize: '3rem',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)'
    }
}));

const StyledInfoCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem !important',
    color: '#ffffff'
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '48px',
    height: '48px'
}));

const StyledInfoText = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#ffffff',
    opacity: 0.9
}));

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <StyledContainer>
            <StyledBox>
                <StyledTitle variant="h3">
                    <PersonIcon sx={{ fontSize: '3rem', color: '#667eea' }} />
                    Admin Profile
                </StyledTitle>
                
                <StyledAvatar>
                    <PersonIcon sx={{ fontSize: '4rem' }} />
                </StyledAvatar>

                <Stack spacing={2}>
                    <StyledInfoCard>
                        <StyledCardContent>
                            <StyledIconBox>
                                <PersonIcon sx={{ color: '#ffffff' }} />
                            </StyledIconBox>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem' }}>
                                    Name
                                </Typography>
                                <StyledInfoText>
                                    {currentUser.name}
                                </StyledInfoText>
                            </Box>
                        </StyledCardContent>
                    </StyledInfoCard>

                    <StyledInfoCard>
                        <StyledCardContent>
                            <StyledIconBox>
                                <EmailIcon sx={{ color: '#ffffff' }} />
                            </StyledIconBox>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem' }}>
                                    Email
                                </Typography>
                                <StyledInfoText>
                                    {currentUser.email}
                                </StyledInfoText>
                            </Box>
                        </StyledCardContent>
                    </StyledInfoCard>

                    <StyledInfoCard>
                        <StyledCardContent>
                            <StyledIconBox>
                                <SchoolIcon sx={{ color: '#ffffff' }} />
                            </StyledIconBox>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem' }}>
                                    School
                                </Typography>
                                <StyledInfoText>
                                    {currentUser.schoolName}
                                </StyledInfoText>
                            </Box>
                        </StyledCardContent>
                    </StyledInfoCard>
                </Stack>
            </StyledBox>
        </StyledContainer>
    );
};

export default AdminProfile;