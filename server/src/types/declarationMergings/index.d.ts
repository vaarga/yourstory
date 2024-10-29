import { Request as OriginalRequest } from 'express';
import { DecryptedUser } from '../user';

declare module 'express' {
    interface Request extends OriginalRequest {
        user: DecryptedUser;
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user: DecryptedUser;
    }
}
