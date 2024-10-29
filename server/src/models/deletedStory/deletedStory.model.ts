import sequelize from '../../utils/services/sequelize';

export const createDeletedStory = (storyId: number, deletedBy: number) => sequelize.DeletedStory.create({
    storyId,
    deletedBy,
});

export const createDeletedStories = (
    deletedStories: { storyId: number; deletedBy: number }[],
) => sequelize.DeletedStory.bulkCreate(deletedStories);
