// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app, analytics, auth;

// Initialize Firebase
// export default async function initializeFirebase() {
//   app = await initializeApp(firebaseConfig, "menuOnRoad");
//   analytics = await getAnalytics(app);

//   if (process.env.NODE_ENV !== "production") {
//     // analytics.app.disable();
//   }
//   auth = await getAuth(app);
//   return {
//     app,
//     analytics,
//     auth,
//   };
// }

app = initializeApp(firebaseConfig, "menuOnRoad");
analytics = getAnalytics(app);

if (process.env.NODE_ENV !== "production") {
  // analytics.app.disable();
}
auth = getAuth(app);

console.log("auth", auth);

export { app, analytics, auth };

export default app;
