import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: [],
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
    },
});


export const { setEmployees } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;