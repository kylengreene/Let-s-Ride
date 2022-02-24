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
import { findById, saveClubData } from "../api/club";
import AuthContext from "../context/AuthContext";

const clubTest = {
  clubName: "",
  clubDescription: "",
  clubPostalCode: "",
  clubMembershipFee: ""
};

function ClubForm() {

  const [ club, setClub ] = useState(clubTest);
  const { clubId } = useParams();
  const theme = createTheme();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const handleErr = useCallback(err => {
    if (err === 403) {
      authContext.logout();
      err = "Unauthorized";
    }
    history.push("/error", err.toString())
  }, [authContext, history]);

  useEffect(() => {
      if (clubId) {
          findById(clubId)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let clubData = {
      "clubName": data.get("clubName"),
      "clubDescription": data.get("description"),
      "clubPostalCode": data.get("postal-code"),
      "clubMembershipFee": data.get("membership-fee")
    };
    console.log(clubData);
    saveClubData(clubData)
        .then(() => history.push("/"))
        .catch(handleErr);
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="clubName"
                  label="Club Name"
                  name="clubName"
                  defaultValue={club.clubName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  id="description"
                  label="Description"
                  defaultValue={club.clubDescription}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  name="postal-code"
                  label="Postal Code"
                  id="clubPostal"
                  autoComplete="postal-code"
                  defaultValue={club.clubPostalCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  name="membership-fee"
                  label="Membership Fee"
                  id="membershipFee"
                  InputProps={{
                    startAdornment: "$"
                  }}
                  defaultValue={club.clubMembershipFee}
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