import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Container, Box, Checkbox, Link } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import { redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router';
const baseUrl = 'https://localhost:7090/api/Authentication/login';  // Update with your actual login endpoint

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [passwordHash, setPassword] = useState('');
  const { addToast } = useToasts();
  // const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    // history.push('/view-task');
    event.preventDefault();

    try {
      const response = await axios.post(baseUrl, { username, passwordHash });
      const token = response.data.token;
      console.log('Login successful. Token:', token);

      await localStorage.setItem('token', token);

      // Display a success toast
      addToast('Login successful', { appearance: 'success' });
      window.location.href = '/view-task';
      // <Redirect to="/view-task" />
    } catch (error) {
      console.error('Login failed:', error);
      // <Redirect to="/view-task" />
      // window.location.href = '/view-task';
      // Display an error toast
      addToast('Login failed. Please try again.', { appearance: 'error' });
    }
  };

  const handleRegister = () => {
    window.location.href = '/register';
  }

  return (
    <div className='login-container'>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Login</Typography>
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
          value={passwordHash}
          onChange={handlePasswordChange}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
        <Grid item xs={12}>
          <div style={{display: 'inline-flex'}}>
          <div style={{display: 'flex', marginRight: '10px'}}>
            You want to be a member? 
            </div>
            <Link variant="contained" color="primary" onClick={handleRegister}>
              Register
             
            </Link>
            </div>
          
        
      </Grid>
      </Grid>
      </div>

  );
};

export default LoginComponent;
