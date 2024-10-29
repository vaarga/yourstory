import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Paper from '../../../reusables/Paper';
import { useAppDispatch, State } from '../../../../store';
import { API_PATH_SEGMENT } from '../../../../constants/url';
import getIsDarkTheme from '../../../../utils/localStorage/getIsDarkTheme';
import { uiAction } from '../../../../store/ui/ui-slice';
import showNotification from '../../../../utils/notification/showNotification';
import { NOTIFICATION_SEVERITY } from '../../../../constants/notification';
import { universalAction } from '../../../../store/universal/universal-slice';
import { MODAL_TYPE } from '../../../../constants/modal';
import setIsDarkTheme from '../../../../utils/localStorage/setIsDarkTheme';
import { updateUser } from '../../../../store/user/user-actions';

const MyAccount = (): JSX.Element => {
    const appDispatch = useAppDispatch();
    const {
        ui: { isDarkTheme, isSavingChanges },
        user: { isAnonymous },
    } = useSelector((state: State) => state);
    const [isAnonymousSetting, setIsAnonymousSetting] = useState<boolean>(isAnonymous);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const SIGN_OUT_URL = API_PATH_SEGMENT.root + API_PATH_SEGMENT.auth.segment + API_PATH_SEGMENT.auth.signOut.segment;

    // In the case the user saved the changes this won't have any effect because the preferred theme is already saved
    // in the local storage, otherwise we want to put back the original one they had before
    useEffect(() => () => {
        const isDarkThemeFromLocalStorage = getIsDarkTheme();

        appDispatch(uiAction.setIsDarkTheme(isDarkThemeFromLocalStorage));
    }, []);

    const handleAnonymousChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTouched(true);
        setIsAnonymousSetting(event.target.checked);
    };

    const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (localStorage) {
            setIsTouched(true);

            appDispatch(uiAction.setIsDarkTheme(event.target.checked));
        } else {
            showNotification(appDispatch, NOTIFICATION_SEVERITY.error, 'In order to be able to change the ' +
                'theming you must enable the local storage for your browser.');
        }
    };

    const handleDeleteUser = () => {
        appDispatch(universalAction.setModal({ type: MODAL_TYPE.USER_DELETION }));
    };

    const handleSaveChanges = () => {
        setIsDarkTheme(isDarkTheme);

        if (isAnonymousSetting !== isAnonymous) {
            appDispatch(updateUser(isAnonymousSetting));
        } else {
            showNotification(appDispatch, NOTIFICATION_SEVERITY.success, 'The changes have been successfully made.');
        }
    };

    return (
        <Paper
            footer={(
                <>
                    <Stack flexDirection="row" flexWrap="wrap" gap={2}>
                        <Button color="delete" onClick={handleDeleteUser}>
                            Delete account
                        </Button>
                        <Button href={SIGN_OUT_URL}>
                            Sign out
                        </Button>
                    </Stack>
                    <LoadingButton
                        disabled={isSavingChanges || !isTouched}
                        loading={isSavingChanges}
                        onClick={handleSaveChanges}
                    >
                        Save changes
                    </LoadingButton>
                </>
            )}
        >
            <Stack gap={3}>
                <Stack flexDirection="row" alignItems="center">
                    <FormControlLabel
                        control={(
                            <Switch
                                checked={isAnonymousSetting}
                                onChange={handleAnonymousChange}
                            />
                        )}
                        label="Be an anonymous author"
                        labelPlacement="end"
                    />
                    <Tooltip title="Admin users will still be able to see your identity" placement="right">
                        <InfoRoundedIcon />
                    </Tooltip>
                </Stack>
                <Stack flexDirection="row" alignItems="center">
                    <FormControlLabel
                        control={(
                            <Switch
                                checked={isDarkTheme}
                                onChange={handleThemeChange}
                            />
                        )}
                        label="Use dark theme"
                        labelPlacement="end"
                    />
                    <Tooltip title="This theme preference is only saved for your current browser" placement="right">
                        <InfoRoundedIcon />
                    </Tooltip>
                </Stack>

            </Stack>
        </Paper>
    );
};

export default MyAccount;
