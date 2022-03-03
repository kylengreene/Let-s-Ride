import { useEffect, useState, useContext, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import * as React from 'react';
import { render } from "@testing-library/react";
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AuthContext from "../context/AuthContext";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const emptyClub = {
    clubName: "Test",
    clubDescription: "Tester",
    clubPostalCode: "12345",
    clubMembershipFee: "0"
};

const emptyRide = {
    rideAddress1: "Test 123",
    rideAddress2: "",
    rideCity: "Austin",
    ridePostalCode: "12345",
    rideState: "Texas",
    rideDateTime: "10AM",
    rideDescription: "empty",
    rideLimit: "50"
};



function ClubAdminPage (){
    const [checked, setChecked] = React.useState([0]);
    const [ club, setClub ] = useState(emptyClub);
    const { clubId } = useParams();
    const [ errors, setErrors ] = useState(emptyClub);
    const authContext = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Success!");
  };

  const riderColumns = [
    { field: 'riderFirstName', headerName: 'First name', width: 200 },
    { field: 'riderLastName', headerName: 'Last name', width: 200 },
    { field: 'riderPostal', headerName: 'Postal Code', width: 200 },
  ];
  
  const rideColumns = [
    // { field: 'rideAddress1', headerName: 'Address Line 1', width: 130 },
    // { field: 'rideAddress2', headerName: 'Address Line 2', width: 130 },
    // { field: 'rideCity', headerName: 'City', width: 160 },
    // { field: 'ridePostalCode', headerName: 'Postal Code', width: 100 },
    // { field: 'rideState', headerName: 'State', width: 130 },
    { field: 'Address', headerName: 'Location', width: 400},
    { field: 'rideDateTime', headerName: 'Start Time', width: 150 },
    { field: 'rideDescription', headerName: 'Description', width: 500 },
    { field: 'rideLimit', headerName: 'Rider Limit', width: 120 },
  ];
  
  const riderRows = [
    { id:1, riderFirstName: 'Welp', riderLastName: 'Snow', riderPostal: 12345 },
    { id:2, riderFirstName: 'Welp', riderLastName: 'Snow', riderPostal: 12345 },
  ];
  
  const rideRows = [
    {
        id:1,
        Address: "East Treatpoint 123, Austin, Texas, 56789",
        rideDateTime: "10AM",
        rideDescription: "qwtyuiopqwertyuiopqwertyuiopasdfghjklzxcvbnm",
        rideLimit: "50"
    },
    {
        id:2,
        Address: "West Primrock 12345, Austin, Texas, 56789",
        rideDateTime: "10AM",
        rideDescription: "short and to the point",
        rideLimit: "50"
    },
  ];
    return (
    //<Container component="main" maxWidth="xl">
      <div style={{ height: 400, width: '100%' }}>
        <Box component="form" noValidate onSubmit={handleSubmit} width="100%" height="100%" direction="row" justify="flex-start" alignItems="flex-start">
        <Grid 
          container
          width="100%"
          height="200%"
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
            <Grid
                item
                width="35%"
                height="100%"
            >
                <DataGrid
                    rows={riderRows}
                    columns={riderColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
                <Grid item xs={6}>
                <Button
                id="createBtn"
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                >
                  Approve
                </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                    href="http://localhost:3000/"
                    id="cancelBtn"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Decline
                    </Button>
                </Grid>
            </Grid>
            <Grid
                item
                width="65%"
                height="100%"
            >
                <DataGrid
                    rows={rideRows}
                    columns={rideColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
                <Grid item xs={6}>
                <Button
                id="createBtn2"
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                >
                  Approve
                </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                    href="http://localhost:3000/"
                    id="cancelBtn2"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Decline
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        </Box>
      </div>
    //</Container>
    );
  }

export default (ClubAdminPage);
