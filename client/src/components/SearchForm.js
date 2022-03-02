import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { cardClasses } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import withRouter from '../utility/withRouter';
import { EventRepeat } from "@mui/icons-material";
import ClubCard from "./ClubCard"
import { createSearchParams } from "react-router-dom";
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import states from 'states-us';

const MySwal = withReactContent(Swal);

function SearchForm(props) {
  const router = {...props}

  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");



  const handleSubmit = event => {
    event.preventDefault();
    router.router.navigate("/clubs", {
      state: {
        street: street,
        state: state,
        postal: postal
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">

    <Box sx={
      {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

      <Typography component="h1" variant="h5">
            {props.parameter}
      </Typography>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="outlined"
            label="Street"
            name="street"
            helperText="Street i.e., '123 Apple St.'"
            value={street}
            onChange={event => setStreet(event.target.value)}
          />
        </div>
        <div>
          <TextField
          required
            id="outlined-required"
            label="Postal Code"
            name="street"
            value={postal}
            onChange={event => setPostal(event.target.value)}
            helperText="Postal/Zip (70737, 12344, etc)"
          />
        </div>
        <div>
          <FormControl>
            <FormLabel id="filter-menu">State:</FormLabel>
            <TextField
              id="outlined-select-field"
              select
              label="Select"
              name="state"
              value={state}
              onChange={event => setState(event.target.value)}
              helperText="State"
            >
              {states.map((state) => (
                <MenuItem key={state.abbreviation} value={state.name} >
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>
        <div>
          <Button variant="outlined" type="submit">
            {" "}
            Search{" "}
          </Button>
          {/* <Button variant="outlined" onClick={() => handleClear()}>
            {" "}
            Clear Search{" "}
          </Button> */}
        </div>
      </Box>
      </Box>
    </Container>
  );
}
export default withRouter(SearchForm);
