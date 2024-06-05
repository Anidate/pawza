import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

import { type PetFields } from '.';

type SetFillState = (x: boolean) => boolean;
type SetPetDetState = (x: PetFields) => PetFields;
interface PetProps {
  changeState: SetFillState;
  fillState: boolean;
  petDetails: PetFields;
  changePetState: SetPetDetState;
  /* sizeField: string;
  vacField: string;
  petNameField: string;
  breedField: string; */
}

export default function PetDetails({ changeState, fillState, petDetails, changePetState }: PetProps) {
  const [size, setSize] = React.useState('');
  const [vaccinated, setVac] = React.useState('');
  const [petName, setPetName] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [dob, setDob] = React.useState<string | null>(null);
  const pet1: PetFields = petDetails;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'petName':
        setPetName(event.target.value);

        break;
      case 'Breed':
        setBreed(event.target.value);

        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (size !== '' && vaccinated !== '' && petName !== '' && breed !== '' && dob !== null) {
      changeState(true);
      pet1.petNameField = petName;
      pet1.breedField = breed;
      pet1.sizeField = size;
      pet1.vacField = vaccinated;
      pet1.DOB = new Date(dob);
      changePetState(pet1);
    } else changeState(false);
  }, [petName, breed, vaccinated, size, dob]);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Copyright © Pawza {new Date().getFullYear()}.
      </Typography>
    );
  }
  const defaultTheme = createTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const vaccinatedChange = (event: SelectChangeEvent) => {
    setVac(event.target.value as string);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="Pet Name"
                required
                fullWidth
                id="petName"
                label="Pet Name"
                autoFocus
                value={petName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="Breed"
                value={breed}
                label="Breed"
                name="breed"
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel>Vaccinated?</InputLabel>
                  <Select
                    labelId="Vaccinated"
                    id="demo-simple-select"
                    value={vaccinated}
                    label="Size"
                    required
                    onChange={vaccinatedChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Size"
                    value={size}
                    label="Size"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>S</MenuItem>
                    <MenuItem value={20}>M</MenuItem>
                    <MenuItem value={30}>L</MenuItem>
                    <MenuItem value={40}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Birth Date"
                    sx={{ width: '100%' }}
                    onChange={(newValue: string | null) => {
                      setDob(newValue);
                    }}
                    disableFuture
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
