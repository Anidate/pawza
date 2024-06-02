import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React from 'react';

import { type UserFields } from '.';

type SetUserInfoState = (x: UserFields) => UserFields;
type SetFillState = (x: boolean) => boolean;
interface UserProps {
  changeUserAttribute: SetUserInfoState;
  user: UserFields;
  changeState: SetFillState;
  fillState: boolean;
}

export default function UserInfo({ changeUserAttribute, user, changeState, fillState }: UserProps) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dob, setDob] = React.useState<string | null>(null);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  const user1: UserFields = {
    firstNameField: '',
    lastNameField: '',
    emailField: '',
    passwordField: '',
    DOB: new Date(),
  };
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && dob !== null) {
        changeState(true);
        user1.firstNameField = firstName;
        user1.lastNameField = lastName;
        user1.emailField = email;
        user1.passwordField = password;
        user1.DOB = new Date(dob);
        changeUserAttribute(user1);
      } else changeState(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [firstName, lastName, email, password, dob]);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Copyright © Pawza {new Date().getFullYear()}.
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                onChange={handleFormChange}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Birth Date"
                    sx={{ width: '100%' }}
                    onChange={(newValue: string | null) => setDob(newValue || null)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
