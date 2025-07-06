import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Box, IconButton, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

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
    },
    // ** FIXED & COMPLETE TABLE STYLES **
    '& .MuiTableCell-root': {
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.1) !important',
    },
    '& .MuiTablePagination-root': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiSelect-icon': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiTablePagination-actions .MuiIconButton-root': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiTablePagination-actions .MuiIconButton-root.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.3)',
    },
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

const StyledAddButton = styled(GreenButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    borderRadius: '50px',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(76, 175, 80, 0.4)',
        background: 'linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)'
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

const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
    borderRadius: '50%',
    padding: '10px',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(244, 67, 54, 0.3)',
        background: 'linear-gradient(135deg, #ef5350 0%, #c62828 100%)'
    },
    '& .MuiSvgIcon-root': {
        color: '#ffffff'
    }
}));

const ShowNotices = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)
    
    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);
    
    if (error) {
        console.log(error);
    }
    
    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            })
    }
    
    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];
    
    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });
    
    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <StyledDeleteButton onClick={() => deleteHandler(row.id, "Notice")}>
                    <DeleteIcon />
                </StyledDeleteButton>
            </>
        );
    };
    
    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];
    
    return (
        <>
            {loading ?
                <LoadingContainer>
                    <div className="loading-text">Loading notices...</div>
                </LoadingContainer>
                :
                <>
                    {response ?
                        <StyledContainer>
                            <NoDataContainer>
                                <NotificationsIcon sx={{ fontSize: '4rem', color: '#667eea', marginBottom: '1rem' }} />
                                <div className="no-data-text">
                                    No notices available
                                </div>
                                <StyledAddButton variant="contained"
                                    onClick={() => navigate("/Admin/addnotice")}>
                                    <AddIcon sx={{ marginRight: '0.5rem' }} />
                                    Add Notice
                                </StyledAddButton>
                            </NoDataContainer>
                        </StyledContainer>
                        :
                        <StyledContainer>
                            <StyledTitle variant="h3">
                                <NotificationsIcon sx={{ fontSize: '3rem', color: '#667eea' }} />
                                Notices Management
                            </StyledTitle>
                            <StyledPaper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(noticesList) && noticesList.length > 0 &&
                                    <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                                }
                                <SpeedDialTemplate actions={actions} />
                            </StyledPaper>
                        </StyledContainer>
                    }
                </>
            }
        </>
    );
};

export default ShowNotices;