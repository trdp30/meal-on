/**
 *
 * AuthContext
 *
 */

import React, { useCallback, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

const AuthContext = React.createContext({
  user: {},
  isAuthenticated: false,
  isAuthenticating: true,
});

function AuthProvider(props) {
  const [user, loading, error] = useAuthState(auth);

  const isAuthenticated = useMemo(() => {
    return user?.accessToken && !loading && !error;
  }, [user, loading, error]);

  const logout = useCallback(() => {
    if (user) {
      signOut(auth);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isAuthenticating: loading,
      error,
      logout,
    }),
    [user, loading, error, isAuthenticated, logout],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export { AuthProvider };

export default AuthContext;
