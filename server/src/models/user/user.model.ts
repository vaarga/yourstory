import sequelize from '../../utils/services/sequelize';
import { UserFromGoogle, UserFieldsToUpdate } from '../../types/user';
import { USER_STATUS } from '../../constants/user';

export const getUser = (userId: number) => sequelize.User.findByPk(userId);

export const getUserByUuid = (uuid: string) => sequelize.User.findOne({
    where: {
        uuid,
    },
});

export const getUserByGoogleId = (googleId: string) => sequelize.User.findOne({
    where: {
        googleId,
    },
});

export const createUser = (user: UserFromGoogle) => sequelize.User.create(user);

export const updateUser = (userId: number, userFieldsToUpdate: UserFieldsToUpdate) => sequelize.User.update(
    userFieldsToUpdate,
    {
        where: {
            id: userId,
        },
    },
);

export const updateUserStatus = (userId: number, status: USER_STATUS) => sequelize.User.update(
    { status },
    {
        where: {
            id: userId,
        },
    },
);
