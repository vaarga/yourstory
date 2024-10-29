import { Request, Response, NextFunction } from 'express';
import User from '../../models/user/user.class';
import validateUser from '../validateUserFromDatabase';
import { STATUS_CODE } from '../../constants/statusCode';
import logError from '../logError';
import sendResponse from '../sendResponse';

export default async (req: Request, res: Response, next: NextFunction) => {
    let statusCode: number;
    let message: null | string;
    let user: null | User;
    let isValid: boolean = false;

    try {
        ({
            statusCode,
            message,
            user,
            isValid,
        } = await validateUser(req.user.id));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to validate your account.';

        logError(error, { user: req.user });
    }

    if (!isValid) {
        req.logout();

        sendResponse(res, statusCode, message);
    } else {
        if (user!.isAdmin) {
            req.user.isAdmin = true;
        }

        next();
    }
};
