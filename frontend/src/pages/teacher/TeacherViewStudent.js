// --- START OF FILE TeacherViewStudent.js ---

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { styled } from '@mui/material/styles';

// Styled Components for Modern Dark Theme
// Outer StyledContainer removed to prevent layout conflicts

const StyledContentContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    margin: '2rem', // Added margin for spacing
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
    fontWeight: 800,
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
}));

const StyledInfoText = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
    '& strong': {
        color: '#667eea'
    }
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    marginTop: '2rem'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '12px 30px',
    fontSize: '1rem',
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

const StyledPurpleButton = styled(PurpleButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '12px 30px',
    fontSize: '1rem',
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

// UPDATED TABLE STYLES
const StyledTable = styled(Table)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1.5rem',
    '& .MuiTableCell-head': {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
    '& .MuiTableCell-body': {
        color: '#ffffff',
    },
    '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
}));

// NEW STYLED COMPONENT FOR THE INNER TABLE
const StyledInnerTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-head': {
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: 'bold',
    },
     '& .MuiTableCell-body': {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    '& .MuiTableCell-root': {
        border: 'none',
        color: '#ffffff',
    },
}));


const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
}));

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading
                ?
                <LoadingContainer>
                    <Typography sx={{ color: 'white' }}>Loading...</Typography>
                </LoadingContainer>
                :
                <Box>
                    <StyledContentContainer>
                        <StyledTitle variant="h3">
                            Student Details
                        </StyledTitle>
                        
                        <Box sx={{ mb: 4 }}>
                            <StyledInfoText><strong>Name:</strong> {userDetails.name}</StyledInfoText>
                            <StyledInfoText><strong>Roll Number:</strong> {userDetails.rollNum}</StyledInfoText>
                            <StyledInfoText><strong>Class:</strong> {sclassName.sclassName}</StyledInfoText>
                            <StyledInfoText><strong>School:</strong> {studentSchool.schoolName}</StyledInfoText>
                        </Box>

                        <StyledSectionTitle variant="h4">Attendance</StyledSectionTitle>
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                            &&
                            <>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    if (subName === teachSubject) {
                                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                        return (
                                            <StyledTable key={index}>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Subject</StyledTableCell>
                                                        <StyledTableCell>Present</StyledTableCell>
                                                        <StyledTableCell>Total Sessions</StyledTableCell>
                                                        <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>

                                                <TableBody>
                                                    <StyledTableRow>
                                                        <StyledTableCell>{subName}</StyledTableCell>
                                                        <StyledTableCell>{present}</StyledTableCell>
                                                        <StyledTableCell>{sessions}</StyledTableCell>
                                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <StyledButton variant="contained" onClick={() => handleOpen(subId)}>
                                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                                            </StyledButton>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                    <StyledTableRow>
                                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                <Box sx={{ margin: 1 }}>
                                                                    <Typography variant="h6" gutterBottom component="div" sx={{ color: '#ffffff' }}>
                                                                        Attendance Details
                                                                    </Typography>
                                                                    {/* USING THE NEW INNER TABLE STYLE */}
                                                                    <StyledInnerTable size="small" aria-label="purchases">
                                                                        <TableHead>
                                                                            <StyledTableRow>
                                                                                <StyledTableCell>Date</StyledTableCell>
                                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                                            </StyledTableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {allData.map((data, index) => {
                                                                                const date = new Date(data.date);
                                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                                return (
                                                                                    <StyledTableRow key={index}>
                                                                                        <StyledTableCell component="th" scope="row">
                                                                                            {dateString}
                                                                                        </StyledTableCell>
                                                                                        <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                    </StyledTableRow>
                                                                                );
                                                                            })}
                                                                        </TableBody>
                                                                    </StyledInnerTable>
                                                                </Box>
                                                            </Collapse>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            </StyledTable>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                                <StyledInfoText sx={{ mb: 2 }}>
                                    <strong>Overall Attendance Percentage:</strong> {overallAttendancePercentage.toFixed(2)}%
                                </StyledInfoText>

                                <CustomPieChart data={chartData} />
                            </>
                        }
                        
                        <Box sx={{ my: 3 }}>
                            <StyledButton
                                variant="contained"
                                onClick={() =>
                                    navigate(
                                        `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                                    )
                                }
                            >
                                Add Attendance
                            </StyledButton>
                        </Box>
                        
                        <StyledSectionTitle variant="h4">Subject Marks</StyledSectionTitle>

                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                            <>
                                {subjectMarks.map((result, index) => {
                                    if (result.subName.subName === teachSubject) {
                                        return (
                                            <StyledTable key={index}>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Subject</StyledTableCell>
                                                        <StyledTableCell>Marks</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <StyledTableRow>
                                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                        <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            </StyledTable>
                                        )
                                    }
                                    else if (!result.subName || !result.marksObtained) {
                                        return null;
                                    }
                                    return null
                                })}
                            </>
                        }
                        <StyledPurpleButton variant="contained"
                            onClick={() =>
                                navigate(
                                    `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                                )}>
                            Add Marks
                        </StyledPurpleButton>
                    </StyledContentContainer>
                </Box>
            }
        </>
    )
}

export default TeacherViewStudent;