import { Container, Grid, Card, CardContent, Typography, Avatar, Paper } from '@mui/material';
import { Groups, MenuBook, Timer, Assessment } from '@mui/icons-material';
import CountUp from 'react-countup';
import SeeNotice from '../../components/SeeNotice';
//import styled from 'styled-components';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        📚 Welcome, {currentUser.name}
      </Typography>
      <Grid container spacing={3}>
        <StatCard icon={<Groups />} title="Class Students" value={numberOfStudents} color="#7f56da" />
        <StatCard icon={<MenuBook />} title="Total Lessons" value={numberOfSessions} color="#00b894" />
        <StatCard icon={<Assessment />} title="Tests Taken" value={24} color="#ff6b6b" />
        <StatCard icon={<Timer />} title="Total Hours" value={30} suffix="hrs" color="#f9a825" />

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              📢 Recent Notices
            </Typography>
            <SeeNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
const StatCard = ({ icon, title, value, suffix = "", color }) => (
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
            <CountUp start={0} end={value} duration={2.5} suffix={suffix} />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
export default TeacherHomePage;