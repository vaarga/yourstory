import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NOTIFICATION_SEVERITY } from '../../constants/notification';
import { MODAL_TYPE } from '../../constants/modal';

const initialState: {
    notification: {
        isOpened: boolean;
        severity: null | NOTIFICATION_SEVERITY;
        message: null | string;
    };
    modal: {
        type: null | MODAL_TYPE;
        auxData: any;
    };
} = {
    notification: {
        isOpened: false,
        severity: null,
        message: null,
    },
    modal: {
        type: null,
        auxData: null,
    },
};

// The way Redux Toolkit works it's okay to reassign a parameter
/* eslint-disable no-param-reassign */
const universalSlice = createSlice({
    name: 'universal',
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<{
            severity: NOTIFICATION_SEVERITY;
            message: string;
        }>) {
            state.notification = {
                isOpened: true,
                severity: action.payload.severity,
                message: action.payload.message,
            };
        },
        hideNotification(state) {
            state.notification.isOpened = false;
        },
        setModal(state, action: PayloadAction<{ type: MODAL_TYPE; auxData?: any}>) {
            state.modal.type = action.payload.type;
            state.modal.auxData = action.payload.auxData;
        },
        closeModal(state) {
            state.modal.type = null;
            state.modal.auxData = null;
        },
    },
});
/* eslint-enable no-param-reassign */

export const universalAction = universalSlice.actions;

export default universalSlice;
