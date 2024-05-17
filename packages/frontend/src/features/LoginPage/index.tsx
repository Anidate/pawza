import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { Link, Navigate } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { login as loginApiCall } from '../../api/login';
import { useAuth } from '../Auth/useAuth';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Copyright © Pawza {new Date().getFullYear()}.
    </Typography>
  );
}

export default function Login() {
  const { setAuth, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutateAsync: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApiCall(data),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await login({ email, password });
    // TODO: Error handling
    if (res.status === 200) {
      const { user: newUser, token, refreshToken } = res.data;

      setAuth({ user: newUser, token, refreshToken });
    }
  };

  if (user) {
    <Navigate to="/home" />;
  }

  if (isPending) {
    //
  }

  // Bad, don't do this :)
  const LoginForm = () => (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ mt: 0 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}>
          Sign In
        </Button>

        {/* TODO: Change link to /signup */}
        <Link to="/home">{"Don't have an account? Sign Up"}</Link>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xs" sx={{ py: '12lvh' }}>
      {isPending ? <CircularProgress sx={{ py: '12lvh' }} /> : <LoginForm />}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
