import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import Loader from "../../components/Loader";

function AuthenticatedRoute(props) {
  const { isAuthenticated, isAuthenticating } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      let params = new URLSearchParams();
      params.set("from", new URL(window.location.href).pathname);
      navigate({ pathname: "/login", search: params.toString() });
    }
  }, [isAuthenticating, isAuthenticated, navigate]);

  if (isAuthenticating) {
    return <Loader />;
  }

  return <>{props.children}</>;
}

AuthenticatedRoute.propTypes = {
  path: PropTypes.string,
  location: PropTypes.object,
};

export default AuthenticatedRoute;
