import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../shared/interfaces/IUser';

export const userState: IUser = {
    id: "",
    fullName: "",
    email: "",
    role: "",
};

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: userState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.id = action.payload.id;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});


export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;