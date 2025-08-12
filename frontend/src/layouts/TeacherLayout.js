import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const TeacherLayout = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>📘 Teacher Dashboard</Typography>
      <Outlet />
    </Box>
  );
};

export default TeacherLayout;