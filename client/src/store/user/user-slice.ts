import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    isSignedIn: boolean;
    isAdmin: boolean;
    isAnonymous: boolean;
    uuid: null | string;
} = {
    isSignedIn: false,
    isAdmin: false,
    isAnonymous: false,
    uuid: null,
};

// The way Redux Toolkit works it's okay to reassign a parameter
/* eslint-disable no-param-reassign */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{
            isSignedIn: boolean;
            isAdmin: boolean;
            isAnonymous: boolean;
            uuid: null | string;
        }>) {
            state.isSignedIn = action.payload.isSignedIn;
            state.isAdmin = action.payload.isAdmin;
            state.isAnonymous = action.payload.isAnonymous;
            state.uuid = action.payload.uuid;
        },
        setIsAnonymous(state, action: PayloadAction<boolean>) {
            state.isAnonymous = action.payload;
        },
    },
});
/* eslint-enable no-param-reassign */

export const userAction = userSlice.actions;

export default userSlice;
