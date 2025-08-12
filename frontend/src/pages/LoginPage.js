import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, TextField, IconButton, InputAdornment,
  CircularProgress, Backdrop, Grid, Checkbox, FormControlLabel, CssBaseline, Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';

const theme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [fields, setFields] = useState({
    email: '', password: '', rollNumber: '', studentName: ''
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));

    // Clear errors on change
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const { rollNumber, studentName, password } = fields;

      if (!rollNumber || !studentName || !password) {
        setRollNumberError(!rollNumber);
        setStudentNameError(!studentName);
        setPasswordError(!password);
        return;
      }

      dispatch(loginUser({ rollNum: rollNumber, studentName, password }, role));
    } else {
      const { email, password } = fields;

      if (!email || !password) {
        setEmailError(!email);
        setPasswordError(!password);
        return;
      }

      dispatch(loginUser({ email, password }, role));
    }

    setLoader(true);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      dispatch(loginUser({ email: "user@123", password }, role));
    } else if (role === "Student") {
      dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, role));
    } else if (role === "Teacher") {
      dispatch(loginUser({ email: "tony@12", password }, role));
    }

    setGuestLoader(true);
  };

  useEffect(() => {
    if ((status === 'success' || currentUser) && currentRole) {
      navigate(`/${currentRole.toLowerCase()}`);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentUser, currentRole, response, error, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {role} Login
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              {role === "Student" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rollNumber"
                    label="Roll Number"
                    name="rollNumber"
                    autoComplete="off"
                    type="number"
                    autoFocus
                    error={rollNumberError}
                    helperText={rollNumberError && 'Roll Number is required'}
                    value={fields.rollNumber}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentName"
                    label="Student Name"
                    name="studentName"
                    autoComplete="name"
                    error={studentNameError}
                    helperText={studentNameError && 'Name is required'}
                    value={fields.studentName}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError && 'Email is required'}
                  value={fields.email}
                  onChange={handleChange}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                value={fields.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                <StyledLink href="#">Forgot password?</StyledLink>
              </Grid>

              <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </LightPurpleButton>

              <Button fullWidth onClick={guestModeHandler} variant="outlined" sx={{ mt: 2, mb: 3 }}>
                Login as Guest
              </Button>

              {role === "Admin" && (
                <Grid container justifyContent="center">
                  <Typography variant="body2">Don't have an account?</Typography>
                  <StyledLink to="/Adminregister" style={{ marginLeft: 6 }}>
                    Sign up
                  </StyledLink>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
        <CircularProgress color="inherit" />
        Please wait...
      </Backdrop>

      <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} />
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #7f56da;
  font-weight: 600;
`;