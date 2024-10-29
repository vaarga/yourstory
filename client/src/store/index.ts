import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storiesSlice from './stories/stories-slice';
import uiSlice from './ui/ui-slice';
import universalSlice from './universal/universal-slice';
import userSlice from './user/user-slice';

const store = configureStore({
    reducer: {
        stories: storiesSlice.reducer,
        ui: uiSlice.reducer,
        universal: universalSlice.reducer,
        user: userSlice.reducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
