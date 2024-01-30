import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./CompanySlice";
import { authSlice } from "./AuthSlice";
import { generalSlice } from "./GeneralSlice";
import { couponSlice } from "./CouponSlice";

export const companyStore = configureStore({
    reducer: companySlice.reducer
});

export const couponStore = configureStore({
    reducer: couponSlice.reducer
});


export const authStore = configureStore({
    reducer: authSlice.reducer
});

export const generalStore = configureStore({
    reducer: generalSlice.reducer
});



export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;

