// import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
// import { User } from "../Models/User";
// import { jwtDecode } from "jwt-decode";

// export interface AuthState{
//     user: User;
//     token: string;
// }

// const initState: AuthState = {
//     user: null,
//     token: ""
// }

// export const authSlice = createSlice({
//     name: "auth",
//     initialState: initState,
//     reducers: {
//         login: (state, action: PayloadAction<string>) =>{
//             state.token = action.payload;
//             state.user = jwtDecode(action.payload);
//         },

//         logout: (state) =>{
//             state.token = "";
//             state.user = null;
//         }

//     }
// });

// export const{login, logout} = authSlice.actions;
// export default authSlice.reducer;
// export const authStore = configureStore({
//     reducer: authSlice.reducer
// });
// export type RootState = ReturnType<typeof authStore.getState>
// export type AppDispatch = typeof authStore.dispatch

// import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
// import { User } from "../Models/User";
// import { jwtDecode } from "jwt-decode";

// export interface AuthState {
//   user: User | null;
//   token: string;
// }

// const initState: AuthState = {
//   user: null,
//   token: ""
// }

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: initState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       state.user = jwtDecode(action.payload);
//     },
//     logout: (state) => {
//       state.token = "";
//       state.user = null;
//     }
//   }
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
// export const authStore = configureStore({
//   reducer: authSlice.reducer
// });
// export type RootState = ReturnType<typeof authStore.getState>;
// export type AppDispatch = typeof authStore.dispatch;

// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

// interface User {
//     id: number;
//     name: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: string;
// }

// export interface AuthState {
//   user: User | null;
//   token: string;
// }

// const initState: AuthState = {
//   user: null,
//   token: "",
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: initState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       state.user = jwtDecode(action.payload);
//     },
//     logout: (state) => {
//       state.token = "";
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export const authReducer = authSlice.reducer;

// export const authStore = configureStore({
//   reducer: {
//     auth: authReducer, // Specify the reducer for the 'auth' slice
//   },
// });

// export type RootState = ReturnType<typeof authStore.getState>;
// export type AppDispatch = typeof authStore.dispatch;

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string
  role: string | null;
}

export interface AuthState {
  user: User | null;
  token: string;
 
}

const initState: AuthState = {
  user: sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null,
  token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      // save token to RAM
      state.token = action.payload;
      //also save token to HD
      sessionStorage.setItem("token", state.token);

      state.user = jwtDecode(action.payload);
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      sessionStorage.removeItem("token")
    },
   
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authStore = configureStore({
  reducer: {
    auth: authSlice.reducer, // Use authSlice.reducer directly
  },
});

export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;

