import { createSelector, createSlice , PayloadAction} from "@reduxjs/toolkit";
import { RootState } from ".";


type Profile = {}

interface AuthState {
    profile: null | Profile
    pending: boolean
}

const initialState : AuthState = {
    pending: false,
    profile: null,
};

const authSlice = createSlice({name: "auth", initialState, reducers:{
    updateAuthState(state,{payload} : PayloadAction<AuthState>){
        state.pending = payload.pending;
        state.profile = payload.pending;

    },
}});
export const {updateAuthState} = authSlice.actions
export const getAuthState = createSelector((state: RootState) => {

    (state: RootState) => state.auth;
}, (authState) => {
    return authState;
});
export default authSlice.reducer
