import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import withRouter from "../utility/withRouter"
import * as React from 'react';
import { render } from "@testing-library/react";
import { DataGrid, selectedGridRowsCountSelector } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AuthContext from "../context/AuthContext";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { findPendingRides, findPendingMemberships, saveAllRides, saveAllMembers, declineSelectedRiders, declineSelectedRides } from "../api/admin-api";

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
    const [riderRows, setRiderRows] = useState(null);
    const [rideRows, setRideRows] = useState(null);
    const [selectedRides, setSelectedRides] = useState([]);
    const [selectedRiders, setSelectedRiders] = useState([]);
    const authContext = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Success!");
  };

  const riderColumns = [
    { field: 'riderFullName', headerName: 'Name', width: 200 },,
    { field: 'riderPostal', headerName: 'Postal Code', width: 200 },
  ];

  const rideColumns = [
    { field: 'address', headerName: 'Location', width: 350},
    { field: 'rideDatetime', headerName: 'Start Time', width: 175 },
    { field: 'rideDescription', headerName: 'Description', width: 500 },
    { field: 'rideLimit', headerName: 'Rider Limit', width: 120 },
  ];

  useEffect(() => {
    const fetchRiders = async () => {
      const response = await findPendingMemberships(clubId);
      setRiderRows(response);
    }
    const fetchRides = async () => {
      const response = await findPendingRides(clubId);
      setRideRows(response);
      console.log(response)
    }
    const fetchRidesAndRiders = async () => {
      fetchRides();
      fetchRiders();
    }
    fetchRidesAndRiders();
  }, []);

  if (!rideRows || !riderRows) {
    return <h5>loading</h5>
  }

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
                    getRowId={row => row.roleId}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={row => setSelectedRiders(row)}
                />
                <Grid item xs={6}>
                <Button
                id="createBtn"
                fullWidth
                type="submit"
                onClick={() => {
                  saveAllMembers(selectedRiders);
                  setRiderRows(riderRows.filter(r => !selectedRiders.includes(r.roleId)));
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                >
                  Approve
                </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                    id="cancelBtn"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      declineSelectedRiders(selectedRiders);
                      setRiderRows(riderRows.filter(r => !selectedRiders.includes(r.roleId)));
                    }}
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
                    getRowId={row => row.rideId}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    onSelectionModelChange={row => setSelectedRides(row)}
                    checkboxSelection
                />
                <Grid item xs={6}>
                <Button
                id="createBtn2"
                fullWidth
                type="submit"
                variant="contained"
                onClick={() => {
                  saveAllRides(selectedRides);
                  setRideRows(rideRows.filter(r => !selectedRides.includes(r.rideId)));
                }}
                sx={{ mt: 3, mb: 2}}
                >
                  Approve
                </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                    id="cancelBtn2"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      declineSelectedRides(selectedRides);
                      setRideRows(rideRows.filter(r => !selectedRides.includes(r.rideId)));
                    }}
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

export default withRouter(ClubAdminPage);
