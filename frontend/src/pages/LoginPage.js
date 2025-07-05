// --- START OF FILE LoginPage.js ---

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Backdrop, Box, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import bgpic from "../assets/designlogin.jpg";
import Popup from '../components/Popup';
import { loginUser } from '../redux/userRelated/userHandle';

const defaultTheme = createTheme();

// --- Styled Components ---

const bgFlow = keyframes`
    from { transform: translateY(0px) rotate(0deg) scale(1.2); }
    to { transform: translateY(-20px) rotate(10deg) scale(1.3); }
`;

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #1c1c1e;
    }
`;

const BgAnimation = styled.div`
    position: fixed;
    top: 50%;
    left: 75%;
    width: 500px;
    height: 500px;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: radial-gradient(circle, rgba(120, 119, 198, 0.4) 0%, transparent 70%);
    animation: ${bgFlow} 30s ease-in-out infinite alternate;
`;

const PageContainer = styled(Grid)`
    min-height: 100vh;
    padding: 2rem;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled(Grid)`
    background: #2c2c2e;
    border-radius: 20px;
    padding: 3rem;
    color: white;
`;

const ImageContainer = styled(Grid)`
    background: #f5f5f7;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const FloatingCircle = styled.div`
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #8e44ad, #667eea);
    border-radius: 50%;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        height: 40px;
        background: #f5f5f7;
        filter: blur(15px);
    }
`;

// THIS IS THE NEW CUSTOM LABEL COMPONENT
const InputLabel = styled(Typography)`
    color: #b39ddb; /* Light purple color from screenshot */
    font-size: 0.9rem !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
    align-self: flex-start;
`;

const StyledTextField = styled(TextField)`
    & .MuiInputBase-root {
        background-color: #e8eaf6;
        border-radius: 10px;
        color: #121212;
    }
    
    & .MuiOutlinedInput-root fieldset {
        border-color: transparent;
    }

    &:hover .MuiOutlinedInput-root fieldset {
        border: 2px solid #b39ddb;
    }

    & .MuiOutlinedInput-root.Mui-focused fieldset {
        border: 2px solid #7e57c2;
    }
`;

const SubmitButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    padding: 16px 40px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    width: 100%;
    margin-top: 1.5rem;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #bdbdbd;
  transition: color 0.3s;
  font-size: 0.9rem;
  &:hover {
    color: #8e99f3;
  }
`;

const LoginPage = ({ role }) => {
    // --- NO LOGIC CHANGES HERE ---
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;
            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
        else {
            const email = event.target.email.value;
            const password = event.target.password.value;
            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };
    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };
    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') { navigate('/Admin/dashboard'); }
            else if (currentRole === 'Student') { navigate('/Student/dashboard'); }
            else if (currentRole === 'Teacher') { navigate('/Teacher/dashboard'); }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <BgAnimation />
            <PageContainer container>
                <Grid container item xs={11} md={10} lg={9} sx={{ height: 'auto', minHeight: '80vh', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '20px' }}>
                    <FormContainer item xs={12} sm={6} md={5}>
                        <Box sx={{ my: 2, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>{role} Login</Typography>
                            <Typography variant="body1" sx={{ color: '#bdbdbd', mb: 3 }}>
                                Welcome back! Please enter your details
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                {role === "Student" ? (
                                    <>
                                        <InputLabel htmlFor="rollNumber">Enter your Roll Number *</InputLabel>
                                        <StyledTextField fullWidth id="rollNumber" name="rollNumber" type="number" required autoComplete="off" autoFocus error={rollNumberError} helperText={rollNumberError && 'Roll Number is required'} onChange={handleInputChange} sx={{ mb: 2 }} />
                                        
                                        <InputLabel htmlFor="studentName">Enter your name *</InputLabel>
                                        <StyledTextField fullWidth id="studentName" name="studentName" required autoComplete="name" error={studentNameError} helperText={studentNameError && 'Name is required'} onChange={handleInputChange} sx={{ mb: 2 }} />
                                    </>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="email">Enter your email *</InputLabel>
                                        <StyledTextField fullWidth id="email" name="email" required autoComplete="email" autoFocus error={emailError} helperText={emailError && 'Email is required'} onChange={handleInputChange} sx={{ mb: 2 }} />
                                    </>
                                )}
                                
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <StyledTextField fullWidth name="password" type={toggle ? 'text' : 'password'} id="password" required autoComplete="current-password" error={passwordError} helperText={passwordError && 'Password is required'} onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)} sx={{ color: '#424242' }}>
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 2 }}>
                                    <FormControlLabel control={<Checkbox sx={{ color: '#bdbdbd', '&.Mui-checked': { color: '#7e57c2' } }} />} label={<Typography sx={{color: '#bdbdbd', fontSize: '0.9rem'}}>Remember me</Typography>} />
                                    <StyledLink to="#">Forgot password?</StyledLink>
                                </Grid>

                                <SubmitButton type="submit">
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                                </SubmitButton>

                                {role === "Admin" &&
                                    <Grid container justifyContent="center" sx={{ mt: 3, color: '#bdbdbd' }}>
                                        Don't have an account?
                                        <StyledLink to="/Adminregister" sx={{ ml: 1, color: '#8e99f3', fontWeight: '500' }}>Sign up</StyledLink>
                                    </Grid>
                                }
                            </Box>
                        </Box>
                    </FormContainer>
                    <ImageContainer item xs={false} sm={6} md={7}>
                        <FloatingCircle />
                    </ImageContainer>
                </Grid>
            </PageContainer>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
                <CircularProgress color="primary" /> Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage;