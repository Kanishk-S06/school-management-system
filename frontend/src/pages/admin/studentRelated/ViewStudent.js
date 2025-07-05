import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart'
import CustomPieChart from '../../../components/CustomPieChart'
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { styled } from '@mui/material/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Popup from '../../../components/Popup';

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

const StyledTabContext = styled(TabContext)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    '& .MuiTab-root': {
        color: '#a0aec0',
        fontWeight: 600,
        fontSize: '1.1rem',
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&.Mui-selected': {
            color: '#667eea',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '10px 10px 0 0'
        },
        '&:hover': {
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.05)'
        }
    },
    '& .MuiTabs-root': {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px 15px 0 0',
        '& .MuiTabs-indicator': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            height: '3px',
            borderRadius: '3px'
        }
    }
}));

const StyledTabPanel = styled('div')(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0 0 20px 20px',
    padding: '30px',
    marginTop: '-1px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    animation: 'slideUp 0.8s ease-out',
    '@keyframes slideUp': {
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

const StyledTable = styled(Table)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    overflow: 'hidden',
    '& .MuiTableCell-root': {
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px'
    },
    '& .MuiTableHead-root': {
        background: 'rgba(102, 126, 234, 0.1)',
        '& .MuiTableCell-root': {
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#ffffff'
        }
    },
    '& .MuiTableRow-root': {
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)'
        }
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '25px',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    border: 'none',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    },
    '&:disabled': {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#a0aec0'
    }
}));

const StyledDeleteButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    borderRadius: '25px',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    border: 'none',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
        background: 'linear-gradient(135deg, #ff7979 0%, #f368a7 100%)'
    }
}));

const StyledGreenButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    borderRadius: '25px',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    border: 'none',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(78, 205, 196, 0.4)',
        background: 'linear-gradient(135deg, #5ee7df 0%, #66a6ff 100%)'
    }
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px 15px 0 0',
    '& .MuiBottomNavigationAction-root': {
        color: '#a0aec0',
        '&.Mui-selected': {
            color: '#667eea'
        },
        '&:hover': {
            color: '#ffffff'
        }
    }
}));

const StyledDetailsCard = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center'
}));

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    color: '#a0aec0',
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem'
}));

const StyledAttendancePercentage = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px'
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

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id
    const address = "Student"

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID])

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('table');
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password }

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
    }

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
    }

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <>
                    <StyledTitle variant="h4">
                        📊 Attendance Records
                    </StyledTitle>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Total Sessions</StyledTableCell>
                                <StyledTableCell>Attendance Percentage</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            return (
                                <TableBody key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell>{present}</StyledTableCell>
                                        <StyledTableCell>{sessions}</StyledTableCell>
                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <StyledButton variant="contained" size="small" sx={{ mr: 1 }}
                                                onClick={() => handleOpen(subId)}>
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                            </StyledButton>
                                            <IconButton onClick={() => removeSubAttendance(subId)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                            <StyledGreenButton variant="contained" size="small" sx={{ ml: 1 }}
                                                onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
                                                Change
                                            </StyledGreenButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <StyledSubTitle variant="h6" gutterBottom component="div">
                                                        📅 Attendance Details
                                                    </StyledSubTitle>
                                                    <StyledTable size="small">
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
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </StyledTable>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        }
                        )}
                    </StyledTable>
                    <StyledAttendancePercentage variant="h5">
                        📈 Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                    </StyledAttendancePercentage>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <StyledDeleteButton variant="contained" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>
                            Delete All
                        </StyledDeleteButton>
                        <StyledButton variant="contained" onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
                            Add Attendance
                        </StyledButton>
                    </Box>
                </>
            )
        }
        const renderChartSection = () => {
            return (
                <>
                    <StyledTitle variant="h4">
                        📊 Attendance Analytics
                    </StyledTitle>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </>
            )
        }
        return (
            <>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <StyledBottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </StyledBottomNavigation>
                        </Paper>
                    </>
                    :
                    <StyledButton variant="contained" onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
                        Add Attendance
                    </StyledButton>
                }
            </>
        )
    }

    const StudentMarksSection = () => {
        const renderTableSection = () => {
            return (
                <>
                    <StyledTitle variant="h4">
                        📝 Subject Marks
                    </StyledTitle>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Marks</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <StyledButton variant="contained" onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
                            Add Marks
                        </StyledButton>
                    </Box>
                </>
            )
        }
        const renderChartSection = () => {
            return (
                <>
                    <StyledTitle variant="h4">
                        📊 Marks Analytics
                    </StyledTitle>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </>
            )
        }
        return (
            <>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <StyledBottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </StyledBottomNavigation>
                        </Paper>
                    </>
                    :
                    <StyledButton variant="contained" onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
                        Add Marks
                    </StyledButton>
                }
            </>
        )
    }

    const StudentDetailsSection = () => {
        return (
            <>
                <StyledTitle variant="h4">
                    👤 Student Details
                </StyledTitle>
                <StyledDetailsCard>
                    <StyledSubTitle variant="h6">
                        📛 Name: {userDetails.name}
                    </StyledSubTitle>
                    <StyledSubTitle variant="h6">
                        🎯 Roll Number: {userDetails.rollNum}
                    </StyledSubTitle>
                    <StyledSubTitle variant="h6">
                        🏫 Class: {sclassName.sclassName}
                    </StyledSubTitle>
                    <StyledSubTitle variant="h6">
                        🎓 School: {studentSchool.schoolName}
                    </StyledSubTitle>
                    {
                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                            <Box sx={{ mt: 3 }}>
                                <StyledSubTitle variant="h6">
                                    📊 Attendance Overview
                                </StyledSubTitle>
                                <CustomPieChart data={chartData} />
                            </Box>
                        )
                    }
                </StyledDetailsCard>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <StyledDeleteButton variant="contained" onClick={deleteHandler}>
                        Delete Student
                    </StyledDeleteButton>
                </Box>
            </>
        )
    }

    return (
        <>
            {loading
                ?
                <LoadingContainer>
                    <div className="loading-text">Loading...</div>
                </LoadingContainer>
                :
                <StyledContainer>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <StyledTabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList 
                                    onChange={handleChange} 
                                    sx={{ 
                                        position: 'fixed', 
                                        width: '100%', 
                                        bgcolor: 'transparent', 
                                        zIndex: 1000,
                                        top: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                >
                                    <Tab label="Details" value="1" />
                                    <Tab label="Attendance" value="2" />
                                    <Tab label="Marks" value="3" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "5rem", marginBottom: "4rem", position: 'relative', zIndex: 1 }}>
                                <TabPanel value="1">
                                    <StyledTabPanel>
                                        <StudentDetailsSection />
                                    </StyledTabPanel>
                                </TabPanel>
                                <TabPanel value="2">
                                    <StyledTabPanel>
                                        <StudentAttendanceSection />
                                    </StyledTabPanel>
                                </TabPanel>
                                <TabPanel value="3">
                                    <StyledTabPanel>
                                        <StudentMarksSection />
                                    </StyledTabPanel>
                                </TabPanel>
                            </Container>
                        </StyledTabContext>
                    </Box>
                </StyledContainer>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default ViewStudent