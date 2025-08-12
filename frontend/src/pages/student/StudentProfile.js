import React from 'react';
import styled from 'styled-components';
import {
  Card, CardContent, Typography, Grid, Box,
  Avatar, Container, Paper, Divider
} from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const sclassName = currentUser?.sclassName;
  const studentSchool = currentUser?.school;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <StyledPaper elevation={3}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center">
              <Avatar sx={{ width: 120, height: 120, bgcolor: '#7f56da', fontSize: 40 }}>
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" fontWeight={700}>{currentUser.name}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Roll No: <strong>{currentUser.rollNum}</strong>
            </Typography>
            <Typography variant="subtitle1">
              Class: <strong>{sclassName?.sclassName}</strong>
            </Typography>
            <Typography variant="subtitle1">
              School: <strong>{studentSchool?.schoolName}</strong>
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <Divider sx={{ my: 3 }} />

      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            📋 Personal Information
          </Typography>
          <Grid container spacing={2}>
            <ProfileField label="Date of Birth" value="January 1, 2000" />
            <ProfileField label="Gender" value="Male" />
            <ProfileField label="Email" value="sasi@gmail.com" />
            <ProfileField label="Phone" value="9876543" />
            <ProfileField label="Address" value="Tirupati" />
            <ProfileField label="Emergency Contact" value="100" />
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
const ProfileField = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Grid>
);
const StyledPaper = styled(Paper)`
  padding: 24px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;
export default StudentProfile;