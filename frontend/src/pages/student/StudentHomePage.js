import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Card, CardContent, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { MenuBook, AssignmentTurnedIn, InsertChart } from '@mui/icons-material';

const StudentHomePage = () => {
  const dispatch = useDispatch();

  const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const classID = currentUser.sclassName._id;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  }, [dispatch, currentUser._id, classID]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const numberOfSubjects = subjectsList?.length || 0;
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        🎓 Welcome to your Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <StatCard icon={<MenuBook />} title="Total Subjects" value={numberOfSubjects} color="#7f56da" />
        <StatCard icon={<AssignmentTurnedIn />} title="Total Assignments" value={15} color="#ff6b6b" />

        {/* Attendance Pie Chart */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" textAlign="center" mb={2}>📊 Attendance</Typography>
            {response ? (
              <Typography align="center">No Attendance Found</Typography>
            ) : loading ? (
              <Typography align="center">Loading...</Typography>
            ) : subjectAttendance.length > 0 ? (
              <CustomPieChart data={chartData} />
            ) : (
              <Typography align="center">No Attendance Found</Typography>
            )}
          </Card>
        </Grid>

        {/* Notices */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              📢 Notices
            </Typography>
            <SeeNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
const StatCard = ({ title, icon, value, color }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            <CountUp start={0} end={value} duration={2} />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
export default StudentHomePage;