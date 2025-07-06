// --- START OF FILE TeacherClassDetails.js ---
// ... (imports and other styled components remain the same) ...
import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import { BlackButton, BlueButton} from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
}));

const StyledMainContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1200px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    animation: 'slideUp 0.8s ease-out',
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

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    color: '#a0aec0',
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '2rem',
    textAlign: 'left',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    background: 'transparent',
    boxShadow: 'none',
    // ** ADDED STYLES FOR TABLE TEXT COLOR **
    '& .MuiTableCell-head': {
        color: 'rgba(255, 255, 255, 0.9)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 'bold',
    },
    '& .MuiTableCell-body': {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiSelect-icon': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
}));

// ... (rest of the styled components are unchanged)
const StyledButton = styled(BlueButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    marginRight: '10px',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    }
}));

const StyledBlackButton = styled(BlackButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
    borderRadius: '50px',
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
        background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
    }
}));

const StyledActionButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    }
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 1300,
    '& .MuiPaper-root': {
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        '& .MuiMenuItem-root': {
            color: '#ffffff',
            padding: '12px 20px',
            fontSize: '1rem',
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
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
}));

const TeacherClassDetails = () => {
    // ... (logic remains unchanged)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
        }
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StyledButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Teacher/class/student/" + row.id)
                    }
                >
                    View
                </StyledButton>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <StyledActionButton onClick={handleClick}>
                            {options[selectedIndex]}
                        </StyledActionButton>
                        <StyledBlackButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </StyledBlackButton>
                    </ButtonGroup>
                    <StyledPopper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </StyledPopper>
                </React.Fragment>
            </Box>
        );
    };


    return (
        <>
            {loading ? (
                <LoadingContainer>
                    Loading...
                </LoadingContainer>
            ) : (
                <StyledContainer>
                    <StyledMainContainer>
                        <StyledTitle variant="h3">
                            Class Details
                        </StyledTitle>
                        {getresponse ? (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '200px',
                                color: '#a0aec0',
                                fontSize: '1.2rem',
                                fontWeight: 600
                            }}>
                                No Students Found
                            </Box>
                        ) : (
                            <StyledPaper sx={{ width: '100%', overflow: 'hidden' }}>
                                <StyledSubTitle variant="h5">
                                    Students List:
                                </StyledSubTitle>
                                {Array.isArray(sclassStudents) && sclassStudents.length > 0 &&
                                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                                }
                            </StyledPaper>
                        )}
                    </StyledMainContainer>
                </StyledContainer>
            )}
        </>
    );
};

export default TeacherClassDetails;