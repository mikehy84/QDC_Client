import { configureStore } from "@reduxjs/toolkit";
import { portfolioReducer } from "./PortfolioSlice";
import portfolioApi from "../Api/PortfolioApi";
import { employeeReducer } from "./EmployeeSlice";
import employeeApi from "../Api/EmployeeApi";
import authApi from "../Api/AuthApi";
import { userAuthReducer } from "./UserAuthSlice";




const store = configureStore({
    reducer: {
        portfolioStore: portfolioReducer,
        employeeStore: employeeReducer,
        userAuthStore: userAuthReducer,
        // these items should be set after adding each api
        [portfolioApi.reducerPath]: portfolioApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(portfolioApi.middleware)
        .concat(employeeApi.middleware)
        .concat(authApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export default store;