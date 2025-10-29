import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const portfolioApi = createApi({
    reducerPath: "portfolioApi",
    baseQuery: fetchBaseQuery({
        // baseUrl:"http://localhost:5058/api/"
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers: Headers, api) => {
            const token = sessionStorage.getItem("token");
            token && headers.append("Authorization", `Bearer ${token}`);
            headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        }
    }),
    tagTypes: ["portfolio"],

    endpoints: (builder) => ({
        getPortfolios: builder.query({
            query: () => ({
                url:"PortfolioAPI"
            }),
            providesTags:["portfolio"]
        }),

        getPortfolioById: builder.query({
            query: (id) => ({
                url:`PortfolioAPI/${id}`
            }),
            providesTags:["portfolio"]
        }),

        createPortfolio: builder.mutation({
            query: (data) => ({
                url: "PortfolioAPI",
                method: "POST",
                body: data
            }),
            invalidatesTags:["portfolio"]
        }),

        updatePortfolio: builder.mutation({
            query: ({data,id}) => ({
                url: `PortfolioAPI/${id}`,
                method: "PUT",
                body: data
            })
        }),

        deletePortfolio: builder.mutation({
            query: (id) => ({
                url: `PortfolioAPI/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["portfolio"]
        }),

    }),
});

export const {
    useGetPortfoliosQuery, useGetPortfolioByIdQuery, useCreatePortfolioMutation,
    useDeletePortfolioMutation, useUpdatePortfolioMutation} = portfolioApi;
export default portfolioApi;