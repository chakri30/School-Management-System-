import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Navbar = () => {
  const { currentUser, currentRole } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <Logo onClick={() => navigate('/')}>MySchool</Logo>
        <NavLinks>
          {!currentUser ? (
            <>
              <StyledLink to="/get-started">
                <Button variant="outlined">Login</Button>
              </StyledLink>
              <StyledLink to="/admin/new">
                <Button variant="text" color="inherit">Register</Button>
              </StyledLink>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: '#eee', mr: 2 }}>
                {currentRole}
              </Typography>
              {/* <Button onClick={handleLogout} variant="contained" color="secondary">
                Logout
              </Button> */}
            </>
          )}
        </NavLinks>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(to right, #2b1055, #7597de);
  padding: 8px 16px;
`;

const Logo = styled(Typography)`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.6rem;
  color: #fff;
  cursor: pointer;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;