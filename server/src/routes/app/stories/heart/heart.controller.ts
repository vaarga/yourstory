import { Request, Response } from 'express';
import User from '../../../../classes/User';
import { STATUS_CODE } from '../../../../constants/statusCode';
import logError from '../../../../utils/logError';
import sendResponse from '../../../../utils/sendResponse';

export const heartOrUnheartStory = async (req: Request, res: Response, isHearting: boolean) => {
    const { params: { storyUuid } } = req;
    const user = new User(req.user);

    let statusCode: number;
    let message: null | string;

    try {
        ({ statusCode, message } = await user.heartOrUnheartStory(storyUuid, isHearting));
    } catch (error) {
        const heartOrUnheartWord = isHearting ? 'heart' : 'unheart';

        statusCode = STATUS_CODE.server.internalServerError;
        message = `Something went wrong while trying to ${heartOrUnheartWord} the story.`;

        logError(error, {
            user: req.user,
            storyUuid,
        });
    }

    sendResponse(res, statusCode, message);
};

export const heartStory = async (req: Request, res: Response) => heartOrUnheartStory(req, res, true);

export const unheartStory = async (req: Request, res: Response) => heartOrUnheartStory(req, res, false);
