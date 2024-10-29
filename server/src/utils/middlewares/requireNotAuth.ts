import { Request, Response, NextFunction } from 'express';
import { MAIN_APP_PAGE } from '../../constants/url';

// In some cases you have to be NOT authenticated to be able to access an API (for example: '/api/auth/sign-in')
export default (req: Request, res: Response, next: NextFunction) => {
    const isSignedIn = req.isAuthenticated();

    if (isSignedIn) {
        res.status(200).redirect(MAIN_APP_PAGE);
    } else {
        next();
    }
};
