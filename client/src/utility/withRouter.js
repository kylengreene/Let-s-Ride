import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

export default function withRouter(Component) {
    function Wrapper(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }

    return Wrapper;
  }
