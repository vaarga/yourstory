import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isDarkTheme: false,
    isGettingInitialData: true,
    isGettingStories: false,
    isCreatingStory: false,
    isSavingChanges: false,
    modal: {
        isGettingImage: false,
        isDeletingStory: false,
        isDeletingUser: false,
    },
};

// The way Redux Toolkit works it's okay to reassign a parameter
/* eslint-disable no-param-reassign */
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsDarkTheme(state, action: PayloadAction<boolean>) {
            state.isDarkTheme = action.payload;
        },
        setIsGettingInitialData(state, action: PayloadAction<boolean>) {
            state.isGettingInitialData = action.payload;
        },
        setIsGettingStories(state, action: PayloadAction<boolean>) {
            state.isGettingStories = action.payload;
        },
        setIsCreatingStory(state, action: PayloadAction<boolean>) {
            state.isCreatingStory = action.payload;
        },
        setIsSavingChanges(state, action: PayloadAction<boolean>) {
            state.isSavingChanges = action.payload;
        },
        setModalIsGettingImage(state, action: PayloadAction<boolean>) {
            state.modal.isGettingImage = action.payload;
        },
        setModalIsDeletingStory(state, action: PayloadAction<boolean>) {
            state.modal.isDeletingStory = action.payload;
        },
        setModalIsDeletingUser(state, action: PayloadAction<boolean>) {
            state.modal.isDeletingUser = action.payload;
        },
    },
});
/* eslint-enable no-param-reassign */

export const uiAction = uiSlice.actions;

export default uiSlice;
