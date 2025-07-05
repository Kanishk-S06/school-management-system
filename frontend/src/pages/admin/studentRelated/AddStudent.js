// --- START OF FILE AddStudent.js ---

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

// --- Styled Components ---
const PageContainer = styled.div`
    display: flex; justify-content: center; align-items: center; min-height: 85vh; padding: 2rem;
`;
const FormCard = styled.form`
    background: rgba(44, 44, 46, 0.8); backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 20px;
    color: white; width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 1.5rem;
`;
const FormTitle = styled(Typography)`
    font-size: 2rem !important; font-weight: 700 !important; text-align: center; margin-bottom: 1rem !important;
`;
const InputLabel = styled.label`
    color: #b39ddb; font-size: 0.9rem; font-weight: 500; margin-bottom: 8px; display: block;
`;
const StyledInput = styled.input`
    width: 100%; padding: 14px; background-color: #e8eaf6; border-radius: 10px;
    color: #121212; border: 2px solid transparent; transition: border-color 0.3s ease;
    font-size: 1rem; &:hover { border-color: #b39ddb; } &:focus { outline: none; border-color: #7e57c2; }
`;
const StyledSelect = styled.select`
    width: 100%; padding: 14px; background-color: #e8eaf6; border-radius: 10px;
    color: #121212; border: 2px solid transparent; transition: border-color 0.3s ease;
    font-size: 1rem; &:hover { border-color: #b39ddb; } &:focus { outline: none; border-color: #7e57c2; }
`;
const PrimaryButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;
    color: white; padding: 16px 0; border-radius: 50px; font-weight: 600;
    font-size: 1rem; cursor: pointer; transition: all 0.3s ease;
    &:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
    &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const AddStudent = ({ situation }) => {
    // --- NO LOGIC CHANGES HERE ---
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { status, currentUser, response, error } = useSelector(state => state.user);
    const { sclassesList } = useSelector((state) => state.sclass);
    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];
    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);
    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };
    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };
    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a class");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };
    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <PageContainer>
                <FormCard onSubmit={submitHandler}>
                    <FormTitle>Add Student</FormTitle>
                    <div>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <StyledInput id="name" type="text" placeholder="Enter student's name..." value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
                    </div>
                    {situation === "Student" &&
                        <div>
                            <InputLabel htmlFor="className">Class</InputLabel>
                            <StyledSelect id="className" value={className} onChange={changeHandler} required>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>{classItem.sclassName}</option>
                                ))}
                            </StyledSelect>
                        </div>
                    }
                    <div>
                        <InputLabel htmlFor="rollNum">Roll Number</InputLabel>
                        <StyledInput id="rollNum" type="number" placeholder="Enter student's Roll Number..." value={rollNum} onChange={(event) => setRollNum(event.target.value)} required />
                    </div>
                    <div>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <StyledInput id="password" type="password" placeholder="Enter student's password..." value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
                    </div>
                    <PrimaryButton type="submit" disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
                    </PrimaryButton>
                </FormCard>
            </PageContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddStudent;