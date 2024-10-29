import { Request, Response } from 'express';
import { STATUS_CODE } from '../constants/statusCode';
import { getImageS3Key, getObjectFromS3 } from './services/s3';
import { FAVICON_IMAGE_FILE_EXTENSION, FAVICON_IMAGE_MIME_TYPE } from '../constants/image';
import { ONE_MONTH_IN_SECONDS, ONE_MONTH } from '../constants/time';
import logError from './logError';

export default async (req: Request, res: Response) => {
    let statusCode = STATUS_CODE.successful.ok;
    let favicon: null | Buffer = null;

    try {
        const faviconKey = getImageS3Key(`favicon.${FAVICON_IMAGE_FILE_EXTENSION}`);
        const faviconData = await getObjectFromS3(faviconKey);

        favicon = faviconData.Body as Buffer;

        if (!favicon) {
            statusCode = STATUS_CODE.client.notFound;
        } else {
            res.setHeader('Content-Length', favicon.length);
            res.setHeader('Content-Type', FAVICON_IMAGE_MIME_TYPE);
            res.setHeader('Cache-Control', `public, max-age=${ONE_MONTH_IN_SECONDS}`);
            res.setHeader('Expires', new Date(Date.now() + ONE_MONTH).toUTCString());
        }
    } catch (error) {
        statusCode = STATUS_CODE.server.internalServerError;

        logError(error);
    }

    res.statusCode = statusCode;
    res.end(favicon);
};
