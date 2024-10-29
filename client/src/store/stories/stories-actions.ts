import { NavigateFunction } from 'react-router-dom';
import { AppDispatch, State } from '../index';
import { uiAction } from '../ui/ui-slice';
import { API_PATH_SEGMENT, PAGE_PATH_SEGMENT } from '../../constants/url';
import { storiesAction } from './stories-slice';
import showNotification from '../../utils/notification/showNotification';
import { NOTIFICATION_SEVERITY } from '../../constants/notification';
import { universalAction } from '../universal/universal-slice';

export const getStoryImage = (
    storyIndex: number,
    storyUuid: string,
    imageIndex: number,
) => async (dispatch: AppDispatch) => {
    dispatch(uiAction.setModalIsGettingImage(true));

    let responseImage: undefined | string;

    try {
        const response = await fetch(
            `${API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.stories.segment
            + API_PATH_SEGMENT.app.stories.image.segment
            }/${storyUuid}?imageNr=${imageIndex + 1}`
        );

        const { message, auxData: image } = await response.json();

        if (response.ok && image) {
            responseImage = image;

            dispatch(storiesAction.setStoryImage({ storyIndex, imageIndex, image }));
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to get the story image.'
        );
    }

    // If the 'responseImage' is still 'undefined' it means we couldn't get the image, so we have to close the modal
    if (responseImage === undefined) {
        dispatch(universalAction.closeModal());
    }

    dispatch(uiAction.setModalIsGettingImage(false));
};

export const getStories = (myStories: boolean) => async (dispatch: AppDispatch, getState: () => State) => {
    dispatch(uiAction.setIsGettingStories(true));

    let lastCreatedAtParam = '';

    const { stories: { stories } } = getState();
    const hasStoriesLoaded = stories.length !== 0;

    if (hasStoriesLoaded) {
        const lastCreatedAt = stories[stories.length - 1].createdAt;

        lastCreatedAtParam = `&lastCreatedAt=${lastCreatedAt}`;
    }

    try {
        const response = await fetch(
            `${API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.stories.segment
            }?myStories=${myStories}${lastCreatedAtParam}`
        );

        const { message, auxData: newStories } = await response.json();

        if (response.ok) {
            dispatch(storiesAction.setStories([...stories, ...newStories]));

            // The currentIndex could have changed since the first 'getState()' (because it was before the fetch, which
            // can be slow) so we need to call it again
            const { stories: { currentIndex } } = getState();

            if (hasStoriesLoaded) {
                if (newStories.length === 0) {
                    dispatch(storiesAction.setIsAllStoriesLoaded(true));

                    showNotification(dispatch, NOTIFICATION_SEVERITY.info, 'There are no more stories to load.');
                } else if (stories.length - 1 === currentIndex) {
                    dispatch(storiesAction.setCurrentIndex(currentIndex + 1));
                }
            }
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to get the stories.'
        );
    }

    dispatch(uiAction.setIsGettingStories(false));
};

export const createStory = (formData: FormData, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    dispatch(uiAction.setIsCreatingStory(true));

    try {
        const response = await fetch(
            API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.stories.segment,
            {
                method: 'POST',
                body: formData,
            }
        );

        const { message } = await response.json();

        if (response.ok) {
            navigate(`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.myStories.segment}`);
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to create the story.'
        );
    }

    dispatch(uiAction.setIsCreatingStory(false));
};

export const deleteStory = () => async (dispatch: AppDispatch, getState: () => State) => {
    dispatch(uiAction.setModalIsDeletingStory(true));

    const { universal: { modal: { auxData: { storyUuid, storyIndex } } } } = getState();

    try {
        const response = await fetch(
            `${API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.stories.segment
            }/${storyUuid}`,
            { method: 'DELETE' }
        );

        const { message } = await response.json();

        if (response.ok) {
            const { stories: { stories, currentIndex } } = getState();

            if (stories.length - 1 === storyIndex && currentIndex !== 0) {
                dispatch(storiesAction.setCurrentIndex(currentIndex - 1));
            }

            dispatch(storiesAction.setStories(stories.filter(story => story.uuid !== storyUuid)));
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        showNotification(
            dispatch,
            NOTIFICATION_SEVERITY.error,
            'Something went wrong while trying to delete the story.',
        );
    }

    dispatch(uiAction.setModalIsDeletingStory(false));

    dispatch(universalAction.closeModal());
};

export const heartOrUnheartStory = (
    storyIndex: number,
    storyUuid: string,
    isHearting: boolean,
) => async (dispatch: AppDispatch) => {
    const method = isHearting ? 'POST' : 'DELETE';

    try {
        const response = await fetch(
            `${API_PATH_SEGMENT.root
            + API_PATH_SEGMENT.app.segment
            + API_PATH_SEGMENT.app.stories.segment
            + API_PATH_SEGMENT.app.stories.heart.segment
            }/${storyUuid}`,
            { method }
        );

        const { message } = await response.json();

        if (response.ok) {
            dispatch(storiesAction.setStoryIsHeartedAndHeartsNr({ storyIndex, isHearted: isHearting }));
        }

        showNotification(dispatch, response.status, message);
    } catch (error) {
        const heartOrUnheartWord = isHearting ? 'heart' : 'unheart';

        const message = `Something went wrong while trying to ${heartOrUnheartWord} the story.`;

        showNotification(dispatch, NOTIFICATION_SEVERITY.error, message);
    }
};
