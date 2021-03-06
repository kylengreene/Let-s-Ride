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
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          //style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

// GridCellExpand.propTypes = {
//   value: PropTypes.string.isRequired,
//   width: PropTypes.number.isRequired,
// };

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};

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

const riderColumns = [
  { field: 'riderFirstName', headerName: 'First name', flex: 1, renderCell: renderCellExpand},
  { field: 'riderLastName', headerName: 'Last name', flex: 1, renderCell: renderCellExpand },
  { field: 'riderPostal', headerName: 'Postal Code', flex: 0.5, renderCell: renderCellExpand },
];

const rideColumns = [
  // { field: 'rideAddress1', headerName: 'Address Line 1', width: 130 },
  // { field: 'rideAddress2', headerName: 'Address Line 2', width: 130 },
  // { field: 'rideCity', headerName: 'City', width: 160 },
  // { field: 'ridePostalCode', headerName: 'Postal Code', width: 100 },
  // { field: 'rideState', headerName: 'State', width: 130 },
  { field: 'Address', headerName: 'Location', flex: 1, renderCell: renderCellExpand},
  { field: 'rideDateTime', headerName: 'Start Time', flex: 1, renderCell: renderCellExpand },
  { field: 'rideDescription', headerName: 'Description', flex: 1, renderCell: renderCellExpand },
  { field: 'rideLimit', headerName: 'Rider Limit', flex: 0.5,renderCell: renderCellExpand },
];

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
    const [select, setSelection] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Approved");
    console.log(select);

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
                id="approveBtn"
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
                id="approveBtn2"
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
