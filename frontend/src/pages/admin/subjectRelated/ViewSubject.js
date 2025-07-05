import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

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
  width: '100%',
  color: '#ffffff'
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  zIndex: 1000,
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiTab-root': {
    color: '#ffffff',
    textTransform: 'none',
    fontSize: '1.1rem',
    fontWeight: 600,
    padding: '16px 24px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.1)',
      transform: 'translateY(-2px)'
    },
    '&.Mui-selected': {
      color: '#667eea',
      background: 'rgba(102, 126, 234, 0.1)'
    }
  },
  '& .MuiTabs-indicator': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    height: '3px',
    borderRadius: '2px'
  }
}));

const StyledContainer2 = styled(Container)(({ theme }) => ({
  marginTop: '5rem',
  marginBottom: '6rem',
  position: 'relative',
  zIndex: 1,
  color: '#ffffff'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  color: '#ffffff',
  padding: '2rem',
  animation: 'slideUp 0.8s ease-out',
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

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: 'none',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiBottomNavigationAction-root': {
    color: '#ffffff',
    '&.Mui-selected': {
      color: '#667eea'
    }
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  marginBottom: '1.5rem',
  '&.title': {
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 800,
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
  },
  '&.detail': {
    background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 600,
    marginBottom: '1rem'
  }
}));

const StyledGreenButton = styled(GreenButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '50px',
  padding: '15px 30px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
    background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
  }
}));

const StyledBlueButton = styled(BlueButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '25px',
  padding: '10px 20px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  marginRight: '10px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
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

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  })

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <StyledBlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </StyledBlueButton>
        <StyledPurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </StyledPurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        <StyledBlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </StyledBlueButton>
        <StyledPurpleButton variant="contained"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
          Provide Marks
        </StyledPurpleButton>
      </>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <StyledPaper>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <StyledGreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add Students
              </StyledGreenButton>
            </Box>
          </>
        ) : (
          <>
            <StyledTypography variant="h4" className="title" gutterBottom>
              Students Management
            </StyledTypography>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            <StyledBottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
              <BottomNavigationAction
                label="Attendance"
                value="attendance"
                icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
              />
              <BottomNavigationAction
                label="Marks"
                value="marks"
                icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
              />
            </StyledBottomNavigation>
          </>
        )}
      </StyledPaper>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <StyledPaper>
        <StyledTypography variant="h4" className="title" gutterBottom>
          Subject Details
        </StyledTypography>
        <StyledTypography variant="h6" className="detail" gutterBottom>
          Subject Name : {subjectDetails && subjectDetails.subName}
        </StyledTypography>
        <StyledTypography variant="h6" className="detail" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </StyledTypography>
        <StyledTypography variant="h6" className="detail" gutterBottom>
          Subject Sessions : {subjectDetails && subjectDetails.sessions}
        </StyledTypography>
        <StyledTypography variant="h6" className="detail" gutterBottom>
          Number of Students: {numberOfStudents}
        </StyledTypography>
        <StyledTypography variant="h6" className="detail" gutterBottom>
          Class Name : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
        </StyledTypography>
        {subjectDetails && subjectDetails.teacher ?
          <StyledTypography variant="h6" className="detail" gutterBottom>
            Teacher Name : {subjectDetails.teacher.name}
          </StyledTypography>
          :
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <StyledGreenButton variant="contained"
              onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
              Add Subject Teacher
            </StyledGreenButton>
          </Box>
        }
      </StyledPaper>
    );
  }

  return (
    <StyledContainer>
      {subloading ?
        <LoadingContainer>
          <div className="loading-text">Loading...</div>
        </LoadingContainer>
        :
        <StyledTabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabList onChange={handleChange}>
              <Tab label="Details" value="1" />
              <Tab label="Students" value="2" />
            </StyledTabList>
          </Box>
          <StyledContainer2>
            <TabPanel value="1">
              <SubjectDetailsSection />
            </TabPanel>
            <TabPanel value="2">
              <SubjectStudentsSection />
            </TabPanel>
          </StyledContainer2>
        </StyledTabContext>
      }
    </StyledContainer>
  )
}

export default ViewSubject