import React from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../utils/firebase";

const GoogleSignInButton = () => {
  // console.log("googleAuthProvider", googleAuthProvider);
  const handleSignIn = async () => {
    try {
      debugger;
      console.log(auth, googleAuthProvider);
      const result = await signInWithPopup(
        auth,
        googleAuthProvider,
        browserPopupRedirectResolver,
      );
      debugger;

      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // // IdP data available using getAdditionalUserInfo(result)
      // // ...
    } catch (error) {
      debugger;
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md p-2 cursor-pointer transition duration-300 hover:shadow-lg"
    >
      <img
        src="/assets/images/Google__G__Logo.svg"
        alt="Google Logo"
        className="w-8 h-8 mr-2"
      />
      <span className="font-medium text-xl">Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
