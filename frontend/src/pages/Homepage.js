import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.png";
import Navbar from '../components/Navbar';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection>
        <GlassCard>
          <Typography variant="h3" className="heading">My School(82)</Typography>
          <Typography className="desc">
            Optimizing educational environment with seamless,comprehensive and fast tracking and cordination of students and teachers😊.
          </Typography>
          <ButtonGroup>
            <StyledLink to="/choose">
              <StyledButton fullWidth>Login</StyledButton>
            </StyledLink>
            <StyledLink to="/chooseasguest">
              <OutlinedBtn fullWidth>Try as Guest</OutlinedBtn>
            </StyledLink>
            <Typography variant="body2" className="signup-text">
              New Admin? <Link to="/Adminregister" className="signup-link">Register here</Link>
            </Typography>
          </ButtonGroup>
        </GlassCard>
        <HeroImage src={Students} alt="Education" />
      </HeroSection>
    </>
  );
};

const HeroSection = styled(Box)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #e2d4f7, #f8f4ff);
  padding: 40px;
  flex-wrap: wrap;
`;

const HeroImage = styled.img`
  width: 45%;
  max-width: 500px;
`;

const GlassCard = styled(Box)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  padding: 40px;
  width: 400px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  color: #333;

  .heading {
    font-weight: 700;
    color: #5a00b3;
    margin-bottom: 20px;
  }

  .desc {
    margin-bottom: 30px;
    font-size: 1rem;
    line-height: 1.6;
  }

  .signup-text {
    margin-top: 20px;
  }

  .signup-link {
    color: #5a00b3;
    font-weight: 600;
    text-decoration: none;
  }
`;

const ButtonGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #7f56da;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: #673ab7;
    }
  }
`;

const OutlinedBtn = styled(Button)`
  && {
    border: 2px solid #7f56da;
    color: #7f56da;
    font-weight: bold;
    &:hover {
      background-color: #eee2ff;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Homepage;