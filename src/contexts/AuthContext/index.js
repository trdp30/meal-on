/**
 *
 * AuthContext
 *
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { analytics, auth } from "utils/firebase";
import { signOut } from "firebase/auth";
import { setUserId, setUserProperties } from "firebase/analytics";

const AuthContext = React.createContext({
  user: {},
  isAuthenticated: false,
  isAuthenticating: true,
});

function AuthProvider(props) {
  const [user, loading, error] = useAuthState(auth);
  const [currentUserRoles, setCurrentUserRoles] = useState(null);
  const [isAuthenticating, toggleAuthenticating] = useState(true);

  const isAuthenticated = useMemo(() => {
    return user?.accessToken && !loading && !error;
  }, [user, loading, error]);

  const logout = useCallback(async () => {
    if (user) {
      setCurrentUserRoles(null);
      await signOut(auth);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isAuthenticating,
      error,
      logout,
      currentUserRoles,
    }),
    [user, error, isAuthenticated, logout, currentUserRoles, isAuthenticating],
  );

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        user.getIdTokenResult().then((result) => {
          setCurrentUserRoles(result?.claims?.roles || []);
          toggleAuthenticating(false);
        });
      } else {
        toggleAuthenticating(false);
      }
    }
  }, [isAuthenticated, user, loading]);

  useEffect(() => {
    if (isAuthenticated) {
      setUserId(analytics, user?.uid);
      setUserProperties(analytics, {
        isAuthenticated: true,
        email: user.email,
        uid: user?.uid,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export { AuthProvider };

export default AuthContext;
