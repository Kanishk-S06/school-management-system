import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { styled } from '@mui/material/styles';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    height: '240px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        background: 'rgba(255, 255, 255, 0.08)'
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

const StyledNoticesPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out 0.6s both',
    color: 'white',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledImage = styled('img')(({ theme }) => ({
    width: '60px',
    height: '60px',
    filter: 'brightness(0) invert(1)',
    opacity: 0.8,
    transition: 'all 0.3s ease',
    marginBottom: '15px',
    '&:hover': {
        opacity: 1,
        transform: 'scale(1.1)',
        filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(102, 126, 234, 0.5))'
    }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 600,
    fontSize: '1.4rem',
    marginBottom: '10px',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
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

const StyledData = styled(CountUp)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' }
    }
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 800,
    fontSize: '3rem',
    marginBottom: '40px',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out both',
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

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <StyledContainer>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <PageTitle variant="h2">
                    Teacher Dashboard
                </PageTitle>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <StyledImage src={Students} alt="Students" />
                            <StyledTitle>
                                Class Students
                            </StyledTitle>
                            <StyledData start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <StyledImage src={Lessons} alt="Lessons" />
                            <StyledTitle>
                                Total Lessons
                            </StyledTitle>
                            <StyledData start={0} end={numberOfSessions} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <StyledImage src={Tests} alt="Tests" />
                            <StyledTitle>
                                Tests Taken
                            </StyledTitle>
                            <StyledData start={0} end={24} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <StyledImage src={Time} alt="Time" />
                            <StyledTitle>
                                Total Hours
                            </StyledTitle>
                            <StyledData start={0} end={30} duration={4} suffix="hrs"/>                        
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledNoticesPaper>
                            <SeeNotice />
                        </StyledNoticesPaper>
                    </Grid>
                </Grid>
            </Container>
        </StyledContainer>
    )
}

export default TeacherHomePage