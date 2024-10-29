import { Sequelize } from 'sequelize';
import User from '../../models/user/user.class';
import userDefinition from '../../models/user/user.definition';
import DeletedUser from '../../models/deletedUser/deletedUser.class';
import deletedUserDefinition from '../../models/deletedUser/deletedUser.definition';
import Story from '../../models/story/story.class';
import storyDefinition from '../../models/story/story.definition';
import DeletedStory from '../../models/deletedStory/deletedStory.class';
import deletedStoryDefinition from '../../models/deletedStory/deletedStory.definition';
import Heart from '../../models/heart/heart.class';
import heartDefinition from '../../models/heart/heart.definition';

const isDevEnv = process.env.NODE_ENV === 'development';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        define: {
            timestamps: false,
            underscored: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: isDevEnv,
    }
);

User.init(userDefinition, { tableName: 'users', sequelize });
DeletedUser.init(deletedUserDefinition, { tableName: 'deleted_users', sequelize });
Story.init(storyDefinition, { tableName: 'stories', sequelize });
DeletedStory.init(deletedStoryDefinition, { tableName: 'deleted_stories', sequelize });
Heart.init(heartDefinition, { tableName: 'hearts', sequelize });

// Define the associations
// One-to-many relationships
User.hasMany(DeletedUser, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: false,
    },
});
DeletedUser.belongsTo(User);

User.hasMany(DeletedStory, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: false,
    },
});
DeletedStory.belongsTo(User, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: false,
    },
});

User.hasMany(Story, {
    as: 'user',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
});
Story.belongsTo(User, { as: 'user' });

User.hasMany(Heart, {
    foreignKey: {
        name: 'heartedBy',
        allowNull: false,
    },
});
Story.hasMany(Heart, {
    as: 'hearts',
    foreignKey: {
        name: 'storyId',
        allowNull: false,
    },
});

// For the development environment: if a table (with the same name) already exist it will perform the necessary changes
// to make it match the model (if the table doesn't exist it will create a new one)
sequelize.sync({ alter: isDevEnv });

export default {
    User,
    DeletedUser,
    Story,
    DeletedStory,
    Heart,
};
