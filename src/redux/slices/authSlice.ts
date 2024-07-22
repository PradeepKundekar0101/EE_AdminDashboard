import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/data"

type initialStateType ={
    token :string | null 
    user: IUser | null
}
const initialState :initialStateType = {
    token:null,
    user:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login : (state,action:PayloadAction<initialStateType>)=>{    
            state.token = action.payload.token;
            state.user =action.payload.user;
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
        },
        updateuser: (state,action:PayloadAction<IUser>)=>{
            console.log(action.payload)
            state.user = action.payload;
        },

    }
})
export const {login,logout,updateuser}  = authSlice.actions;
export default authSlice.reducer;