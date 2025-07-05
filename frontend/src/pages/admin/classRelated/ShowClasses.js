import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

// Styled Components for Modern Dark Theme (matching AddClass)
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

const StyledBox = styled(Box)(({ theme }) => ({
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
    maxWidth: '1200px',
    width: '100%',
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

const StyledBlueButton = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    },
    '&:active': {
        transform: 'translateY(-1px)',
    }
}));

const StyledActionButton = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    borderRadius: '50px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
        background: 'linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)'
    }
}));

const StyledViewButton = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #7c6ce8 0%, #8a5ca8 100%)'
    }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
    }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: 'rgba(44, 44, 46, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
        overflow: 'visible',
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            background: 'rgba(44, 44, 46, 0.95)',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: 'none',
            borderRight: 'none'
        }
    },
    '& .MuiMenuItem-root': {
        color: '#ffffff',
        padding: '12px 20px',
        transition: 'all 0.2s ease',
        '&:hover': {
            background: 'rgba(102, 126, 234, 0.2)',
            transform: 'translateX(5px)'
        }
    }
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    animation: 'fadeIn 0.8s ease-out',
    '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(30px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
    }
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    '& .MuiCircularProgress-root': {
        color: '#667eea'
    }
}));

const ShowClasses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;
    
    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);
    
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    
    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };
    
    const sclassColumns = [{ id: 'name', label: 'Class Name', minWidth: 170 }];
    const sclassRows = sclassesList && sclassesList.map((sclass) => ({ name: sclass.sclassName, id: sclass._id }));

    const SclassButtonHaver = ({ row }) => {
        const actions = [
            { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
            { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
        ];
        
        return (
            <ButtonContainer>
                <StyledIconButton onClick={() => deleteHandler(row.id, "Sclass")}>
                    <DeleteIcon color="error" />
                </StyledIconButton>
                <StyledViewButton onClick={() => navigate("/Admin/classes/class/" + row.id)}>
                    View
                </StyledViewButton>
                <ActionMenu actions={actions} />
            </ButtonContainer>
        );
    };

    const ActionMenu = ({ actions }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);
        
        return (
            <>
                <Tooltip title="Add Students & Subjects">
                    <StyledIconButton onClick={handleClick} size="small">
                        <SpeedDialIcon />
                    </StyledIconButton>
                </Tooltip>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {actions.map((action, index) => (
                        <MenuItem key={index} onClick={action.action}>
                            <ListItemIcon sx={{ color: '#bdbdbd' }}>
                                {action.icon}
                            </ListItemIcon>
                            {action.name}
                        </MenuItem>
                    ))}
                </StyledMenu>
            </>
        );
    };

    const actions = [
        { icon: <AddCardIcon color="primary" />, name: 'Add New Class', action: () => navigate("/Admin/addclass") },
        { icon: <DeleteIcon color="error" />, name: 'Delete All Classes', action: () => deleteHandler(adminID, "Sclasses") },
    ];

    return (
        <StyledContainer>
            <StyledBox>
                <StyledTitle variant="h3">
                    <ClassIcon sx={{ fontSize: '3rem', color: '#667eea' }} />
                    Manage Classes
                </StyledTitle>
                
                {loading ? (
                    <LoadingContainer>
                        <CircularProgress size={60} />
                    </LoadingContainer>
                ) : (
                    <>
                        {getresponse ? (
                            <EmptyStateContainer>
                                <SchoolIcon sx={{ fontSize: '4rem', color: '#667eea', mb: 2 }} />
                                <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
                                    No Classes Found
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                                    Get started by creating your first class
                                </Typography>
                                <StyledBlueButton onClick={() => navigate("/Admin/addclass")}>
                                    <AddCardIcon sx={{ marginRight: '0.5rem' }} />
                                    Add New Class
                                </StyledBlueButton>
                            </EmptyStateContainer>
                        ) : (
                            <>
                                {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                    <TableTemplate 
                                        buttonHaver={SclassButtonHaver} 
                                        columns={sclassColumns} 
                                        rows={sclassRows} 
                                    />
                                )}
                                <SpeedDialTemplate actions={actions} />
                            </>
                        )}
                    </>
                )}
            </StyledBox>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ShowClasses;