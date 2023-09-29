import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useToasts } from 'react-toast-notifications';

const baseUrl = 'https://localhost:7090/api/Authentication/register';  // Update with your actual registration endpoint

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
        passwordHash: password,  // Assuming passwordHash is the hashed password
        fullName,
        email,
      });

      console.log('Registration successful:', response.data);

      // TODO: Redirect to login page or handle registration success in your application

      // Display a success toast
      addToast('Registration successful', { appearance: 'success' });
      window.location.href = '/';
    } catch (error) {
      console.error('Registration failed:', error);
      // Display an error toast
      addToast('Registration failed. Please try again.', { appearance: 'error' });
    }
  };

  return (
    <div className='login-container'>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <div>
          
          <Button variant="contained" color="primary" onClick={handleRegister}>
           Register
        </Button>
        </div>
      </Grid>
      </Grid>
      </div>
  );
};

export default RegisterComponent;
