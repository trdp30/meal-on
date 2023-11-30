import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseApi";

const version = "v1";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `${version}/user/${id}`,
      providesTags: (result) => [{ type: "User", id: result?._id }],
    }),
    getAllUser: builder.query({
      query: () => `${version}/user`,
      providesTags: (result) => {
        if (result && result.length) {
          return [
            ...result.map(({ _id: id }) => ({ type: "User", id })),
            { type: "User", id: "LIST" },
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    createUser: builder.mutation({
      query: (payload) => {
        return {
          url: `${version}/user/create`,
          method: "POST",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: () => [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (params) => {
        return {
          url: `${version}/user/${params.id}`,
          method: "PUT",
          body: {
            ...params.body,
          },
        };
      },
      invalidatesTags: (result) => [{ type: "User", id: result?._id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${version}/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [{ type: "User", id: result?._id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserByIdQuery,
  useGetAllUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
