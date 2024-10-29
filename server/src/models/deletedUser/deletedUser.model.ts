import sequelize from '../../utils/services/sequelize';

export const createDeletedUser = (userId: number, deletedBy: number) => sequelize.DeletedUser.create({
    userId,
    deletedBy,
});
