import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox, Typography
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import { styled } from '@mui/material/styles';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
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
    // ** FIXED TABLE STYLES **
    '& .MuiTableCell-root': {
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
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

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '12px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        transform: 'scale(1.1)',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.2)'
    },
    '&.Mui-checked': {
        color: '#667eea',
        '&:hover': {
            backgroundColor: 'rgba(102, 126, 234, 0.2)'
        }
    },
    '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
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
        fontSize: '1.5rem',
        fontWeight: 600,
        textAlign: 'center',
        animation: 'fadeInUp 0.8s ease-out',
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
    }
}));

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);
  
  if (error) {
    console.log(error);
  }
  
  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];
  
  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });
  
  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <StyledCheckbox {...label} />
      </>
    );
  };
  
  return (
    <StyledContainer>
      {loading ?
        <LoadingContainer>
          <div className="loading-text">Loading...</div>
        </LoadingContainer>
        :
        <>
          <StyledTitle variant="h3">
            Complaints Management
          </StyledTitle>
          {response ?
            <NoDataContainer>
              <div className="no-data-text">
                No Complaints Right Now
              </div>
            </NoDataContainer>
            :
            <StyledPaper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </StyledPaper>
          }
        </>
      }
    </StyledContainer>
  );
};

export default SeeComplains;