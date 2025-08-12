import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const AdminLayout = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>🛠 Admin Panel</Typography>
      <Outlet />
    </Box>
  );
};

export default AdminLayout;