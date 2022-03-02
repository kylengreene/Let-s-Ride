import { render } from "@testing-library/react";
import withRouter from '../utility/withRouter';
import { Grid, Hidden } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Upcoming } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";


function HomePage (){
    return(
        <div>
            <h1>Let's Ride</h1>
        </div>
        )
}

export default withRouter(HomePage);
