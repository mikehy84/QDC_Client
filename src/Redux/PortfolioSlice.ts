import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    portfolios: [],
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: initialState,
    reducers: {
        setPortfolios: (state, action) => {
            state.portfolios = action.payload;
        },
    },
});


export const { setPortfolios } = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;