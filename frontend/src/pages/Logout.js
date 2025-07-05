// --- START OF FILE Logout.js ---

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { authLogout } from '../redux/userRelated/userSlice';

// --- Styled Components ---

const bgFlow = keyframes`
    from { transform: translateY(0px) rotate(0deg) scale(1.2); }
    to { transform: translateY(-20px) rotate(10deg) scale(1.3); }
`;

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #0a0a0a;
    }
`;

const BgAnimation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 80% 30%, rgba(255, 119, 198, 0.2) 0%, transparent 40%);
    animation: ${bgFlow} 25s ease-in-out infinite alternate;
`;

const LogoutPageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoutContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    color: white;
    max-width: 500px;
    text-align: center;
`;

const WelcomeMessage = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffffff 50%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const LogoutMessage = styled.p`
    margin-bottom: 2rem;
    font-size: 1.1rem;
    color: #a0aec0;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 12px 30px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
    }
`;

const LogoutButton = styled(Button)`
    background: linear-gradient(135deg, #e53935 0%, #b71c1c 100%);
    &:hover {
        box-shadow: 0 10px 20px rgba(229, 57, 53, 0.3);
    }
`;

const CancelButton = styled(Button)`
    background: transparent;
    border: 2px solid #667eea;
    color: #667eea;
    &:hover {
        background-color: #667eea;
        color: white;
    }
`;

const Logout = () => {
    // --- NO LOGIC CHANGES HERE ---
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutPageContainer>
            <GlobalStyle />
            <BgAnimation />
            <LogoutContainer>
                <WelcomeMessage>{currentUser.name}</WelcomeMessage>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </ButtonContainer>
            </LogoutContainer>
        </LogoutPageContainer>
    );
};

export default Logout;