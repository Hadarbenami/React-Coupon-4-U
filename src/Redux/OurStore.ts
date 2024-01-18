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



// export type RootState = ReturnType<typeof companyStore.getState>
// export type AppDispatch = typeof companyStore.dispatch

// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import {authReducer, authSlice} from  "./AuthSlice";import ReactDOM from 'react-dom';
// import Layout from '../Components/LayoutArea/Layout/Layout';
// ;

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // Other reducers...
//   },
// });

// // Wrap your app with Provider
// ReactDOM.render(
//   <Provider store={store}>
//     <Layout/>
//   </Provider>,
//   document.getElementById('root')
// );

// import { configureStore } from "@reduxjs/toolkit";
// import { companySlice } from "./CompanySlice";
// import { authSlice } from "./AuthSlice";
// import { generalSlice } from "./GeneralSlice";

// const rootReducer = {
//   company: companySlice.reducer,
//   auth: authSlice.reducer,
//   general: generalSlice.reducer,
// };

// export const store = configureStore({
//   reducer: rootReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

