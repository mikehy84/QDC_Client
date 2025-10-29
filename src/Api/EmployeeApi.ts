import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({
        // baseUrl:"http://localhost:5058/api/"
        baseUrl: process.env.REACT_APP_API_URL,
        credentials: "include", // harmless for JWT; required if you ever use cookies
        prepareHeaders: (headers: Headers, api) => {
            const token = sessionStorage.getItem("token");
            // token && headers.append("Authorization", `Bearer ${token}`);
            token && headers.set("Authorization", `Bearer ${token}`);
            return headers; // <-- IMPORTANT! You must return the headers object.
        }
    }),





    tagTypes: ["employee"],

    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url:"EmployeeAPI"
            }),
            providesTags:["employee"]
        }),

        getEmployeeById: builder.query({
            query: (id) => ({
                url:`EmployeeAPI/${id}`
            }),
            providesTags:["employee"]
        }),

        createEmployee: builder.mutation({
            query: (data) => ({
                url: "EmployeeAPI",
                method: "POST",
                body: data
            }),
            invalidatesTags:["employee"]
        }),

        updateEmployee: builder.mutation({
            query: ({data,id}) => ({
                url: `EmployeeAPI/${id}`,
                method: "PUT",
                body: data
            })
        }),

        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `EmployeeAPI/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["employee"]
        }),

    }),
});

export const {
    useGetEmployeesQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation,
    useDeleteEmployeeMutation, useUpdateEmployeeMutation} = employeeApi;
export default employeeApi;