import { Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

// Modern Dark Theme Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    maxWidth: 'lg',
    animation: 'fadeIn 0.8s ease-out',
    '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
    }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    height: '250px',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        zIndex: -1,
        transition: 'all 0.3s ease',
    },
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        '&::before': {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
        }
    },
    '&:nth-of-type(1)::before': {
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(67, 56, 202, 0.1) 100%)',
    },
    '&:nth-of-type(2)::before': {
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
    },
    '&:nth-of-type(3)::before': {
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
    },
    '&:nth-of-type(4)::before': {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
    },
    '& img': {
        width: '80px',
        height: '80px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 8px 20px rgba(102, 126, 234, 0.3))',
        transition: 'all 0.3s ease',
        marginBottom: '1rem',
    },
    '&:hover img': {
        transform: 'scale(1.1) rotate(5deg)',
        filter: 'drop-shadow(0 12px 30px rgba(102, 126, 234, 0.4))',
    },
    '@keyframes slideUp': {
        from: {
            opacity: 0,
            transform: 'translateY(40px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

const StyledNoticePaper = styled(Paper)(({ theme }) => ({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out 0.4s both',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        zIndex: -1,
        transition: 'all 0.3s ease',
    },
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        '&::before': {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        }
    },
    '@keyframes slideUp': {
        from: {
            opacity: 0,
            transform: 'translateY(40px)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

const Title = styled('p')(({ theme }) => ({
    fontSize: '1.4rem',
    fontWeight: 600,
    margin: '0.5rem 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
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

const Data = styled(CountUp)(({ theme }) => ({
    fontSize: 'calc(2rem + 0.6vw)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' }
    }
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    '& .MuiGrid-item': {
        animation: 'fadeInUp 0.8s ease-out',
        '&:nth-of-type(1)': { animationDelay: '0.1s' },
        '&:nth-of-type(2)': { animationDelay: '0.2s' },
        '&:nth-of-type(3)': { animationDelay: '0.3s' },
        '&:nth-of-type(4)': { animationDelay: '0.4s' },
        '&:nth-of-type(5)': { animationDelay: '0.5s' },
    },
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

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <StyledContainer>
            <StyledGrid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Students} alt="Students" />
                        <Title>
                            Total Students
                        </Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Classes} alt="Classes" />
                        <Title>
                            Total Classes
                        </Title>
                        <Data start={0} end={numberOfClasses} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Teachers} alt="Teachers" />
                        <Title>
                            Total Teachers
                        </Title>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Fees} alt="Fees" />
                        <Title>
                            Fees Collection
                        </Title>
                        <Data start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <StyledNoticePaper>
                        <SeeNotice />
                    </StyledNoticePaper>
                </Grid>
            </StyledGrid>
        </StyledContainer>
    );
};

export default AdminHomePage