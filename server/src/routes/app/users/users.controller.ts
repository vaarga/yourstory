import { Request, Response } from 'express';
import User from '../../../classes/User';
import { STATUS_CODE } from '../../../constants/statusCode';
import logError from '../../../utils/logError';
import sendResponse from '../../../utils/sendResponse';

export const deleteOrBanUser = async (req: Request, res: Response) => {
    const { params: { userUuid } } = req;
    const user = new User(req.user);
    const isBanning = userUuid !== req.user.uuid;

    let statusCode: number;
    let message: string;

    try {
        ({ statusCode, message } = await user.deleteOrBanUser(userUuid, isBanning));

        // Response is OK
        if ((statusCode >= 200 && statusCode < 300) && !isBanning) {
            req.logout();
        }
    } catch (error) {
        const deleteOrBanWord = isBanning ? 'ban' : 'delete';

        statusCode = STATUS_CODE.server.internalServerError;
        message = `Something went wrong while trying to ${deleteOrBanWord} the account.`;

        logError(error, {
            user: req.user,
            userUuid,
        });
    }

    sendResponse(res, statusCode, message);
};

export const updateUser = async (req: Request, res: Response) => {
    const { body: { isAnonymous } } = req;
    const user = new User(req.user);

    let statusCode: number;
    let message: string;

    try {
        ({ statusCode, message } = await user.updateUser(req.user.id, isAnonymous));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to save the changes.';

        logError(error, {
            user: req.user,
            isAnonymous,
        });
    }

    sendResponse(res, statusCode, message);
};
