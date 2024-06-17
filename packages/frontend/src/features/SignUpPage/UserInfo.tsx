import { Button, CircularProgress, FormControl, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from '@tanstack/react-router';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { Gender, UserPurpose } from '../../api/me';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface UserFields {
  firstName: string;
  lastName: string;
  gender: Gender | '';
  genderPreference: Gender | 'dontcare' | '';
  purpose: UserPurpose | '';
  email: string;
  password: string;
  birthDate: Date | null;
  location: UserLocation | null;
}

export interface NonNullUserFields {
  firstName: string;
  lastName: string;
  gender: Gender;
  genderPreference: Gender;
  purpose: UserPurpose;
  email: string;
  password: string;
  birthDate: Date;
  location: UserLocation;
}

type SetUserInfoState = (x: UserFields) => void;
type SetFillState = (x: boolean) => void;

interface UserProps {
  setUserInfo: SetUserInfoState;
  setUserFill: SetFillState;
  initialState: UserFields;
}

export default function UserInfo({ setUserInfo, setUserFill, initialState }: UserProps) {
  const [firstName, setFirstName] = useState(initialState.firstName);
  const [lastName, setLastName] = useState(initialState.lastName);
  const [gender, setGender] = useState<Gender | ''>(initialState.gender);
  const [genderPreference, setGenderPreference] = useState<Gender | '' | 'dontcare'>(initialState.genderPreference);
  const [purpose, setPurpose] = useState<UserPurpose | ''>(initialState.purpose);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [birthDate, setBirthDate] = useState<Date | null>(initialState.birthDate);
  const [location, setLocation] = useState<UserLocation | null>(initialState.location);

  const [wasFirstNameChanged, setWasFirstNameChanged] = useState(false);
  const [wasLastNameChanged, setWasLastNameChanged] = useState(false);
  const [wasGenderChanged, setWasGenderChanged] = useState(false);
  const [wasGenderPreferenceChanged, setWasGenderPreferenceChanged] = useState(false);
  const [wasPurposeChanged, setWasPurposeChanged] = useState(false);
  const [wasEmailChanged, setWasEmailChanged] = useState(false);
  const [wasPasswordChanged, setWasPasswordChanged] = useState(false);

  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [gettingLocation, setGettingLocation] = useState(false);

  const onEmailChange = (val: string) => {
    // don't remember from where i copied this code, but this works.
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    setEmail(val);
    setEmailHasError(!re.test(val));
  };

  const onPasswordChange = (val: string) => {
    // At least one English letter
    const t1 = /[A-Za-z]/;
    // At least 1 digit
    const t2 = /\d/;
    // At least 8 characters
    const t3 = /^.{8,}/;

    const newPasswordErrors: string[] = [];
    if (!t1.test(val)) {
      newPasswordErrors.push('Please enter at least 1 English letter');
    }

    if (!t2.test(val)) {
      newPasswordErrors.push('Please enter at least 1 digit');
    }

    if (!t3.test(val)) {
      newPasswordErrors.push('Please enter at least 8 characters');
    }

    setPasswordErrors(newPasswordErrors);
    setPassword(val);
  };

  useEffect(() => {
    if (firstName && lastName && gender && genderPreference && purpose && email && password && birthDate && location) {
      setUserFill(true);
      setUserInfo({
        firstName,
        lastName,
        gender,
        genderPreference,
        purpose,
        email,
        password,
        birthDate: new Date(birthDate),
        location,
      });
    } else {
      setUserFill(false);
    }
  }, [
    firstName,
    lastName,
    gender,
    genderPreference,
    purpose,
    email,
    password,
    birthDate,
    location,
    setUserFill,
    setUserInfo,
  ]);

  const requestLocation = async () => {
    if (!navigator.geolocation) return;

    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

      if (permissionStatus.state === 'granted') {
        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setGettingLocation(false);
            setLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          },
          () => {
            setGettingLocation(false);
            window.alert('There was an error getting your location');
          },
        );
      } else if (permissionStatus.state === 'prompt') {
        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGettingLocation(false);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            setGettingLocation(false);
            window.alert('You must grant location access in order to create an account');
          },
        );
      } else {
        // Permission denied or not available
        window.alert('There was an error getting your location, please refresh the page to try again');
      }
    } catch (error) {
      window.alert('There was an error getting your location, please refresh the page to try again');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate mt={3} textAlign="start">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setWasFirstNameChanged(true);
                }}
                error={wasFirstNameChanged && firstName === ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setWasLastNameChanged(true);
                }}
                error={wasLastNameChanged && lastName === ''}
              />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={gender}
                    label="Gender"
                    required
                    onChange={(e) => {
                      setGender(e.target.value as Gender);
                      setWasGenderChanged(true);
                    }}
                    error={wasGenderChanged && gender === ''}
                  >
                    <MenuItem value={Gender.Man}>Man</MenuItem>
                    <MenuItem value={Gender.Woman}>Woman</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={genderPreference}
                    label="Interest"
                    required
                    onChange={(e) => {
                      setGenderPreference(e.target.value as Gender | 'dontcare');
                      setWasGenderPreferenceChanged(true);
                    }}
                    error={wasGenderPreferenceChanged && genderPreference.length === 0}
                  >
                    <MenuItem value={Gender.Man}>Man</MenuItem>
                    <MenuItem value={Gender.Woman}>Woman</MenuItem>
                    <MenuItem value={'dontcare'}>{"Don't Care"}</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={purpose}
                    label="Purpose"
                    required
                    onChange={(e) => {
                      setPurpose(e.target.value as UserPurpose);
                      setWasPurposeChanged(true);
                    }}
                    error={wasPurposeChanged && purpose === ''}
                  >
                    <MenuItem value={UserPurpose.Romantic}>Romantic</MenuItem>
                    <MenuItem value={UserPurpose.Platonic}>Platonic</MenuItem>
                    <MenuItem value={UserPurpose.All}>All</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={email}
                onChange={(e) => {
                  onEmailChange(e.target.value);
                  setWasEmailChanged(true);
                }}
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                error={wasEmailChanged && (email === '' || emailHasError)}
              />
            </Grid>
            <Grid item xs={12}>
              {
                <>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      onPasswordChange(e.target.value);
                      setWasPasswordChanged(true);
                    }}
                    error={wasPasswordChanged && (password === '' || passwordErrors.length !== 0)}
                  />

                  {passwordErrors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </>
              }
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  sx={{ width: '100%' }}
                  value={birthDate && dayjs(birthDate)}
                  onChange={(newValue: Dayjs | null) => setBirthDate(newValue?.toDate() || null)}
                  maxDate={dayjs().subtract(18, 'years')}
                />
              </LocalizationProvider>
            </Grid>
            {location ? (
              <Grid item xs={12}>
                <Button variant="contained" sx={{ textTransform: 'none' }} disabled>
                  Location access granted ✅
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                  disabled={gettingLocation}
                  onClick={requestLocation}
                >
                  {gettingLocation ? <CircularProgress size="1.5rem" /> : 'Grant location access'}
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item mt={2}>
            <Link to="/login">{'Already have an account? Log in'}</Link>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
