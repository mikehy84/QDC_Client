import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const authApi = createApi({

    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5058/api/",
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers: Headers, api) => {
            const token = sessionStorage.getItem("token");
            token && headers.append("Authorization", `Bearer ${token}`);
        }
    }),
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "Auth",
                method: "GET",
                params: {}
            }),
            // to sort data base on id
            // transformResponse: ( res:any) => res.sort((a:any,b:any) => b.userId = a.userId),

            providesTags:["Users"]
        }),

        getUserById: builder.query({
            query: (id) => ({
                url:`Auth${id}`
            }),
            providesTags:["Users"]
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: "Auth/Register",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: userData
            }),
            invalidatesTags:["Users"]
        }),


        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "Auth/Login",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: userCredentials
            }),
        }),
    }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useLoginUserMutation, useRegisterUserMutation } = authApi;
export default authApi;