import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";



export interface CouponState{
    value: Coupon[]
    lastUpdated: Date
}

const initState: CouponState = {
    value: [],
    lastUpdated: new Date()
}

export const couponSlice = createSlice({
    name: "coupons",
    initialState: initState,
    reducers: {
        //action to fill the state with all the employees
        fill: (state, action: PayloadAction<Coupon[]>) =>{
            state.value = action.payload;
            //state.lastUpdated = new Date();
        },
        add:(state, action: PayloadAction<Coupon>)=>{
            state.value.push(action.payload);
        },
        //action to remove Coupon
        remove:(state, action: PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(c => c.id ==  action.payload);
            if(indexToDelete >= 0 ) 
                state.value.splice(indexToDelete, 1);
        },
        update:(state, action: PayloadAction<Coupon>)=>{
            const indexToUpdate = state.value.findIndex(c => c.id ==  action.payload.id);
            if(indexToUpdate >= 0)
                state.value[indexToUpdate] = action.payload;
        }
        
    }
});

export const {fill, add, remove, update} = couponSlice.actions;
export default couponSlice.reducer;