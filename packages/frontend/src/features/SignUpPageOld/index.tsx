import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { signUp as signUpApiCall } from '../../api/sign-up';
import FullScreenLoader from '../Loader/FullScreenLoader';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Copyright © Pawza {new Date().getFullYear()}.
    </Typography>
  );
}

export default function SignUpPage() {
  const { rive, RiveComponent } = useRive({
    src: 'login_screen_character.riv',
    stateMachines: 'StateMachine1',
    autoplay: true,
    artboard: 'Artboard',
  });

  const handsUp = useStateMachineInput(rive, 'StateMachine1', 'hands_up');
  const check = useStateMachineInput(rive, 'StateMachine1', 'Check');
  const look = useStateMachineInput(rive, 'StateMachine1', 'Look');
  const fail = useStateMachineInput(rive, 'StateMachine1', 'fail');
  const success = useStateMachineInput(rive, 'StateMachine1', 'success');

  const animationHandle = () => {
    check.value = false;
  };
  const [email, setEmail] = useState('');

  const checkHandle = (e) => {
    setEmail(e.target.value);
    handsUp.value = false;
    check.value = true;
    look.value = email.length * 3;
  };

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    mutateAsync: signUp,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) => signUpApiCall(data),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await signUp({ email, password });
      if (res.status === 201) {
        navigate({ to: '/login' });
      }
    } catch (e) {
      // Handle the error (show message or something)
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: '12lvh' }}>
      {isPending ? (
        <FullScreenLoader />
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ width: '100%', height: 200 }}>
            <RiveComponent />
          </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => checkHandle(e)}
              onClick={() => (handsUp.value = false)}
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
              onSelect={() => (handsUp.value = true)}
            />
            <Button
              onClick={() => animationHandle()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
            >
              Sign Up
            </Button>

            <Link to="/login">{'Already have an account? Login'}</Link>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      )}
    </Container>
  );
}
