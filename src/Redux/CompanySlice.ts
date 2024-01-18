import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Company from "../Models/Comapny";



export interface CompanyState{
    value: Company[]
    lastUpdated: Date
}

const initState: CompanyState = {
    value: [],
    lastUpdated: new Date()
}

export const companySlice = createSlice({
    name: "companies",
    initialState: initState,
    reducers: {
        //action to fill the state with all the employees
        fill: (state, action: PayloadAction<Company[]>) =>{
            state.value = action.payload;
            //state.lastUpdated = new Date();
        },
        add:(state, action: PayloadAction<Company>)=>{
            state.value.push(action.payload);
        },
        //action to remove COMPANY
        remove:(state, action: PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(c => c.id ==  action.payload);
            if(indexToDelete >= 0 ) 
                state.value.splice(indexToDelete, 1);
        },
        update:(state, action: PayloadAction<Company>)=>{
            const indexToUpdate = state.value.findIndex(c => c.id ==  action.payload.id);
            if(indexToUpdate >= 0)
                state.value[indexToUpdate] = action.payload;
        }
        
    }
});

export const {fill, add, remove, update} = companySlice.actions;
export default companySlice.reducer;