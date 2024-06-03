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
  const [emailValidation, setEmailValidation] = React.useState(true);
  const [passwordValidation, setPasswordValidation] = React.useState(true);
  const [fNameFill, setFNameFill] = React.useState(false);

  const [lNameFill, setLNameFill] = React.useState(false);
  const [tmpFirstName, settmpFirstName] = React.useState('');

  const [tmpLastName, settmpLastName] = React.useState('');
  const [test1, setTest1] = React.useState(false);
  const [test2, setTest2] = React.useState(false);
  const [test3, setTest3] = React.useState(false);

  const checkEmailValidation = (val: string) => {
    // don't remember from where i copied this code, but this works.
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(val.toLowerCase())) {
      setEmailValidation(true);
      setEmail(val);
    } else {
      setEmailValidation(false);
    }
  };

  const checkPasswordValidation = (val: string) => {
    // Minimum eight characters, at least one letter and one number:
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const t1 = /.[A-Za-z].|[A-Za-z].|.[A-Za-z]|[A-Za-z]/;
    const t2 = /.[0-9].|[0-9].|.[0-9]|[0-9]$/;
    const t3 = /^.{8,}\.$/;

    setTest1(!t1.test(val));
    setTest2(!t2.test(val));
    setTest3(!t3.test(val));

    if (re.test(val)) {
      setPasswordValidation(true);
      setPassword(val);
    } else {
      setPasswordValidation(false);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'firstName':
        setFNameFill(true);
        settmpFirstName(event.target.value);
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLNameFill(true);
        settmpLastName(event.target.value);
        setLastName(event.target.value);
        break;
      case 'email':
        checkEmailValidation(event.target.value);
        break;
      case 'password':
        checkPasswordValidation(event.target.value);
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
              {(!fNameFill && tmpFirstName === '') || (fNameFill && tmpFirstName !== '') ? (
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleFormChange}
                />
              ) : (
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleFormChange}
                  error
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {(!lNameFill && tmpLastName === '') || (lNameFill && tmpLastName !== '') ? (
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleFormChange}
                />
              ) : (
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleFormChange}
                  error
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {emailValidation === true ? (
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={handleFormChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              ) : (
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={handleFormChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  error
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {passwordValidation ? (
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
              ) : (
                <>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleFormChange}
                    error
                  />
                  {test1 && <p>Please enter at least 1 character ( a-z / A-Z )</p>}
                  {test2 && <p>Please enter at least 1 number ( 0-9 )</p>}
                  {test3 && <p>Password length must be at least 8 (not counting special signs)</p>}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Birth Date"
                    sx={{ width: '100%' }}
                    onChange={(newValue: string | null) => setDob(newValue || null)}
                    disableFuture
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
