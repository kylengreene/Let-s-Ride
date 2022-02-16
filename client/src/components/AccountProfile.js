import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom"

function AccountProfile (){
    return(
    <div>
        <h1>Account Page</h1>
    </div>
    )
}

export default withRouter(AccountProfile);