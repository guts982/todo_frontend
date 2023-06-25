
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface IGlobalInitState {
    apiProgress:number,
    loading:boolean
}

const initialState:IGlobalInitState =  {
    apiProgress:0,
    loading: false,
}


export const globalSlice = createSlice({
    name:"globalSlice",
    initialState,
    reducers: {
        setApiProgress: (state, action:PayloadAction<number>) => {
           state.apiProgress = action.payload;
        },
        toggleLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading = action?.payload 
        }

    }
});

// Action creators are generated for each case reducer function
export const {setApiProgress, toggleLoading} = globalSlice.actions
export default globalSlice.reducer
