import { Request, Response, NextFunction } from 'express';
import { MAIN_SIGN_IN_PAGE } from '../../constants/url';

// Require authentication
export default (req: Request, res: Response, next: NextFunction) => {
    const isSignedIn = req.isAuthenticated();

    if (!isSignedIn) {
        res.status(401).redirect(MAIN_SIGN_IN_PAGE);
    } else {
        next();
    }
};
