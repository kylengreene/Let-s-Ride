import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom"

function ClubAdminPage (){
    return(
    <div>
        <h1>AdminPage Page</h1>
    </div>
    )
}

export default withRouter(ClubAdminPage);