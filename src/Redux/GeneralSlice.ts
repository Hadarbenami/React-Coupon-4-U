import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Company from "../Models/Comapny";
import Coupon from "../Models/Coupon";



export interface GeneralState{
    value: Coupon[]
    lastUpdated: Date
}

const initState: GeneralState = {
    value: [],
    lastUpdated: new Date()
}

export const generalSlice = createSlice({
    name: "coupons",
    initialState: initState,
    reducers: {
        //action to fill the state with all the coupons
        fill: (state, action: PayloadAction<Coupon[]>) =>{
            state.value = action.payload;
            //state.lastUpdated = new Date();
        }
    }
});


export const {fill} = generalSlice.actions;
export default generalSlice.reducer;