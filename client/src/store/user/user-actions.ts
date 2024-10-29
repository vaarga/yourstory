import { NavigateFunction } from 'react-router-dom';
import { AppDispatch, State } from '../index';
import { API_PATH_SEGMENT, PAGE_PATH_SEGMENT } from '../../constants/url';
import { userAction } from './user-slice';
import showNotification from '../../utils/notification/showNotification';
import { NOTIFICATION_SEVERITY } from '../../constants/notification';
import { uiAction } from '../ui/ui-slice';
import { storiesAction } from '../stories/stories-slice';
import { universalAction } from '../universal/universal-slice';

export const getInitialData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(API_PATH_SEGMENT.root + API_PATH_SEGMENT.initialData.segment);

        const { message, auxData } = await response.json();

        if (response.ok) {
            const {
                isSignedIn,
                isAdmin,
                isAnonymous,
                uuid,
            } = auxData;

            dispatch(userAction.setUser({
                isSignedIn,
                isAdmin,
                isAnonymous,
                uuid,
            }));
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to get the initial data.'
        );
    }

    dispatch(uiAction.setIsGettingInitialData(false));
};

export const deleteOrBanUser = (
    uuid: string,
    isBanning: boolean,
    navigate: NavigateFunction,
) => async (dispatch: AppDispatch, getState: () => State) => {
    dispatch(uiAction.setModalIsDeletingUser(true));

    try {
        const response = await fetch(
            `${API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.users.segment
            }/${uuid}`,
            { method: 'DELETE' }
        );

        const { message } = await response.json();

        if (response.ok) {
            if (isBanning) {
                const { stories: { stories } } = getState();

                const storiesAfterUserBan = stories.filter(story => story.author!.uuid !== uuid);

                dispatch(storiesAction.setCurrentIndex(0));
                dispatch(storiesAction.setStories(storiesAfterUserBan));
            } else {
                navigate(PAGE_PATH_SEGMENT.root);
            }
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        const deleteOrBanWord = isBanning ? 'ban' : 'delete';

        const message = `Something went wrong while trying to ${deleteOrBanWord} the account.`;

        showNotification(dispatch, NOTIFICATION_SEVERITY.error, message);
    }

    dispatch(uiAction.setModalIsDeletingUser(false));

    dispatch(universalAction.closeModal());
};

export const updateUser = (isAnonymous: boolean) => async (dispatch: AppDispatch) => {
    dispatch(uiAction.setIsSavingChanges(true));

    try {
        const response = await fetch(
            API_PATH_SEGMENT.root + API_PATH_SEGMENT.app.segment + API_PATH_SEGMENT.app.users.segment,
            {
                method: 'PATCH',
                body: JSON.stringify({ isAnonymous }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            },
        );

        const { message } = await response.json();

        if (response.ok) {
            dispatch(userAction.setIsAnonymous(isAnonymous));
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to save the changes.'
        );
    }

    dispatch(uiAction.setIsSavingChanges(false));
};
