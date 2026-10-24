import {configureStore, createSlice} from "@reduxjs/toolkit"

let slices = createSlice({
    name:"todo",
    initialState:{
        count:0,
        RegisteredUser:[],
        loggedInuser:null
    },
    reducers:{
        addRegisteredUser:(state,user)=>{
            console.log("hello")
            console.log(user.payload)
            state.RegisteredUser.push(user.payload);
            return;
        },
        login:(state,action)=>{
            const fuser = state.RegisteredUser.find(action.payload.name);
            if(!fuser) return;
            if(fuser.name !== action.payload.name || fuser.password !== action.payload.password ) return false;
            state.loggedInuser = user;
        },
        logout:(state)=>{
            state.loggedInuser = null;
            return;
        },
        incCount:(state)=>{
            state.count++;
        }
    }
})


let store = configureStore({
    reducer:{
        todo:slices.reducer
    }
})

export const {login,logout,addRegisteredUser,incCount} = slices.actions;

export default store
