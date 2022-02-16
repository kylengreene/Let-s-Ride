import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom"

function HomePage (){
    return(
    <div>
        <h1>Let's Ride</h1>
    </div>
    )
}

export default withRouter(HomePage);