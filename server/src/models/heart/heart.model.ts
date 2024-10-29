import sequelize from '../../utils/services/sequelize';

export const getHeart = (heartedBy: number, storyId: number) => sequelize.Heart.findOne({
    where: {
        heartedBy,
        storyId,
    },
});

export const createHeart = (heartedBy: number, storyId: number) => sequelize.Heart.create({
    heartedBy,
    storyId,
});

export const deleteHeart = (heartedBy: number, storyId: number) => sequelize.Heart.destroy({
    where: {
        heartedBy,
        storyId,
    },
});
