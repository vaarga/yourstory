import { AppDispatch } from '../../store';
import { NOTIFICATION_SEVERITY, UNIVERSAL_ERROR_MESSAGE } from '../../constants/notification';
import getSeverityBasedOnStatusCode from './getSeverityBasedOnStatusCode';
import { universalAction } from '../../store/universal/universal-slice';

export default (
    dispatch: AppDispatch,
    severity: number | NOTIFICATION_SEVERITY = NOTIFICATION_SEVERITY.error,
    message: null | string = UNIVERSAL_ERROR_MESSAGE,
) => {
    if (message) {
        let severityEnumElement = severity;

        if (typeof severity === 'number') {
            severityEnumElement = getSeverityBasedOnStatusCode(severity);
        }

        dispatch(universalAction.setNotification({ severity: severityEnumElement as NOTIFICATION_SEVERITY, message }));
    }
};
