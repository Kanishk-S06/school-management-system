// --- START OF FILE TeacherComplain.js ---

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { Send } from '@mui/icons-material';

// Reusing the styled components from your other themed pages
const StyledContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
}));

const StyledFormContainer = styled(Box)(({ theme }) => ({
    maxWidth: 600,
    width: '100%',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '30px',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    zIndex: 1,
    animation: 'slideUp 0.8s ease-out',
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
    marginBottom: '2rem',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '15px',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(102, 126, 234, 0.5)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#667eea',
        },
        '& input, & textarea': {
            color: '#ffffff',
        }
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-focused': {
            color: '#667eea'
        }
    }
}));

const StyledBlueButton = styled(BlueButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    marginTop: '2rem',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
    },
    '&:disabled': {
        background: 'rgba(255, 255, 255, 0.1)',
    }
}));

const TeacherComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);
    const { loader } = useSelector(state => state.user);

    const address = "Complain";

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user: currentUser._id,
        date,
        complaint,
        school: currentUser.school._id,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setShowPopup(true);
            setMessage("Done Successfully");
            setComplaint("");
        } else if (error) {
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

    return (
        <StyledContainer>
            <StyledFormContainer>
                <StyledTitle variant="h4">
                    Submit a Complaint
                </StyledTitle>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <StyledTextField
                            fullWidth
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <StyledTextField
                            fullWidth
                            label="Write your complaint"
                            variant="outlined"
                            value={complaint}
                            onChange={(event) => setComplaint(event.target.value)}
                            required
                            multiline
                            rows={6}
                        />
                    </Stack>
                    <StyledBlueButton
                        fullWidth
                        size="large"
                        variant="contained"
                        type="submit"
                        disabled={loader}
                        endIcon={<Send />}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                    </StyledBlueButton>
                </form>
            </StyledFormContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default TeacherComplain;