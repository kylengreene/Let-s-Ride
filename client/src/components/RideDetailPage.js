import * as React from 'react';
import { useEffect, useState, useContext, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withRouter from '../utility/withRouter';
import AuthContext from '../context/AuthContext';
import {findRideById} from "../api/ride-api";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function RideDetailPage (props) {

    const router = {...props};
    const theme = createTheme();

    const {id} = useParams();

    const authContext = React.useContext(AuthContext);

    const [ride, setRide] = React.useState(null);

    const handleErr = React.useCallback(err => {
        if (err === 403) {
          authContext.logout();
          err = "Unauthorized";
        }
      }, [authContext]);

      React.useEffect(() => {
        const fetchRide = async () => {
          const response = await findRideById(id);
          setRide(response);
        }
        fetchRide();
      }, [id, handleErr]);


      if (!ride) {
        return <h5>loading</h5>
      }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5" sx={{ border:1, p:2}}>
            Ride Details
        </Typography>
        {console.log(ride)}
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ mt:16 }}>
                <Grid item xs={4}>
                    Description:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideDescription} </Item>
                </Grid>
                <Grid item xs={4}>
                    Address Line 1:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideStreet.short_name} </Item>
                </Grid>
                <Grid item xs={4}>
                    City:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideCity.short_name} </Item>
                </Grid>
                <Grid item xs={4}>
                    State:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideState.short_name} </Item>
                </Grid>
                <Grid item xs={4}>
                    Date:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideDatetime} </Item>
                </Grid>
                <Grid item xs={4}>
                    Rider Limit:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideLimit ? ride.rideLimit : 'No Limit'} </Item>
                </Grid>
                <Grid item xs={4}>
                    Club Sponsoring:
                </Grid>
                <Grid item xs={6}>
                    <Item> {ride.clubName} </Item>
                </Grid>
                <Grid item xs={2}>
                    <Button
                    onClick={() => router.router.navigate(`/clubs/${ride.clubId}`)}
                    id="clubPageBtn"
                    fullWidth
                    variant="contained"
                    >
                        Visit
                    </Button>
                </Grid>
            </Grid>

        </Box>
        </Box>
        </Container>
        </ThemeProvider>
    );
}

export default withRouter(RideDetailPage);
