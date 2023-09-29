import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Container, Box, Checkbox, Link, FormControlLabel } from '@mui/material';
import { useToasts } from 'react-toast-notifications';

const baseUrl = 'https://localhost:7090/api/Authentication/register';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const { addToast } = useToasts();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      addToast('Passwords do not match.', { appearance: 'error' });
      return;
    }

    try {
      const response = await axios.post(baseUrl, {
        username,
        passwordHash: password,
        fullName,
        email,
      });

      console.log('Registration successful:', response.data);

      // Display a success toast
      addToast('Registration successful', { appearance: 'success' });
      window.location.href = '/';
    } catch (error) {
      console.error('Registration failed:', error);
      // Display an error toast
      addToast('Registration failed. Please try again.', { appearance: 'error' });
    }
  };

  const handleLogin = () => {
    window.location.href = '/';
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link Link variant="contained" color="primary" onClick={handleLogin}>
                Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterComponent;
