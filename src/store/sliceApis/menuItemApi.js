import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseApi";

const version = "v1";

// Define a service using a base URL and expected endpoints
export const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["MenuItem"],
  endpoints: (builder) => ({
    getMenuItemById: builder.query({
      query: (id) => `${version}/menu-item/${id}`,
      providesTags: (result) => [{ type: "MenuItem", id: result?._id }],
    }),
    getAllMenuItem: builder.query({
      query: (restaurant_id) => `${version}/menu-item/${restaurant_id}`,
      providesTags: (result) => {
        if (result && result.length) {
          return [
            ...result.map(({ _id: id }) => ({ type: "MenuItem", id })),
            { type: "MenuItem", id: "LIST" },
          ];
        } else {
          return [{ type: "MenuItem", id: "LIST" }];
        }
      },
    }),
    createMenuItem: builder.mutation({
      query: (payload) => {
        return {
          url: `${version}/menu-item/create`,
          method: "POST",
          body: {
            ...payload,
          },
        };
      },
      invalidatesTags: () => [{ type: "MenuItem", id: "LIST" }],
    }),
    updateMenuItem: builder.mutation({
      query: (params) => {
        return {
          url: `${version}/menu-item/${params.id}`,
          method: "PUT",
          body: {
            ...params.body,
          },
        };
      },
      invalidatesTags: (result) => [{ type: "MenuItem", id: result?._id }],
    }),
    deleteMenuItem: builder.mutation({
      query: (params) => ({
        url: `${version}/menu-item/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [{ type: "MenuItem", id: result?._id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMenuItemByIdQuery,
  useGetAllMenuItemQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemApi;
