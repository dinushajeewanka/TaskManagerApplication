import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Container, Box, Checkbox, Link, FormControlLabel } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
import { redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const baseUrl = 'https://localhost:7090/api/Authentication/login';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [passwordHash, setPassword] = useState('');
  const { addToast } = useToasts();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseUrl, { username, passwordHash });
      const token = response.data.token;
      console.log('Login successful. Token:', token);

      localStorage.setItem('token', token);

      // Display a success toast
      addToast('Login successful', { appearance: 'success' });
      window.location.href = '/view-task';
    } catch (error) {
      console.error('Login failed:', error);
      addToast('Login failed. Please try again.', { appearance: 'error' });
    }
  };

  const handleRegister = () => {
    window.location.href = '/register';
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            autoComplete="current-password"
            label="Password"
            type="password"
            value={passwordHash}
            onChange={handlePasswordChange}
            variant="outlined"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="contained" color="primary" onClick={handleRegister}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginComponent;
