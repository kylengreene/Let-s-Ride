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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ride = {
    rideAddress1: "travis street",
    rideAddress2: "apt 434",
    rideCity: "austin",
    ridePostalCode: "12345",
    rideState: "texas",
    rideDateTime: "12AM",
    rideDescription: "fun ride in the sun",
    rideLimit: "",
    rideClub: "Sunrides",
    rideClubId: "1"
};

function RideDetailPage () {
    const theme = createTheme();

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
            Ride Detail Page
        </Typography>
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
                    <Item> {ride.rideAddress1} </Item>
                </Grid>
                <Grid item xs={4}>
                    Address Line 2:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideAddress2 ? ride.rideAddress2 : "NA"} </Item>
                </Grid>
                <Grid item xs={4}>
                    City:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideCity} </Item>
                </Grid>
                <Grid item xs={4}>
                    State:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideState} </Item>
                </Grid>
                <Grid item xs={4}>
                    Postal Code:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.ridePostalCode} </Item>
                </Grid>
                <Grid item xs={4}>
                    Date:
                </Grid>
                <Grid item xs={8}>
                    <Item> {ride.rideDateTime} </Item>
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
                    <Item> {ride.rideClub} </Item>
                </Grid>
                <Grid item xs={2}>
                    <Button
                    href="http://localhost:3000/club/{rideClubId}"
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
