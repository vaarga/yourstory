import { DataTypes, Sequelize } from 'sequelize';
import { STORY_MAX, STORY_CATEGORY, STORY_STATUS } from '../../constants/story';

export default ({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING(STORY_MAX.titleLength),
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING(STORY_MAX.contentLength),
        allowNull: false,
    },
    imagesNr: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
            max: STORY_MAX.imagesNr,
        },
    },
    category: {
        type: DataTypes.ENUM({
            values: Object.keys(STORY_CATEGORY),
        }),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM({
            values: Object.keys(STORY_STATUS),
        }),
        allowNull: false,
        defaultValue: STORY_STATUS.NORMAL,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        validate: {
            isDate: true,
        },
    },
});
