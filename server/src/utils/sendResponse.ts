import { Response } from 'express';

export default (
    response: Response,
    statusCode: number,
    message: null | string,
    auxData: null | any = null,
) => response.status(statusCode).send({ message, auxData });
