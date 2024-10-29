import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../../types/typescript';

const initialState: {
    currentIndex: number;
    stories: Story[];
    isAllStoriesLoaded: boolean;
} = {
    currentIndex: 0,
    stories: [],
    isAllStoriesLoaded: false,
};

// The way Redux Toolkit works it's okay to reassign a parameter
/* eslint-disable no-param-reassign */
const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setCurrentIndex(state, action: PayloadAction<number>) {
            state.currentIndex = action.payload;
        },
        setStories(state, action: PayloadAction<Story[]>) {
            state.stories = action.payload;
        },
        setIsAllStoriesLoaded(state, action: PayloadAction<boolean>) {
            state.isAllStoriesLoaded = action.payload;
        },
        setStoryImage(state, action: PayloadAction<{ storyIndex: number; imageIndex: number; image: string }>) {
            state.stories[action.payload.storyIndex].resizedImages = {
                ...state.stories[action.payload.storyIndex].resizedImages,
                [action.payload.imageIndex]: action.payload.image,
            };
        },
        setStoryIsHeartedAndHeartsNr(state, action: PayloadAction<{ storyIndex: number; isHearted: boolean }>) {
            const heartsNr = action.payload.isHearted
                ? state.stories[action.payload.storyIndex].heartsNr + 1
                : state.stories[action.payload.storyIndex].heartsNr - 1;

            state.stories[action.payload.storyIndex] = {
                ...state.stories[action.payload.storyIndex],
                isHearted: action.payload.isHearted,
                heartsNr,
            };
        },
    },
});
/* eslint-enable no-param-reassign */

export const storiesAction = storiesSlice.actions;

export default storiesSlice;
