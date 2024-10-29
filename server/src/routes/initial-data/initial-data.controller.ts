import { Request, Response } from 'express';
import { STATUS_CODE } from '../../constants/statusCode';
import User from '../../models/user/user.class';
import validateUser from '../../utils/validateUserFromDatabase';
import { USER_STATUS } from '../../constants/user';
import logError from '../../utils/logError';
import sendResponse from '../../utils/sendResponse';

// Get initial data when the app is loaded for the first time or after sign in
export const getInitialData = async (req: Request, res: Response) => {
    const isSignedIn = req.isAuthenticated();

    let statusCode: null | number = STATUS_CODE.successful.ok;
    let message: null | string = null;
    let user: null | User;
    let isValid: boolean;

    let initialData: {
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

    try {
        if (isSignedIn) {
            ({
                statusCode,
                message,
                user,
                isValid,
            } = await validateUser(req.user.id));

            if (!isValid) {
                req.logout();
            } else {
                initialData = {
                    isSignedIn: true,
                    isAdmin: user!.isAdmin,
                    isAnonymous: user!.status === USER_STATUS.ANONYMOUS,
                    uuid: user!.uuid,
                };
            }
        }
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to get the initial data.';

        logError(error, {
            user: req.user,
            isSignedIn,
        });
    }

    sendResponse(res, statusCode, message, initialData);
};
