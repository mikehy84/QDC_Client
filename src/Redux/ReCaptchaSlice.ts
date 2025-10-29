import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reCaptcha: false,
};

export const reCaptchaSlice = createSlice({
    name: 'reCaptcha',
    initialState: initialState,
    reducers: {
        setReCaptcha: (state, action) => {
            state.reCaptcha = action.payload;
        },
    },
});


export const { setReCaptcha } = reCaptchaSlice.actions;
export const reCaptchaReducer = reCaptchaSlice.reducer;