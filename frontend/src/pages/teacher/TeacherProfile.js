import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// --- Icon Components (for a cleaner look) ---
const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmailIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    </IconWrapper>
);

const ClassIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    </IconWrapper>
);

const SubjectIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    </IconWrapper>
);

const SchoolIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    </IconWrapper>
);

// --- Main Component ---
const TeacherProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Fallback for missing data to prevent errors
  const name = currentUser?.name || 'Teacher Name';
  const email = currentUser?.email || 'teacher@example.com';
  const sclassName = currentUser?.teachSclass?.sclassName || 'Not Assigned';
  const subName = currentUser?.teachSubject?.subName || 'Not Assigned';
  const schoolName = currentUser?.school?.schoolName || 'School Name';

  const userInitial = name ? name[0].toUpperCase() : 'T';

  return (
    <ProfileContainer>
      <StyledCard>
        <CardContent>
          <Avatar>{userInitial}</Avatar>
          <Name variant="h4" component="h2">{name}</Name>
          <Role variant="body1">Teacher</Role>
          
          <InfoSection>
            <InfoRow>
              <EmailIcon />
              <InfoText>{email}</InfoText>
            </InfoRow>
            <InfoRow>
              <ClassIcon />
              <InfoText>Class: {sclassName}</InfoText>
            </InfoRow>
            <InfoRow>
              <SubjectIcon />
              <InfoText>Subject: {subName}</InfoText>
            </InfoRow>
            <InfoRow>
              <SchoolIcon />
              <InfoText>School: {schoolName}</InfoText>
            </InfoRow>
          </InfoSection>

        </CardContent>
      </StyledCard>
    </ProfileContainer>
  )
}

export default TeacherProfile

// --- Styled Components ---
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  min-height: calc(100vh - 64px); /* Adjust 64px to your header's height */
  background-color: #f7f8fc;
`;

const StyledCard = styled(Card)`
  && {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 500px;
    padding: 20px;

    .MuiCardContent-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 16px;
    }
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #1976D2; /* Match header blue */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Name = styled(Typography)`
  && {
    margin: 0;
    font-weight: 600;
    color: #333;
  }
`;

const Role = styled(Typography)`
  && {
    margin: 4px 0 24px 0;
    color: #777;
    border-bottom: 1px solid #eee;
    padding-bottom: 24px;
    width: 100%;
  }
`;

const InfoSection = styled.div`
  text-align: left;
  width: 100%;
  max-width: 350px; /* To keep the info rows from getting too wide */
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0;
`;

const InfoText = styled(Typography)`
  && {
    margin-left: 15px;
    font-size: 1rem;
    color: #333;
  }
`;