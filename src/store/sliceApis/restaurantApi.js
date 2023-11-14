import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseApi";

const version = "v1";

// Define a service using a base URL and expected endpoints
export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    getRestaurantById: builder.query({
      query: (id) => `${version}/restaurant/${id}`,
      providesTags: (result) => [{ type: "Restaurant", id: result?._id }],
    }),
    getAllRestaurant: builder.query({
      query: () => `${version}/restaurant`,
      providesTags: (result) => {
        if (result && result.length) {
          return [
            ...result.map(({ _id: id }) => ({ type: "Restaurant", id })),
            { type: "Restaurant", id: "LIST" },
          ];
        } else {
          return [{ type: "Restaurant", id: "LIST" }];
        }
      },
    }),
    createRestaurant: builder.mutation({
      query: (payload) => {
        return {
          url: `${version}/restaurant/create`,
          method: "POST",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: () => [{ type: "Restaurant", id: "LIST" }],
    }),
    updateRestaurant: builder.mutation({
      query: (params) => {
        return {
          url: `${version}/restaurant/${params.id}`,
          method: "PUT",
          body: {
            ...params.body,
          },
        };
      },
      invalidatesTags: (result) => [{ type: "Restaurant", id: result?._id }],
    }),
    deleteRestaurant: builder.mutation({
      query: (params) => ({
        url: `${version}/restaurant/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [{ type: "Restaurant", id: result?._id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRestaurantByIdQuery,
  useGetAllRestaurantQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
