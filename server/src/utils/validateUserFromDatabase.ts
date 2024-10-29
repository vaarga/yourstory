import User from '../models/user/user.class';
import { getUser } from '../models/user/user.model';
import { STATUS_CODE } from '../constants/statusCode';
import { USER_STATUS } from '../constants/user';

export default async (userId: number) => {
    const user: null | User = await getUser(userId);

    let statusCode: null | number;
    let message: null | string = null;
    let isValid = false;

    if (user === null) {
        statusCode = STATUS_CODE.client.notFound;
        message = 'Your account does not exist in the database.';
    } else if (user.status === USER_STATUS.BANNED) {
        statusCode = STATUS_CODE.client.forbidden;
        message = 'Your account has been banned.';
    } else if (user.status === USER_STATUS.DELETED) {
        statusCode = STATUS_CODE.client.notFound;
        message = 'Your account has been deleted.';
    } else {
        statusCode = STATUS_CODE.successful.ok;
        isValid = true;
    }

    return ({
        statusCode,
        message,
        user,
        isValid,
    });
};
