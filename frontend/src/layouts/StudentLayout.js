import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const StudentLayout = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>🎓 Student Dashboard</Typography>
      <Outlet />
    </Box>
  );
};

export default StudentLayout;