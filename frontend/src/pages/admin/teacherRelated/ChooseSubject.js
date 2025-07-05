import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import { styled } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';

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
    padding: '2rem',
    '& .MuiTableCell-root': {
        color: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
        color: '#ffffff',
        fontWeight: 600,
        background: 'rgba(255, 255, 255, 0.05)',
    },
    '& .MuiTableBody-root .MuiTableCell-root': {
        color: '#ffffff',
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
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
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    }
}));

const StyledGreenButton = styled(GreenButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    borderRadius: '25px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
        background: 'linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)'
    },
    '&:disabled': {
        background: 'rgba(76, 175, 80, 0.3)',
        color: 'rgba(255, 255, 255, 0.5)',
        transform: 'none',
        boxShadow: 'none'
    }
}));

const StyledPurpleButton = styled(PurpleButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    borderRadius: '25px',
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 5px 15px rgba(118, 75, 162, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(118, 75, 162, 0.4)',
        background: 'linear-gradient(135deg, #8a5ca8 0%, #7c6ce8 100%)'
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

const NoDataContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '60vh',
    color: '#ffffff',
    '& .no-data-text': {
        background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: '1.8rem',
        fontWeight: 600,
        marginBottom: '2rem',
        textAlign: 'center'
    }
}));

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    if (loading) {
        return (
            <LoadingContainer>
                <div className="loading-text">Loading...</div>
            </LoadingContainer>
        );
    } else if (response) {
        return (
            <StyledContainer>
                <NoDataContainer>
                    <SchoolIcon sx={{ fontSize: '4rem', color: '#667eea', marginBottom: '1rem' }} />
                    <div className="no-data-text">
                        Sorry all subjects have teachers assigned already
                    </div>
                    <StyledAddButton variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        <AddIcon sx={{ marginRight: '0.5rem' }} />
                        Add Subjects
                    </StyledAddButton>
                </NoDataContainer>
            </StyledContainer>
        );
    } else if (error) {
        console.log(error)
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    const subjectColumns = [
        { id: 'index', label: '#', minWidth: 50 },
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'subCode', label: 'Subject Code', minWidth: 170 },
    ]

    const subjectRows = Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => {
        return {
            index: index + 1,
            subName: subject.subName,
            subCode: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectButtonHaver = ({ row }) => {
        return (
            <>
                {situation === "Norm" ?
                    <StyledGreenButton variant="contained"
                        onClick={() => navigate("/Admin/teachers/addteacher/" + row.id)}>
                        Choose
                    </StyledGreenButton>
                    :
                    <StyledGreenButton variant="contained" disabled={loader}
                        onClick={() => updateSubjectHandler(teacherID, row.id)}>
                        {loader ? (
                            <CircularProgress size={18} color="inherit" />
                        ) : (
                            'Choose Sub'
                        )}
                    </StyledGreenButton>
                }
            </>
        );
    };

    return (
        <StyledContainer>
            <StyledTitle variant="h3">
                <BookIcon sx={{ fontSize: '3rem', color: '#667eea' }} />
                Choose a Subject
            </StyledTitle>
            <StyledPaper sx={{ width: '100%', overflow: 'hidden' }}>
                {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                    <TableTemplate buttonHaver={SubjectButtonHaver} columns={subjectColumns} rows={subjectRows} />
                }
            </StyledPaper>
        </StyledContainer>
    );
};

export default ChooseSubject;