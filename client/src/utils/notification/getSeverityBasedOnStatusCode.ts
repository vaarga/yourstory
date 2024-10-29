import { NOTIFICATION_SEVERITY } from '../../constants/notification';

export default (statusCode: number) => {
    switch (true) {
        case (statusCode < 200):
            return NOTIFICATION_SEVERITY.info;
        case (statusCode < 300):
            return NOTIFICATION_SEVERITY.success;
        default:
            return NOTIFICATION_SEVERITY.error;
    }
};
