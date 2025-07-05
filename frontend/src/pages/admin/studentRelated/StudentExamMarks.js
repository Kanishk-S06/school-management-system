import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components for Modern Dark Theme
const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
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

const StyledFormContainer = styled(Box)(({ theme }) => ({
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
    marginBottom: '2rem',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out 0.4s both'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        '&:hover': {
            border: '1px solid rgba(102, 126, 234, 0.5)',
            background: 'rgba(255, 255, 255, 0.08)'
        },
        '&.Mui-focused': {
            border: '1px solid #667eea',
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
        },
        '& fieldset': {
            border: 'none'
        }
    },
    '& .MuiInputLabel-root': {
        color: '#a0aec0',
        fontSize: '1.1rem',
        '&.Mui-focused': {
            color: '#667eea'
        }
    },
    '& .MuiInputBase-input': {
        color: '#ffffff',
        fontSize: '1.1rem'
    }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        border: '1px solid rgba(102, 126, 234, 0.5)',
        background: 'rgba(255, 255, 255, 0.08)'
    },
    '&.Mui-focused': {
        border: '1px solid #667eea',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    '& .MuiSvgIcon-root': {
        color: '#a0aec0'
    }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: '#a0aec0',
        fontSize: '1.1rem',
        '&.Mui-focused': {
            color: '#667eea'
        }
    }
}));

const StyledButton = styled(BlueButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '18px 40px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    },
    '&:disabled': {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#a0aec0'
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

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <LoadingContainer>
                    <div className="loading-text">Loading...</div>
                </LoadingContainer>
                :
                <StyledContainer>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '40px 20px'
                        }}
                    >
                        <StyledFormContainer
                            sx={{
                                maxWidth: 600,
                                width: '100%'
                            }}
                        >
                            <Stack spacing={1} sx={{ mb: 4 }}>
                                <StyledTitle variant="h3">
                                    Student Exam Marks
                                </StyledTitle>
                                <StyledSubTitle variant="h6">
                                    {userDetails.name}
                                </StyledSubTitle>
                                {currentUser.teachSubject &&
                                    <StyledSubTitle variant="h6">
                                        Subject: {currentUser.teachSubject?.subName}
                                    </StyledSubTitle>
                                }
                            </Stack>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {
                                        situation === "Student" &&
                                        <StyledFormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Select Subject
                                            </InputLabel>
                                            <StyledSelect
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={subjectName}
                                                label="Choose an option"
                                                onChange={changeHandler} 
                                                required
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: 'rgba(26, 26, 46, 0.95)',
                                                            backdropFilter: 'blur(20px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '15px',
                                                            '& .MuiMenuItem-root': {
                                                                color: '#ffffff',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(102, 126, 234, 0.2)'
                                                                },
                                                                '&.Mui-selected': {
                                                                    backgroundColor: 'rgba(102, 126, 234, 0.3)',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(102, 126, 234, 0.4)'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }}
                                            >
                                                {subjectsList ?
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName}>
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem value="Select Subject">
                                                        Add Subjects For Marks
                                                    </MenuItem>
                                                }
                                            </StyledSelect>
                                        </StyledFormControl>
                                    }
                                    <StyledFormControl>
                                        <StyledTextField 
                                            type="number" 
                                            label='Enter marks'
                                            value={marksObtained} 
                                            required
                                            onChange={(e) => setMarksObtained(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </StyledFormControl>
                                </Stack>
                                <StyledButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 4 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Marks"}
                                </StyledButton>
                            </form>
                        </StyledFormContainer>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </StyledContainer>
            }
        </>
    )
}

export default StudentExamMarks