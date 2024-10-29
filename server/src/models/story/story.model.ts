import { Op } from 'sequelize';
import sequelize from '../../utils/services/sequelize';
import { STORY_STATUS, STORY_PAGINATION_NR } from '../../constants/story';
import { Story } from '../../types/story';

export const getStory = (storyUuid: string) => sequelize.Story.findOne({
    where: {
        uuid: storyUuid,
    },
});

export const getStoryWithUser = (storyUuid: string) => sequelize.Story.findOne({
    attributes: [],
    where: {
        uuid: storyUuid,
    },
    include: [{
        model: sequelize.User,
        as: 'user',
        attributes: ['uuid'],
    }],
});

export const getStoriesIdByUser = (userId: number) => sequelize.Story.findAll({
    where: {
        userId,
        status: STORY_STATUS.NORMAL,
    },
}).then(stories => stories.map(story => story.id));

export const getStoriesWithUserAndHearts = (lastCreatedAt?: string, userId?: number) => {
    const where: {
        status: string;
        userId?: number;
        createdAt?: { [Op.lt]: string };
    } = {
        status: STORY_STATUS.NORMAL,
    };

    if (userId) {
        where.userId = userId;
    }

    if (lastCreatedAt) {
        where.createdAt = { [Op.lt]: lastCreatedAt };
    }

    return sequelize.Story.findAll({
        attributes: ['uuid', 'title', 'content', 'category', ['images_nr', 'imagesNr'], ['created_at', 'createdAt']],
        where,
        include: [{
            model: sequelize.User,
            as: 'user',
            attributes: ['uuid', 'name', 'photo', 'status'],
        }, {
            model: sequelize.Heart,
            as: 'hearts',
            attributes: [['hearted_by', 'heartedBy']],
        }],
        limit: STORY_PAGINATION_NR,
        order: [['createdAt', 'DESC']],
    });
};

export const countUserStories = (userId: number) => sequelize.Story.count({
    where: {
        userId,
        status: STORY_STATUS.NORMAL,
    },
});

export const createStory = (story: Story) => sequelize.Story.create(story);

export const updateStoryStatus = (storyUuid: string) => sequelize.Story.update({
    status: STORY_STATUS.DELETED,
}, {
    where: {
        uuid: storyUuid,
    },
});

export const updateStoriesToStatusDeleted = (primaryKeys: number[]) => sequelize.Story.update({
    status: STORY_STATUS.DELETED,
}, {
    where: {
        id: { [Op.in]: primaryKeys },
    },
});
