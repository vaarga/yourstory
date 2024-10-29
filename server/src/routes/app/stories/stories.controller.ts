import { Request, Response } from 'express';
import User from '../../../classes/User';
import { FormattedStory, StoryPostBody } from '../../../types/story';
import { STATUS_CODE } from '../../../constants/statusCode';
import logError from '../../../utils/logError';
import sendResponse from '../../../utils/sendResponse';

export const getStories = async (req: Request, res: Response) => {
    const { query: { myStories, lastCreatedAt } } = req as unknown as {
        query: {
            myStories: string;
            lastCreatedAt?: string;
        };
    };
    const user = new User(req.user);

    let statusCode: number;
    let message: null | string;
    let formattedStories: FormattedStory[] = [];

    try {
        ({ statusCode, message, formattedStories } = await user.getStories(myStories === 'true', lastCreatedAt));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to get the stories.';

        logError(error, {
            user: req.user,
            myStories,
            lastCreatedAt,
        });
    }

    sendResponse(res, statusCode, message, formattedStories);
};

export const createStory = async (req: Request, res: Response) => {
    const { body: { title, content, category }, files } = req as {
        body: StoryPostBody;
        files: Express.Multer.File[];
    };
    const user = new User(req.user);

    let statusCode: number;
    let message: string;

    try {
        ({ statusCode, message } = await user.createStory(title, content, category, files));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to create the story.';

        logError(error, {
            user: req.user,
            story: { title, content, category },
        });
    }

    sendResponse(res, statusCode, message);
};

export const deleteStory = async (req: Request, res: Response) => {
    const { params: { storyUuid } } = req;
    const user = new User(req.user);

    let statusCode: number;
    let message: string;

    try {
        ({ statusCode, message } = await user.deleteStory(storyUuid));
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;
        message = 'Something went wrong while trying to delete the story.';

        logError(error, {
            user: req.user,
            storyUuid,
        });
    }

    sendResponse(res, statusCode, message);
};
