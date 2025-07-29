// src/services/adminApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User", "Resource"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/register",
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getUserList: builder.query({
      query: ({ page = 1, perPage = 10, token }) => ({
        url: `/user-list?page=${page}&per_page=${perPage}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/user-delete/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    getProductList: builder.query({
      query: ({ page = 1, perPage = 10, token }) => ({
        url: `/product-list?page=${page}&per_page=${perPage}`,
        method: "GET",
        headers: token
          ? {
            Authorization: `Bearer ${token}`,
          }
          : {},
      }),
    }),


    addProduct: builder.mutation({
      query: ({ formData, token }) => ({
        url: '/add-product',
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Resource'],
    }),

    getCountryList: builder.query({
      query: (token) => ({
        url: "/country-list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getStateList: builder.query({
      query: ({ countryId, token }) => ({
        url: `/state-list?country_id=${countryId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserListQuery,
  useDeleteUserMutation,
  useGetProductListQuery,
  useAddProductMutation,
  useGetCountryListQuery,
  useGetStateListQuery,
} = adminApi;
