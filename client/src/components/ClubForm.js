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
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { findClubById, saveClubData } from "../api/club";
import AuthContext from "../context/AuthContext";
import CurrencyFormat from 'react-currency-format';

const CurrencyFormatCustom = React.forwardRef(function CurrencyFormatCustom(props, ref) {
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
      thousandSeparator
      prefix="$"
      decimalScale={2}
      
      allowNegative={(false)}
    />
  );
});

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

CurrencyFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const emptyClub = {
  clubName: "",
  clubDescription: "",
  clubPostalCode: "",
  clubMembershipFee: ""
};

function ClubForm() {

  const [ club, setClub ] = useState(emptyClub);
  const { clubId } = useParams();
  const [ errors, setErrors ] = useState(emptyClub);
  const theme = createTheme();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const validate = () => {
    let temp = {}

    temp.clubName = (!(club.clubName) ? "This field is required." :
    club.clubName.length > 50 ? "Club name cannot be greater than 50 characters." : ""); 

    temp.clubDescription = (!(club.clubDescription) ? "This field is required." :
    club.clubDescription.length > 250 ? "Club description cannot be greater than 250 characters." : "");

    temp.clubPostalCode = (!(club.clubPostalCode) ? "This field is required." : 
    isNaN(Number(club.clubPostalCode)) ? "Postal code must be 5 digits." :
    club.clubPostalCode.length === 5 ? "" : "Invalid postal code length.");

    temp.clubMembershipFee = isNaN(Number(club.clubMembershipFee)) ? "Input not a number." : ""

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
      if (clubId) {
        findClubById(clubId)
              .then(result => setClub(result))
              .catch(handleErr);
      }
  }, [clubId, history, handleErr]);

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
    setClub({
      ...club, 
      [name]: value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validate()) {
      console.log(club);
      // saveClubData(club)
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
            {club.clubId ? "Update" : "Create"} Club 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt:3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Club Name"
                  name="clubName"
                  value={club.clubName}
                  onChange={handleChange}
                  error={Boolean(errors?.clubName)}
                  helperText={(errors?.clubName)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="clubDescription"
                  id="description"
                  label="Description"
                  value={club.clubDescription}
                  onChange={handleChange}
                  error={Boolean(errors?.clubDescription)}
                  helperText={(errors?.clubDescription)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="clubPostalCode"
                  label="Postal Code"
                  id="clubPostal"
                  autoComplete="postal-code"
                  value={club.clubPostalCode}
                  onChange={handleChange}
                  error={Boolean(errors?.clubPostalCode)}
                  helperText={(errors?.clubPostalCode)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="clubMembershipFee"
                  label="Membership Fee"
                  id="membershipFee"
                  value={club.clubMembershipFee}
                  onChange={handleChange}
                  error={Boolean(errors?.clubMembershipFee)}
                  helperText={(errors?.clubMembershipFee)}
                  InputProps={{
                    inputComponent: CurrencyFormatCustom,
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
                  {club.clubId ? "Update" : "Create"}
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
export default withRouter(ClubForm);