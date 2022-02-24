import * as React from 'react';
import { withRouter, useHistory } from "react-router-dom"
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


function RideForm() {
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

  const theme = createTheme();

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let ride = {
      "rideLocation": data.get("location"),
      "rideDateTime": data.get("date"),
      "rideDescription": data.get("description"),
      "rideLimit": data.get("limit")
    };
    console.log(ride);
    //createRide(ride);

    history.push("/rideform");
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
                  name="addressLine1"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  name="addressLine2"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="datetime-local"
                  name="date"
                  label="Date/Time"
                  id="date"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  id="description"
                  label="Ride Description"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  name="limit"
                  label="Ride limit"
                  id="limit"
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