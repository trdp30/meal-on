/**
 *
 * Logout
 *
 */

import Loader from "components/Loader";
import AuthContext from "contexts/AuthContext";
import { useContext, useEffect } from "react";

export function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <Loader />;
}

export default Logout;
