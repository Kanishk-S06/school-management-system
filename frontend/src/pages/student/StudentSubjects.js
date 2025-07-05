import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Box } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import { styled } from '@mui/material/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

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

const StyledContentContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: '40px 20px 100px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
}));

const StyledTableContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
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

const StyledChartContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledClassDetailsContainer = styled(Container)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out',
    marginTop: '40px',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(102, 126, 234, 0.3)'
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
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    animation: 'fadeInUp 0.8s ease-out 0.4s both'
}));

const StyledSubjectItem = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    animation: 'slideIn 0.6s ease-out',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        transform: 'translateX(10px)',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
    },
    '@keyframes slideIn': {
        from: {
            opacity: 0,
            transform: 'translateX(-20px)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
}));

const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-root': {
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '1.1rem',
        padding: '16px 20px'
    },
    '& .MuiTableHead-root': {
        '& .MuiTableCell-root': {
            background: 'rgba(102, 126, 234, 0.1)',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: '#667eea'
        }
    },
    '& .MuiTableRow-root': {
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(102, 126, 234, 0.1)',
            transform: 'scale(1.01)'
        }
    }
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    background: 'rgba(26, 26, 46, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px 20px 0 0',
    '& .MuiBottomNavigationAction-root': {
        color: '#a0aec0',
        fontSize: '1rem',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        '&.Mui-selected': {
            color: '#667eea',
            '& .MuiSvgIcon-root': {
                filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.6))'
            }
        },
        '&:hover': {
            color: '#667eea',
            transform: 'translateY(-2px)'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '1.8rem'
        }
    }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    background: 'rgba(26, 26, 46, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)'
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

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <StyledTableContainer>
                <StyledTitle variant="h4">
                    Subject Marks
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
            </StyledTableContainer>
        );
    };

    const renderChartSection = () => {
        return (
            <StyledChartContainer>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </StyledChartContainer>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <StyledClassDetailsContainer>
                <StyledTitle variant="h4">
                    Class Details
                </StyledTitle>
                <StyledSubTitle variant="h5">
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                </StyledSubTitle>
                <StyledSubTitle variant="h6">
                    And these are the subjects:
                </StyledSubTitle>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <StyledSubjectItem key={index}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    color: '#ffffff',
                                    fontSize: '1.2rem',
                                    fontWeight: 500
                                }}
                            >
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        </StyledSubjectItem>
                    ))}
            </StyledClassDetailsContainer>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <div className="loading-text">Loading...</div>
                </LoadingContainer>
            ) : (
                <StyledContainer>
                    <StyledContentContainer>
                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                            ?
                            (<>
                                {selectedSection === 'table' && renderTableSection()}
                                {selectedSection === 'chart' && renderChartSection()}

                                <StyledPaper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
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
                                </StyledPaper>
                            </>)
                            :
                            (<>
                                {renderClassDetailsSection()}
                            </>)
                        }
                    </StyledContentContainer>
                </StyledContainer>
            )}
        </>
    );
};

export default StudentSubjects;