import { render } from "@testing-library/react";
import withRouter from '../utility/withRouter';

function ClubAdminPage (){
    return(
    <div>
        <h1>AdminPage Page</h1>
    </div>
    )
}

export default withRouter(ClubAdminPage);
