import * as React from 'react';
import { useEffect, useState, useContext, useCallback } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { findRideById, saveRideData } from "../api/ride-api";
import AuthContext from "../context/AuthContext";
import states from 'states-us';
import CurrencyFormat from 'react-currency-format';

const NumberFormatCustom = React.forwardRef(function CurrencyFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <CurrencyFormat
      {...other}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={0}
      allowNegative={(false)}
    />
  );
});

const emptyRide = {
  rideAddress1: "",
  rideAddress2: "",
  rideCity: "",
  ridePostalCode: "",
  rideState: "",
  rideDateTime: "",
  rideDescription: "",
  rideLimit: ""
};

function RideForm() {

  const [ ride, setRide ] = useState(emptyRide);
  const { rideId } = useParams();
  const [ errors, setErrors ] = useState(emptyRide);
  const theme = createTheme();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const validate = () => {
    let temp = {}

    temp.rideAddress1 = (!(ride.rideAddress1) ? "This field is required." :
    ride.rideAddress1.length > 250 ? "Address line 1 cannot be greater than 250 characters." : ""); 

    temp.rideAddress2 = ride.rideAddress2.length > 250 ? "Address line 2 cannot be greater than 250 characters." : ""

    temp.rideCity = (!(ride.rideCity) ? "This field is required." :
    ride.rideCity.length > 50 ? "City cannot be greater than 50 characters." : "");

    temp.ridePostalCode = (!(ride.ridePostalCode) ? "This field is required." : 
    isNaN(Number(ride.ridePostalCode)) ? "Invalid field entry." :
    ride.ridePostalCode.length === 5 ? "" : "Postal code must be 5 digits.");

    temp.rideState = !(ride.rideState) ? "This field is required." : ""

    temp.rideDateTime = !(ride.rideDateTime) ? "This field is required." : ""

    temp.rideDescription = (!(ride.rideDescription) ? "This field is required." :
    ride.rideDescription.length > 250 ? "Ride description cannot be greater than 250 characters." : "");

    temp.rideLimit = isNaN(Number(ride.rideLimit)) ? "Field entry must be a number." : ""

    setErrors({...temp})
    console.log({...temp});
    return Object.values(temp).every(x => x == "")
  }

  const handleErr = useCallback(err => {
    if (err === 403) {
      authContext.logout();
      err = "Unauthorized";
    }
    history.push("/error", err.toString())
  }, [authContext, history]);

  useEffect(() => {
      if (rideId) {
        findRideById(rideId)
              .then(result => setRide(result))
              .catch(handleErr);
      }
  }, [rideId, history, handleErr]);

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          Let's Ride
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setRide({
      ...ride, 
      [name]: value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validate()) {
      console.log(ride);
      // saveRideData(ride)
      //   .then(() => history.push("/"))
      //   .catch(handleErr);
    } 
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: '#593C8F' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Ride 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField

                  required
                  fullWidth
                  id="addressLine1"
                  label="Address Line 1"
                  name="rideAddress1"
                  value={ride.rideAddress1}
                  onChange={handleChange}
                  error={Boolean(errors?.rideAddress1)}
                  helperText={(errors?.rideAddress1)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  name="rideAddress2"
                  value={ride.rideAddress2}
                  onChange={handleChange}
                  error={Boolean(errors?.rideAddress2)}
                  helperText={(errors?.rideAddress2)}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="rideCity"
                  value={ride.rideCity}
                  onChange={handleChange}
                  error={Boolean(errors?.rideCity)}
                  helperText={(errors?.rideCity)}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  required
                  fullWidth
                  id="postal-code"
                  label="Postal Code"
                  name="ridePostalCode"
                  value={ride.ridePostalCode}
                  onChange={handleChange}
                  error={Boolean(errors?.ridePostalCode)}
                  helperText={(errors?.ridePostalCode)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  required
                  select
                  fullWidth
                  id="state"
                  label="State"
                  name="rideState"
                  value={ride.rideState}
                  onChange={handleChange}
                  error={Boolean(errors?.rideState)}
                  helperText={(errors?.rideState)}

                  >

                  {states.filter((x) => x.contiguous).map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                  {option.name}

                </MenuItem>
          ))}
                  </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="datetime-local"
                  name="rideDateTime"
                  label="Date/Time"
                  id="date"
                  InputLabelProps={{ shrink: true }}
                  value={ride.rideDateTime}
                  onChange={handleChange}
                  error={Boolean(errors?.rideDateTime)}
                  helperText={(errors?.rideDateTime)}
                />
              </Grid>
              <Grid item xs={12}> 

              </Grid>             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rideDescription"
                  id="description"
                  label="Ride Description"
                  multiline
                  rows={4}
                  value={ride.rideDescription}
                  onChange={handleChange}
                  error={Boolean(errors?.rideDescription)}
                  helperText={(errors?.rideDescription)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="rideLimit"
                  label="Ride limit"
                  id="limit"
                  value={ride.rideLimit}
                  onChange={handleChange}
                  error={Boolean(errors?.rideLimit)}
                  helperText={(errors?.rideLimit)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                id="createBtn"
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                >
                Create Ride
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                href="http://localhost:3000/"
                id="cancelBtn"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Cancel
                </Button>
            </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default withRouter(RideForm);