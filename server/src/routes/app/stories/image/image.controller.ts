import { Request, Response } from 'express';
import User from '../../../../classes/User';
import { STATUS_CODE } from '../../../../constants/statusCode';
import logError from '../../../../utils/logError';
import sendResponse from '../../../../utils/sendResponse';

export const getStoryImage = async (req: Request, res: Response) => {
    const { params: { storyUuid } } = req;
    const { query: { imageNr } } = req as unknown as { query: { imageNr: string } };

    let statusCode: number;
    let message: null | string;
    let image: null | string = null;

    try {
        ({ statusCode, message, image } = await User.getStoryImage(storyUuid, imageNr));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to get the story image.';

        logError(error, {
            user: req.user,
            storyUuid,
            imageNr,
        });
    }

    sendResponse(res, statusCode, message, image);
};
