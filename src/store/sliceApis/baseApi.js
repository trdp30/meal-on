import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "firebase/auth";
import { auth } from "utils/firebase";

export function prepareHeaders(headers) {
  const session = auth?.currentUser;
  if (session?.accessToken) {
    headers.set("authorization", "Bearer " + session.accessToken);
  }
  return headers;
}

export const rootAPiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_ENDPOINT}`,
  prepareHeaders,
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  let response;
  if (extraOptions && extraOptions.baseQuery) {
    response = await extraOptions.baseQuery(args, api, extraOptions);
  } else {
    response = await rootAPiBaseQuery(args, api, extraOptions);
  }

  if (response && response.error && response.error.status === 401) {
    signOut(auth);
  }
  return response;
};
