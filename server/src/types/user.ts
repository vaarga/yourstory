import { EncryptedText } from './index';
import { USER_STATUS } from '../constants/user';

type User = { uuid: string };

export type EncryptedUser = { id: EncryptedText } & User;

export type DecryptedUser = { id: number; isAdmin: boolean } & User;

export type UserFromGoogle = {
    googleId: string;
    name: string;
    email: null | string;
    photo: null | string;
};

export type UserFieldsToUpdate = {
    name?: string;
    email?: null | string;
    photo?: null | string;
    status?: USER_STATUS;
};
