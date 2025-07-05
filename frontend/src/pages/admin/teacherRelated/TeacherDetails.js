import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';

// Styled Components for Modern Dark Theme
const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px',
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

const StyledPaper = styled(Box)(({ theme }) => ({
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
    maxWidth: '800px',
    margin: '0 auto',
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
    marginBottom: '3rem',
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

const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.8s ease-out both',
    '&:hover': {
        background: 'rgba(102, 126, 234, 0.1)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        transform: 'translateX(10px)'
    },
    '&:nth-of-type(1)': { animationDelay: '0.3s' },
    '&:nth-of-type(2)': { animationDelay: '0.4s' },
    '&:nth-of-type(3)': { animationDelay: '0.5s' },
    '&:nth-of-type(4)': { animationDelay: '0.6s' },
    '&:nth-of-type(5)': { animationDelay: '0.7s' }
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#ffffff',
    minWidth: '140px'
}));

const DetailValue = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    color: '#e0e0e0',
    fontWeight: 400
}));

const StyledAddButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    marginTop: '1rem',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    }
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 600,
    '& .loading-text': {
        background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'pulse 2s ease-in-out infinite'
    },
    '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 }
    }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontSize: '1.2rem'
}));

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <StyledContainer>
            {loading ? (
                <LoadingContainer>
                    <div className="loading-text">Loading...</div>
                </LoadingContainer>
            ) : (
                <>
                    <StyledTitle variant="h4">
                        <PersonIcon sx={{ fontSize: '3rem', color: '#667eea' }} />
                        Teacher Details
                    </StyledTitle>
                    <StyledPaper>
                        <DetailItem>
                            <IconWrapper>
                                <PersonIcon />
                            </IconWrapper>
                            <Box>
                                <DetailLabel>Teacher Name:</DetailLabel>
                                <DetailValue>{teacherDetails?.name}</DetailValue>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <IconWrapper>
                                <SchoolIcon />
                            </IconWrapper>
                            <Box>
                                <DetailLabel>Class Name:</DetailLabel>
                                <DetailValue>{teacherDetails?.teachSclass?.sclassName}</DetailValue>
                            </Box>
                        </DetailItem>

                        {isSubjectNamePresent ? (
                            <>
                                <DetailItem>
                                    <IconWrapper>
                                        <SubjectIcon />
                                    </IconWrapper>
                                    <Box>
                                        <DetailLabel>Subject Name:</DetailLabel>
                                        <DetailValue>{teacherDetails?.teachSubject?.subName}</DetailValue>
                                    </Box>
                                </DetailItem>

                                <DetailItem>
                                    <IconWrapper>
                                        <SubjectIcon />
                                    </IconWrapper>
                                    <Box>
                                        <DetailLabel>Subject Sessions:</DetailLabel>
                                        <DetailValue>{teacherDetails?.teachSubject?.sessions}</DetailValue>
                                    </Box>
                                </DetailItem>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <StyledAddButton variant="contained" onClick={handleAddSubject}>
                                    <AddIcon sx={{ marginRight: '0.5rem' }} />
                                    Add Subject
                                </StyledAddButton>
                            </Box>
                        )}
                    </StyledPaper>
                </>
            )}
        </StyledContainer>
    );
};

export default TeacherDetails;