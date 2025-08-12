import { useEffect, useState } from 'react';
import {
  Box, CircularProgress, Grid, Paper, Typography, Container, Backdrop
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (user) => {
    if (visitor === "guest") {
      if (user === "Admin") {
        dispatch(loginUser({ email: "user@gmail.com", password }, user));
      } else if (user === "Student") {
        dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, user));
      } else if (user === "Teacher") {
        dispatch(loginUser({ email: "tony@12", password }, user));
      }
      setLoader(true);
    } else {
      if (user === "Admin") navigate("/Adminlogin");
      if (user === "Student") navigate("/Studentlogin");
      if (user === "Teacher") navigate("/Teacherlogin");
    }
  };

  useEffect(() => {
    if (status === 'success' && currentRole) {
      if (currentRole === 'Admin') navigate('/admin');
      else if (currentRole === 'Student') navigate('/student');
      else if (currentRole === 'Teacher') navigate('/teacher');
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {["Admin", "Student", "Teacher"].map(role => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <StyledPaper onClick={() => handleLogin(role)}>
                <Box mb={2}>
                  {role === "Admin" && <AccountCircle fontSize="large" />}
                  {role === "Student" && <School fontSize="large" />}
                  {role === "Teacher" && <Group fontSize="large" />}
                </Box>
                <Typography variant="h6" mb={1}>{role}</Typography>
                <Typography variant="body2">
                  Login as {role.toLowerCase()} to access your dashboard.
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress color="inherit" />
        &nbsp; Please wait...
      </Backdrop>

      <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  &:hover {
    background-color: #2c2c6c;
    color: #fff;
  }
`;