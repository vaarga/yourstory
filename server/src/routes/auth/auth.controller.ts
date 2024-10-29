import { Request, Response } from 'express';

// The way we sign out is generic, it's not specific to Google, Facebook or any other provider
export const signOut = (req: Request, res: Response) => {
    // Remove 'req.user' and clear any signed-in session
    req.logout();

    return res.redirect('/');
};
